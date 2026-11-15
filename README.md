<!-- ═══════════════════════════  HEADER  ═══════════════════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24c6dc&height=230&section=header&text=Haseeb%20Ather&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=Full-Stack%20Engineer%20%E2%80%A2%20Automation%20Architect%20%E2%80%A2%20Pipeline%20Builder&descAlignY=60&descSize=18&animation=fadeIn" width="100%" alt="Haseeb Ather" />
</p>

<p align="center">
  <a href="https://github.com/HaseebAther">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3200&pause=900&color=24C6DC&center=true&vCenter=true&multiline=false&repeat=true&width=720&height=50&lines=I+build+machines+that+build+websites+%F0%9F%A4%96;Next.js+15+%E2%80%A2+PostgreSQL+%E2%80%A2+node-cron+%E2%80%A2+Claude+API;One+codebase+%E2%86%92+many+niches+%E2%86%92+zero+manual+publishing;Self-hosted+on+a+VPS+I+configured+myself+%F0%9F%90%A7;Clean+code+is+like+good+humor+%E2%80%94+it+just+lands." alt="Typing intro" />
  </a>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=HaseebAther&label=PROFILE%20VIEWS&color=24c6dc&style=for-the-badge" alt="Profile views" />
  <a href="mailto:itzhaseebather@gmail.com"><img src="https://img.shields.io/badge/Email-Let's%20Talk-302b63?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://15mhub.com"><img src="https://img.shields.io/badge/15mhub.com-Live-0f0c29?style=for-the-badge&logo=googlechrome&logoColor=24c6dc" alt="15mhub" /></a>
  <img src="https://img.shields.io/badge/Status-Shipping-24c6dc?style=for-the-badge&logo=rocket&logoColor=white" alt="Status" />
</p>

---

## `> whoami`

```ts
const haseeb = {
  role:        "Full-Stack Developer",
  base:        "Pakistan 🇵🇰",
  buildsWith:  ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "WordPress"],
  obsessedWith:["automation", "SEO at scale", "self-hosting", "systems that run while I sleep"],
  currently:   "Running a multi-niche AI content pipeline in production",
  learning:    ["Advanced JS internals", "Distributed jobs & queues", "Infra hardening"],
  funFact:     "Good code is like good humor — clean, precise, and makes people happy.",
  askMeAbout:  ["CRON pipelines", "Next.js App Router", "SSR / prerendering", "WordPress plugins"],
};
```

---

## 🛰️ Featured Builds

<table>
<tr>
<td width="50%" valign="top">

### ⚙️ CogWorkLabs — AI Content Engine
A **multi-niche content pipeline**: one template codebase that powers multiple niche sites, with AI-generated, SEO-structured articles, services and glossary pages published automatically.

- Next.js 15 App Router, flat + nested URL routing with 301 migration layer
- `postgres.js` data layer over self-hosted PostgreSQL
- Auto internal-linking, dynamic sitemaps, on-demand `revalidateTag`
- Glossary pages pre-rendered to real HTML for crawlers

`Next.js` `TypeScript` `PostgreSQL` `Prisma` `Tailwind` `Claude API`

</td>
<td width="50%" valign="top">

### ⏱️ CRON Sync Service
The **brain behind the pipeline** — a standalone TypeScript service on a VPS that syncs, transforms and fans content out to every niche database on a schedule.

- `node-cron` scheduler with run-on-startup + one-shot modes
- Per-niche config, schema push to all target DBs, migrations
- Private networking between services over WireGuard
- Python + PowerShell one-command deploy & remote health checks

`Node.js` `TypeScript` `node-cron` `WireGuard` `systemd` `Python`

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🌐 15mhub.com
A **scalable business platform** built for growth — designed, developed and shipped end to end.

<a href="https://15mhub.com"><img src="https://img.shields.io/badge/Visit-15mhub.com-24c6dc?style=flat-square&logo=googlechrome&logoColor=white" alt="Visit" /></a>

`Full-Stack` `Performance` `SEO`

</td>
<td width="50%" valign="top">

### 🧘 BodySoul Management
A **custom WordPress booking plugin** — scheduling, appointment management and admin tooling, built from scratch instead of bolted together from 10 plugins.

`WordPress` `PHP` `MySQL` `JavaScript`

</td>
</tr>
</table>

---

## 🧬 How My Pipeline Works

```mermaid
flowchart LR
    A[(Source DB)] -->|hourly cron| B[CRON Sync Service<br/>node-cron · TypeScript]
    B --> C{Niche Router}
    C --> D[(Automation DB)]
    C --> E[(Scraping DB)]
    C --> F[(Trading DB)]
    D --> G[Next.js 15 Site<br/>App Router · SSR]
    G -->|revalidateTag| H[🌍 Fresh SEO pages<br/>blog · services · glossary]
    style B fill:#302b63,stroke:#24c6dc,color:#fff
    style G fill:#0f0c29,stroke:#24c6dc,color:#fff
    style H fill:#24c6dc,stroke:#302b63,color:#0f0c29
```

---

## 🧰 Arsenal

<p align="center">
  <b>Frontend</b><br/><br/>
  <img src="https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs,vite,tailwind&theme=dark" alt="Frontend" />
</p>
<p align="center">
  <b>Backend &amp; Data</b><br/><br/>
  <img src="https://skillicons.dev/icons?i=nodejs,express,postgres,prisma,mongodb,mysql,php,firebase&theme=dark" alt="Backend" />
</p>
<p align="center">
  <b>CMS, Infra &amp; Tooling</b><br/><br/>
  <img src="https://skillicons.dev/icons?i=wordpress,linux,docker,nginx,bash,python,git,github&theme=dark" alt="Infra" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Claude%20API-AI%20Content-d97757?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude API" />
  <img src="https://img.shields.io/badge/node--cron-Scheduling-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node-cron" />
  <img src="https://img.shields.io/badge/PM2-Process%20Manager-2B037A?style=for-the-badge&logo=pm2&logoColor=white" alt="PM2" />
  <img src="https://img.shields.io/badge/WireGuard-Private%20Net-88171A?style=for-the-badge&logo=wireguard&logoColor=white" alt="WireGuard" />
</p>

---

## 📊 GitHub Telemetry

<p align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api?username=HaseebAther&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0f0c29&title_color=24c6dc&icon_color=24c6dc&text_color=ffffff&count_private=true&include_all_commits=true" alt="Stats" />
  <img height="170" src="https://github-readme-stats.vercel.app/api/top-langs/?username=HaseebAther&layout=compact&theme=tokyonight&hide_border=true&bg_color=0f0c29&title_color=24c6dc&text_color=ffffff&langs_count=8" alt="Top languages" />
</p>

<p align="center">
  <img src="https://streak-stats.demolab.com?user=HaseebAther&theme=tokyonight&hide_border=true&background=0F0C29&ring=24C6DC&fire=24C6DC&currStreakLabel=24C6DC" alt="Streak" />
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=HaseebAther&bg_color=0f0c29&color=ffffff&line=24c6dc&point=ffffff&area=true&area_color=302b63&hide_border=true&custom_title=Commit%20Activity" width="100%" alt="Activity graph" />
</p>

<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=HaseebAther&theme=onedark&no-frame=true&no-bg=true&margin-w=6&row=1&column=7" alt="Trophies" />
</p>

---

## 🐍 Eating My Contributions

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/HaseebAther/HaseebAther/output/github-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/HaseebAther/HaseebAther/output/github-snake.svg" />
    <img alt="Contribution snake" src="https://raw.githubusercontent.com/HaseebAther/HaseebAther/output/github-snake.svg" />
  </picture>
</p>

---

## 🤝 Let's Build Something

<p align="center">
  <i>Need a content engine, an automation pipeline, a custom WordPress plugin, or a site that ships itself?</i><br/><br/>
  <a href="mailto:itzhaseebather@gmail.com"><img src="https://img.shields.io/badge/itzhaseebather%40gmail.com-Say%20Hi-24c6dc?style=for-the-badge&logo=gmail&logoColor=white" alt="Email me" /></a>
</p>

<p align="center">
  <b>Always Learning · Always Building · Always Optimizing</b>
</p>

<!-- ═══════════════════════════  FOOTER  ═══════════════════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:24c6dc,50:302b63,100:0f0c29&height=120&section=footer" width="100%" alt="footer" />
</p>
