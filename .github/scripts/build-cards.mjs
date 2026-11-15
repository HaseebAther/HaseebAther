// Builds the Ghost-themed profile cards (combat record, loadout, recon) as SVGs.
// Runs in GitHub Actions with GH_TOKEN; set FIXTURE=path/to/user.json to render offline.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const LOGIN = process.env.PROFILE_LOGIN || process.env.GITHUB_REPOSITORY_OWNER || 'HaseebAther';
const TOKEN = process.env.GH_TOKEN;
const OUT = process.env.OUT_DIR || 'dist';

const C = {
  bg: '#0a0b08', panel: '#11130e', grid: '#161a11', line: '#2a3020',
  olive: '#4b5320', sage: '#8f9d5a', bone: '#e8e4d8', dim: '#8a8778', red: '#c0392b',
};
const MONO = "Consolas,'Liberation Mono','Courier New',monospace";
const SANS = "'Segoe UI',Ubuntu,'Helvetica Neue',Arial,sans-serif";
const DISPLAY = "Impact,Haettenschweiler,'Arial Narrow Bold','Arial Black',sans-serif";

const QUERY = `query($login: String!) {
  user(login: $login) {
    login
    followers { totalCount }
    pullRequests { totalCount }
    issues { totalCount }
    repositories(ownerAffiliations: OWNER, isFork: false, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        stargazerCount
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) { edges { size node { name color } } }
      }
    }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      totalPullRequestContributions
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

async function load() {
  if (process.env.FIXTURE) return JSON.parse(await readFile(process.env.FIXTURE, 'utf8'));
  if (!TOKEN) throw new Error('GH_TOKEN is required (or set FIXTURE for an offline render)');
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'profile-cards' },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(`GitHub API error: ${JSON.stringify(json.errors || json)}`);
  return json.data.user;
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => (n >= 10000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : n.toLocaleString('en-US'));

const RANKS = [
  [0, 'RECRUIT'], [50, 'PRIVATE'], [150, 'CORPORAL'], [300, 'SERGEANT'], [600, 'STAFF SERGEANT'],
  [1000, 'LIEUTENANT'], [1500, 'CAPTAIN'], [2200, 'MAJOR'], [3000, 'LT. COLONEL'], [4000, 'COLONEL'], [5500, 'COMMANDER'],
];

function frame(w, h, title, tag, body, extraCss = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<style>
  .m{font-family:${MONO}}.s{font-family:${SANS}}.t{font-family:${DISPLAY}}
  @keyframes blink{50%{opacity:.15}}.blink{animation:blink 1.1s steps(1) infinite}
  @keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .rise{animation:rise .6s ease-out both}
  @keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  .grow{transform-box:fill-box;transform-origin:left center;animation:grow 1s ease-out both}
  ${extraCss}
</style>
<defs>
  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern>
  <linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="${C.olive}"/><stop offset="1" stop-color="${C.sage}"/></linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="${C.bg}"/>
<rect width="${w}" height="${h}" fill="url(#grid)"/>
<path d="M8 26V8H26M${w - 26} 8H${w - 8}V26M8 ${h - 26}V${h - 8}H26M${w - 26} ${h - 8}H${w - 8}V${h - 26}" fill="none" stroke="${C.sage}" stroke-width="2"/>
<text class="m" x="24" y="36" font-size="12" fill="${C.sage}" letter-spacing="2">${esc(title)}</text>
<circle class="blink" cx="${(w - 24 - tag.length * 8 - 14).toFixed(1)}" cy="32" r="4" fill="${C.red}"/>
<text class="m" x="${w - 24}" y="36" font-size="12" fill="${C.dim}" letter-spacing="1" text-anchor="end">${esc(tag)}</text>
<path d="M24 48H${w - 24}" stroke="${C.line}"/>
${body}
</svg>`;
}

function combatRecord(u) {
  const cc = u.contributionsCollection;
  const year = cc.contributionCalendar.totalContributions;
  const stars = u.repositories.nodes.reduce((a, r) => a + r.stargazerCount, 0);
  let i = RANKS.length - 1;
  while (i > 0 && year < RANKS[i][0]) i--;
  const [floor, rank] = RANKS[i];
  const next = RANKS[i + 1];
  const pct = next ? (year - floor) / (next[0] - floor) : 1;
  const nextLbl = next ? `NEXT: ${next[1]} · ${fmt(next[0] - year)} XP` : 'MAX RANK';

  const stats = [
    ['CONTRIBUTIONS · 1Y', year],
    ['COMMITS · 1Y', cc.totalCommitContributions + cc.restrictedContributionsCount],
    ['PULL REQUESTS', u.pullRequests.totalCount],
    ['ISSUES', u.issues.totalCount],
    ['STARS EARNED', stars],
    ['REPOS DEPLOYED', u.repositories.totalCount],
  ];
  const cells = stats.map(([label, val], k) => {
    const x = k % 2 === 0 ? 24 : 232;
    const y = 120 + Math.floor(k / 2) * 44;
    return `<g class="rise" style="animation-delay:${0.15 + k * 0.1}s">
  <path d="M${x} ${y - 10}V${y + 26}" stroke="${C.olive}" stroke-width="2"/>
  <text class="m" x="${x + 10}" y="${y}" font-size="10" fill="${C.dim}" letter-spacing="2">${label}</text>
  <text class="t" x="${x + 10}" y="${y + 26}" font-size="24" fill="${C.bone}" letter-spacing="1">${fmt(val)}</text>
</g>`;
  }).join('\n');

  const today = new Date().toISOString().slice(0, 10);
  const body = `
<g class="rise">
  <path d="M24 76l9-7 9 7M24 84l9-7 9 7" fill="none" stroke="${C.sage}" stroke-width="2.5"/>
  <text class="t" x="52" y="84" font-size="22" fill="${C.bone}" letter-spacing="2">${rank}</text>
  <text class="m" x="416" y="84" font-size="10" fill="${C.dim}" letter-spacing="1" text-anchor="end">${esc(nextLbl)}</text>
  <rect x="24" y="94" width="392" height="5" fill="${C.line}"/>
  <rect class="grow" x="24" y="94" width="${Math.max(2, 392 * pct).toFixed(1)}" height="5" fill="url(#bar)"/>
</g>
${cells}
<text class="m" x="416" y="${248 - 12}" font-size="9" fill="${C.dim}" opacity=".6" text-anchor="end" letter-spacing="1">SYNCED ${today} UTC</text>`;
  return frame(440, 248, 'COMBAT RECORD', `OPERATOR ${u.login.toUpperCase()}`, body);
}

function loadout(u) {
  const totals = new Map();
  for (const r of u.repositories.nodes) {
    for (const e of r.languages.edges) {
      const cur = totals.get(e.node.name) || { size: 0, color: e.node.color };
      cur.size += e.size;
      totals.set(e.node.name, cur);
    }
  }
  const sum = [...totals.values()].reduce((a, v) => a + v.size, 0) || 1;
  const top = [...totals.entries()].sort((a, b) => b[1].size - a[1].size).slice(0, 6);
  const slot = ['PRIMARY', 'SECONDARY', 'SIDEARM', 'LETHAL', 'TACTICAL', 'PERK'];
  const rows = top.length
    ? top.map(([name, v], k) => {
      const y = 82 + k * 28;
      const pct = (v.size / sum) * 100;
      return `<g class="rise" style="animation-delay:${0.1 + k * 0.1}s">
  <text class="m" x="24" y="${y}" font-size="9" fill="${C.dim}" letter-spacing="2">${slot[k]}</text>
  <rect x="104" y="${y - 9}" width="8" height="8" fill="${esc(v.color || C.sage)}"/>
  <text class="s" x="118" y="${y}" font-size="13" fill="${C.bone}" font-weight="bold">${esc(name)}</text>
  <rect x="226" y="${y - 7}" width="140" height="6" fill="${C.line}"/>
  <rect class="grow" style="animation-delay:${0.2 + k * 0.1}s" x="226" y="${y - 7}" width="${Math.max(2, 140 * (pct / 100)).toFixed(1)}" height="6" fill="url(#bar)"/>
  <text class="m" x="416" y="${y}" font-size="11" fill="${C.sage}" text-anchor="end">${pct.toFixed(1)}%</text>
</g>`;
    }).join('\n')
    : `<text class="m" x="24" y="100" font-size="12" fill="${C.dim}">NO LOADOUT DATA</text>`;
  return frame(440, 248, 'LOADOUT', 'BY CODE WEIGHT', rows);
}

function recon(u) {
  const days = u.contributionsCollection.contributionCalendar.weeks.flatMap((w) => w.contributionDays).slice(-30);
  const counts = days.map((d) => d.contributionCount);
  const total = counts.reduce((a, b) => a + b, 0);
  const max = Math.max(1, ...counts);
  const x0 = 60, x1 = 870, y0 = 74, y1 = 212;
  const step = (x1 - x0) / Math.max(1, days.length - 1);
  const pts = counts.map((c, i) => [x0 + i * step, y1 - (c / max) * (y1 - y0)]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
  const area = `${line}L${x1} ${y1}L${x0} ${y1}Z`;
  const peak = counts.indexOf(max);

  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const y = y1 - f * (y1 - y0);
    return `<path d="M${x0} ${y}H${x1}" stroke="${C.line}" stroke-dasharray="${f ? '2 4' : '0'}"/>
<text class="m" x="${x0 - 10}" y="${y + 4}" font-size="10" fill="${C.dim}" text-anchor="end">${Math.round(max * f)}</text>`;
  }).join('\n');
  const mon = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const xlabels = days.map((d, i) => {
    if (i % 5 !== 0 && i !== days.length - 1) return '';
    const [, m, dd] = d.date.split('-');
    return `<text class="m" x="${pts[i][0].toFixed(1)}" y="${y1 + 20}" font-size="10" fill="${C.dim}" text-anchor="middle">${mon[+m - 1]} ${+dd}</text>`;
  }).join('');
  const dots = pts.map(([x, y], i) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5" fill="${counts[i] ? C.bone : C.line}"/>`).join('');
  const [px, py] = pts[peak] || [x0, y1];

  const css = `@keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
  .draw{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 2s ease-out forwards}
  @keyframes fade{from{opacity:0}to{opacity:1}}.fade{animation:fade 1.2s .6s ease-out both}
  @keyframes ping{0%{r:4;opacity:1}100%{r:18;opacity:0}}.ping{animation:ping 1.6s ease-out infinite}`;
  const body = `
<defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sage}" stop-opacity=".35"/><stop offset="1" stop-color="${C.olive}" stop-opacity="0"/></linearGradient></defs>
${grid}
${xlabels}
<path class="fade" d="${area}" fill="url(#area)"/>
<path class="draw" pathLength="1" d="${line}" fill="none" stroke="${C.sage}" stroke-width="2.5" stroke-linejoin="round"/>
<g class="fade">${dots}</g>
${days.length ? `<circle class="ping" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="none" stroke="${C.red}" stroke-width="2"/>
<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${C.red}"/>
<text class="m" x="${Math.min(px, x1 - 60).toFixed(1)}" y="${(py - 14).toFixed(1)}" font-size="11" fill="${C.red}" text-anchor="middle" letter-spacing="1">PEAK ${max}</text>` : ''}`;
  return frame(900, 260, 'RECON // CONTRIBUTIONS, LAST 30 DAYS', `${fmt(total)} CONTACTS`, body, css);
}

const user = await load();
await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'combat-record.svg'), combatRecord(user));
await writeFile(join(OUT, 'loadout.svg'), loadout(user));
await writeFile(join(OUT, 'recon.svg'), recon(user));
console.log(`Cards written to ${OUT}/ for ${user.login}`);
