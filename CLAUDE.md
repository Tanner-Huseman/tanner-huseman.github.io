# CLAUDE.md — Portfolio Project Context

## Who Is Tanner Huseman?

Tanner is a **Data Platform Engineer (Manager level, L4)** at Nomura (formerly Macquarie Asset Management) based in Philadelphia. He has an unusually compelling background:

- **Professional dancer**: Metropolitan Opera (5 productions), The Phantom of the Opera on Broadway (Vacation Swing — learned 6 roles in 10 days), Limón Dance Company
- **Licensed PA realtor**: Sold 10 homes in ~6 months at RE/MAX Main Line
- **Software engineer**: Promoted twice in 3 years (L2 → L3 → L4 Manager) at Macquarie, building the Data-as-a-Service platform across three generations
- **Education**: BFA Dance from Boston Conservatory, MS Computer Science from Merrimack College (earned while working full-time as an engineer)

This portfolio exists to tell that story and showcase his technical capabilities as he positions for Senior/Staff Data Platform Engineer roles ($170K+ base, remote or NYC hybrid).

---

## Project Overview

This repo is Tanner's personal portfolio website, hosted on GitHub Pages at `tanner-huseman.github.io`. It is a sophisticated, Apple-inspired scrolling experience that serves as both a personal brand site and a showcase for technical projects.

### The portfolio is itself a project
The site will be open-sourced with clean code, documentation, and a companion article ("How I Built This Portfolio with AI") that documents the engineering process.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Astro** | Zero-JS-by-default, fast static site, React islands for interactive components |
| Interactive Components | **React** | Used as Astro islands for stateful/interactive sections |
| Animations | **GSAP + ScrollTrigger** | Apple-style scroll animations, parallax, staggered reveals. Same library Apple.com uses |
| 3D Elements | **Three.js** (or React Three Fiber) | Orbiting tech stack logos around Tanner's headshot |
| Styling | **Tailwind CSS** | Utility-first with custom design tokens |
| Content | **MDX** | Markdown + JSX for project writeups and blog posts |
| Smooth Scroll | **Lenis** | Buttery smooth native-feeling scroll |
| Hosting | **GitHub Pages** | Free, auto-deployed via GitHub Actions |
| CI/CD | **GitHub Actions** | Auto-deploy on merge to main, Lighthouse CI checks |

### Performance Targets
- Lighthouse Performance: 95+
- First Contentful Paint: under 1.5s
- Total page weight: under 2MB
- 60fps animations (transform-only, will-change)
- `prefers-reduced-motion` respected — disable all animations for users who prefer it

---

## Site Structure

Single-page scrolling experience with anchor navigation. Each section transitions into the next with scroll-triggered animations.

### Sections (in scroll order)

1. **Hero**
   - Full viewport
   - Name: "Tanner Huseman"
   - Tagline: "From Broadway stages to data platforms."
   - Subtle particle/gradient animation in background
   - Scroll indicator at bottom
   - Clean, cinematic, minimal

2. **The Story (About)**
   - Scroll-triggered timeline morphing through career phases: Stage → Real Estate → Code → Data Architecture
   - Performance photos from Met Opera / Broadway fade in with parallax
   - **The orbiting logos scene**: Tanner's headshot centered, with tech stack logos (AWS, dbt, K8s, Docker, Airflow, Python, SQL, BigQuery, Snowflake) floating in 3D orbit around it. Interactive — responds to cursor movement. Built with Three.js or React Three Fiber
   - Each career phase has a brief description connecting it to engineering skills

3. **What I Build (Skills)**
   - Apple-style horizontal scroll section (GSAP ScrollTrigger pinning)
   - Cards slide in horizontally as user scrolls vertically
   - Categories: Data Platform Architecture, Cloud & Infrastructure, Transformation & Modeling, Pipelines & Orchestration, Developer Tooling, AI/ML

4. **Projects**
   - Grid of project cards with hover effects (scale, glow, parallax tilt)
   - Each card: screenshot/diagram preview, tech stack pills, one-line summary
   - Cards link to detailed project pages (separate Astro pages or expanded modals)
   - See "Projects" section below for the 6 projects

5. **Writing / Articles**
   - Blog section for technical articles
   - First article: "How I Built This Portfolio with AI"
   - Rendered from MDX files

6. **Connect (Footer)**
   - LinkedIn, GitHub, email
   - No contact form — LinkedIn is the inbound channel
   - Clean, minimal

---

## Design System

### Color Palette (Dark Theme)
Choose a distinctive palette — NOT the typical tech blue. Tanner has an artistic background; the palette should reflect that. Consider:
- **Option A**: Deep purple/violet accent (#6c5ce7) with warm gold highlights — theatrical, distinctive
- **Option B**: Rich teal/emerald (#00d2a0) with warm amber — sophisticated, uncommon
- **Option C**: Muted rose/coral (#ff6b9d) with slate — artistic, memorable

Background: near-black (#0a0a0f to #0f0f18 range)
Surface: slightly lighter (#14141f to #181825)
Text: off-white (#e8e8f0)
Muted text: (#8888a0)

### Typography
- **Display/Headings**: A distinctive serif or display font — NOT Inter, Roboto, or Arial. Suggestions: Playfair Display, Fraunces, DM Serif Display, or Clash Display
- **Body**: Clean sans-serif — DM Sans, Satoshi, or General Sans
- **Code/Monospace**: JetBrains Mono

### Photography
- Tanner's performance photos (Met Opera, Broadway) are the hero visual asset
- Use them large and cinematic
- Apply subtle color grading to match site palette
- Tanner has a great professional headshot (warm, approachable) — use it for the orbiting logos scene

### Animation Principles
- **GSAP ScrollTrigger pinning**: Pin sections while content animates within
- **Staggered reveals**: Elements fade in one-by-one with slight delays
- **Parallax depth**: Background scrolls slower than foreground
- **Text split animations**: Headlines animate letter-by-letter or word-by-word
- **Scale transitions**: Cards start small and scale up entering viewport
- **Smooth scroll**: Lenis for consistent scroll behavior
- **Mobile degradation**: Three.js scene simplifies to 2D/static on mobile. Horizontal scroll sections become vertical stacks

---

## Projects to Showcase (6 Total)

Each project has its own GitHub repo with a thorough README, architecture diagram, and design decisions document.

### Project 1: dbt Financial Data Platform
**Repo**: (to be created)
**Tags**: dbt Core, SQL, DuckDB/Snowflake, GitHub Actions, SCD Type 2, Data Modeling

A fully documented dbt project modeling a realistic financial dataset:
- Staging → intermediate → mart layer architecture
- SCD Type 2 snapshots for historical tracking
- Custom generic and singular tests
- Auto-generated dbt docs site
- CI: GitHub Actions runs `dbt build + test` on every PR
- Detailed README with architecture diagram, lineage graph, and "Design Decisions" section

### Project 2: AI Agent Toolkit
**Repo**: (to be created)
**Tags**: Python, LangChain/LangGraph, Claude API, Tool Use, Pytest, Pydantic

A Python library of composable AI agent skills:
- Custom agents for: code review, documentation generation, architecture diagramming, content writing
- Built on LangChain, LangGraph, or Claude's tool-use API
- Typed inputs/outputs, error handling, retry logic
- Unit and integration tests
- Actually used to build the other projects and this portfolio site (meta-narrative for the article)

### Project 3: "How I Built This Portfolio with AI" Article
**Location**: Hosted on portfolio site as MDX, cross-posted to Medium/Dev.to
**Tags**: Technical Writing, MDX, AI-Assisted Development

2,000-3,000 word article covering:
- The vision and architecture decisions (why Astro + GSAP + Three.js)
- AI-assisted workflow (Claude plan mode, agentic coding, custom agents)
- Engineering best practices followed
- Lessons learned

### Project 4: Local Data Platform on Kubernetes
**Repo**: (to be created)
**Tags**: Kubernetes, ArgoCD, Helm, Airflow, dbt Core, Docker, LocalStack, Postgres, Prometheus, Grafana

A fully containerized local data platform mirroring production architecture:
- Kind/Minikube K8s cluster
- ArgoCD for GitOps deployment
- Airflow via Helm chart orchestrating dbt Core runs
- LocalStack simulating AWS (S3, DynamoDB, Lambda)
- dbt Core running as containerized Airflow task against Postgres
- Prometheus + Grafana for monitoring
- Stretch: Policy as Code component (OPA or custom) managing access configs in Git
- "Production Considerations" section in README

### Project 5: Serverless Data API (Real Estate)
**Repo**: (to be created)
**Tags**: Python, FastAPI, AWS Lambda, DynamoDB, S3, SAM/Terraform, OpenAPI

A production-style serverless API serving curated real estate data:
- FastAPI deployed as Lambda functions
- DynamoDB + S3 backend
- Real estate dataset (public MLS data, Zillow API, or synthetic)
- Auth, rate limiting, request validation
- Infrastructure as Code (SAM or Terraform)
- CI/CD via GitHub Actions
- Auto-generated OpenAPI/Swagger docs
- Optional: Streamlit companion app consuming the API

### Project 6: The Portfolio Site Itself (this repo)
**Tags**: Astro, React, GSAP, Three.js, Tailwind, GitHub Pages

Open-sourced with clean code and documentation. This IS a showcase project.

---

## Build Order

| Phase | Weeks | Project | Notes |
|-------|-------|---------|-------|
| 1 | 1-3 | AI Agent Toolkit (MVP) | 2-3 core agents. Use to accelerate everything else |
| 2 | 2-5 | Portfolio Site (V1) | Structure, hero, story section, Three.js scene. Deploy to GH Pages. Runs parallel with Phase 1 |
| 3 | 4-6 | dbt Financial Data Platform | Most directly relevant project. Add to portfolio when done |
| 4 | 6-9 | K8s Local Data Platform | Most complex project. Staff-level capstone. Document extensively |
| 5 | 8-10 | Serverless Data API | Can overlap with Phase 4 (different stack entirely) |
| 6 | 10-12 | "How I Built This" Article | Write last with real material. Polish portfolio to final state |

---

## Tanner's Technical Stack (for reference)

**Primary (deep production experience):**
- AWS: Lambda, EC2, S3, DynamoDB, IAM
- GCP: BigQuery
- dbt Core and dbt Cloud (both deeply)
- Apache Airflow
- Kubernetes: ArgoCD, Helm
- Docker
- Python (APIs, data pipelines, tooling)
- SQL (advanced — window functions, CTEs, SCD Type 2, optimization)
- Delta Lake, Apache Hive, Apache Ranger
- Data Mesh architecture and enablement
- Git, CI/CD

**Familiar / growing:**
- Snowflake (currently planning V3 platform on it)
- C# / .NET (bootcamp + early career)
- JavaScript, Vue.js
- Spark/Kyuubi (platform-level, not deep hands-on PySpark)

**Learning / building toward:**
- AI/ML engineering (LangChain, Claude API, agent frameworks)
- Frontend (Astro, React, GSAP, Three.js — for this portfolio)
- Terraform (infrastructure as code)

---

## Career Context (Why This Portfolio Exists)

Tanner is preparing for a potential job move. Key details:
- **Current comp**: $129.5K base, ~$155K total (12% 401k match + bonus)
- **Target**: $170K+ base or $200K+ total comp
- **Preferred roles**: Senior/Staff Data Platform Engineer, Senior Data Engineer, Senior Platform Engineer
- **Location**: Fully remote preferred, open to NYC hybrid (Amtrak super-commute from Philly)
- **Role type**: Prefers IC, open to management
- **Domain interests**: PropTech, automotive, entertainment — not passionate about FinTech but will take it for the right comp
- **Timeline**: Not urgent. Happy in current role. Partner finishes grad school end of summer 2026 and will begin job search, so flexibility matters
- **Interview gaps**: LeetCode (done some, not consistent) and system design (has the real experience, needs practice articulating it under interview pressure)

The portfolio serves to:
1. Tell his unique story (Broadway → real estate → data platform engineering)
2. Demonstrate technical depth across the full data platform stack
3. Show he can ship polished, production-grade work independently
4. Provide concrete talking points for every common Senior/Staff interview question
5. Attract inbound interest from recruiters and hiring managers

---

## Key Links

- **LinkedIn**: https://www.linkedin.com/in/tanner-huseman
- **Email**: tanner.huseman@gmail.com
- **GitHub Pages**: https://tanner-huseman.github.io (once deployed)

---

## Working with Claude on This Project

### Tone & Style Preferences
- Tanner appreciates direct and frank conversation — no sugarcoating
- He values efficiency and prefers concrete examples over abstract advice
- He has strong opinions and will push back — respect that and engage with his ideas

### What's Been Done So Far (in Claude.ai chat)
1. ✅ Full career strategy playbook (comp analysis, target companies, negotiation tactics, 90-day plan, LeetCode/system design study plans)
2. ✅ Résumé rebuilt from scratch (Word + PDF) with V1/V2/V3 platform narrative and double promotion
3. ✅ LinkedIn overhaul guide with copy-paste-ready content for every section
4. ✅ Portfolio and projects master plan (this document is the summary)

### What's Next
- Scaffold the Astro project in this repo
- Set up GitHub Actions for auto-deploy to GitHub Pages
- Build the hero section with GSAP scroll animations
- Build the Three.js orbiting logos scene
- Start on Project 2 (AI Agent Toolkit) in a separate repo
- Iterate on each section and project

### Important Notes
- The Phantom of the Opera dates are June 2019 – March 2020 (NOT March 2021 as previously shown on LinkedIn)
- Tanner's L4 "Manager" title is an internal level band at Macquarie, not a people-management role. He has no direct reports. Frame as IC with project leadership
- His Snowflake experience is limited/exploratory (V3 planning phase). Don't overstate it
- He removed PySpark from his stated stack — don't list it as a core skill. Spark/Kyuubi was part of the V1 platform but not his deep hands-on focus
- He wants to be discreet about job searching — no "open to opportunities" language on public-facing content
