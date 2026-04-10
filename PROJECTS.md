# Portfolio Projects — Detailed Specifications

## Overview

6 projects, each targeting a specific Senior/Staff engineering competency. Together they cover: data modeling, AI/ML, technical writing, infrastructure-as-code, serverless backend, and frontend engineering.

---

## Project 1: dbt Financial Data Platform

**Target competency**: Data Modeling & Transformation
**Repo name**: `dbt-financial-platform` (suggested)
**Difficulty**: Medium
**Timeline**: 2-3 weeks

### What to Build
A production-grade dbt Core project modeling a realistic financial dataset with best-practice patterns.

### Dataset Options (pick one)
- **SEC EDGAR filings**: Free, public, well-structured. Model company financials, quarterly reports
- **Synthetic trade data**: Generate fake trade/position data using Faker or a script. Allows you to control complexity
- **Yahoo Finance**: Historical stock prices + company fundamentals. Easy to pull via `yfinance` Python library

### Architecture
```
sources (raw data in seed files or external tables)
  └── staging (1:1 with sources, renamed/cast/cleaned)
       └── intermediate (business logic joins, calculations)
            └── marts (final analytical models, star schema)
                 └── snapshots (SCD Type 2 for historical tracking)
```

### Must-Have Features
- [ ] 3+ staging models with `_stg` prefix
- [ ] 2+ intermediate models with business logic
- [ ] 2+ mart models (e.g., `dim_companies`, `fct_trades`)
- [ ] At least 1 SCD Type 2 snapshot
- [ ] Custom generic test (e.g., `test_positive_value`, `test_valid_date_range`)
- [ ] 2+ singular tests
- [ ] `schema.yml` with descriptions for every model and column
- [ ] `sources.yml` with freshness checks
- [ ] Incremental materialization on at least 1 model
- [ ] `dbt docs generate` → hosted docs site (GitHub Pages subdirectory or separate)
- [ ] GitHub Actions CI: `dbt build --select state:modified+` on PRs
- [ ] README with architecture diagram (Mermaid or draw.io), data lineage screenshot, and "Design Decisions" section

### Database
- **DuckDB** (recommended for simplicity — free, local, dbt-duckdb adapter works well)
- **Snowflake trial** (30-day free trial, adds credibility if targeting Snowflake roles)

---

## Project 2: AI Agent Toolkit

**Target competency**: AI/ML Engineering
**Repo name**: `ai-agent-toolkit` (suggested)
**Difficulty**: Medium-Hard
**Timeline**: 3-4 weeks (MVP in 1-2 weeks, iterate as you use it)

### What to Build
A Python library of composable, reusable AI agent skills and workflows.

### Core Agents (MVP)
1. **DocGen Agent**: Given a codebase or file, generate a README, docstring, or architecture doc
2. **Code Review Agent**: Given a diff or file, produce a code review with suggestions
3. **Content Writer Agent**: Given a topic and context, draft a technical blog post or LinkedIn post

### Stretch Agents
4. **Architecture Diagrammer**: Given a description, generate a Mermaid diagram
5. **Data Quality Analyst**: Given a dbt project, analyze test coverage and suggest improvements
6. **Interview Prep Agent**: Given a job description, generate likely interview questions and suggested answers

### Architecture
```
ai_agent_toolkit/
├── agents/
│   ├── base.py              # Abstract base agent class
│   ├── docgen.py             # Documentation generator
│   ├── code_review.py        # Code reviewer
│   ├── content_writer.py     # Technical writer
│   └── ...
├── skills/                   # Reusable atomic skills (tools)
│   ├── file_reader.py        # Read and parse files
│   ├── web_search.py         # Search the web
│   ├── diagram_gen.py        # Generate Mermaid/SVG diagrams
│   └── ...
├── workflows/                # Multi-step orchestrated flows
│   ├── project_docs.py       # Full project documentation workflow
│   └── blog_from_code.py     # Generate blog post from codebase
├── models/                   # Pydantic models for inputs/outputs
├── tests/
│   ├── unit/
│   └── integration/
├── examples/                 # Example usage scripts
├── pyproject.toml
└── README.md
```

### Tech Choices
- **Framework**: LangChain or LangGraph (for multi-step agent flows) OR direct Claude API tool-use
- **Type safety**: Pydantic models for all inputs/outputs
- **Testing**: Pytest with mocked LLM responses for unit tests, real API calls for integration tests
- **Package management**: uv or poetry

### Meta-Narrative
Document every time you use these agents to build the other projects. This becomes material for Project 3 (the article).

---

## Project 3: "How I Built This Portfolio with AI" Article

**Target competency**: Technical Communication
**Location**: `src/content/articles/how-i-built-this.mdx` in portfolio repo
**Difficulty**: Medium (writing, not coding)
**Timeline**: 1-2 weeks (write last, after the other projects)

### Outline
1. **The Vision** (~400 words): What I wanted the portfolio to communicate. Why design quality matters for engineers. The "From Broadway to data platforms" narrative concept
2. **Architecture Decisions** (~500 words): Why Astro + GSAP + Three.js. Tradeoffs considered (Next.js vs Astro, Framer Motion vs GSAP, CSS 3D vs Three.js). Performance budgets
3. **The AI-Assisted Workflow** (~800 words): How I used Claude (plan mode, agentic coding, Claude Code). How I built custom AI agents (Project 2) and used them. What AI was good at, where I had to override it. Specific examples with prompts and outputs
4. **Engineering Practices** (~400 words): Component architecture, accessibility, testing, CI/CD, Lighthouse monitoring. How I maintained quality while moving fast with AI assistance
5. **Lessons Learned** (~400 words): What I'd do differently. Where AI saved the most time. Where it created the most rework

### Assets to Include
- Screenshots of the site in various states of development
- Architecture diagrams
- Code snippets (keep short, link to full files on GitHub)
- Before/after comparisons
- Performance metrics (Lighthouse scores)

### Distribution
- Primary: hosted on the portfolio site as an MDX page
- Cross-post to: Medium, Dev.to, and LinkedIn (as a shorter summary with link)

---

## Project 4: Local Data Platform on Kubernetes

**Target competency**: Infrastructure & System Design (Staff-level capstone)
**Repo name**: `local-data-platform` (suggested)
**Difficulty**: Hard
**Timeline**: 3-4 weeks

### What to Build
A fully containerized local data platform running on Kubernetes that mirrors a production architecture at small scale.

### Components
```
┌──────────────────────────────────────────────────────┐
│                   Kubernetes (Kind)                   │
│                                                       │
│  ┌─────────┐   ┌──────────┐   ┌─────────────────┐   │
│  │ ArgoCD  │──▶│ Airflow  │──▶│ dbt Core (task)  │   │
│  │ (GitOps)│   │ (Helm)   │   │ (containerized)  │   │
│  └─────────┘   └──────────┘   └────────┬─────────┘   │
│                                         │             │
│  ┌──────────────┐   ┌──────────────┐    ▼             │
│  │  LocalStack  │   │  PostgreSQL  │◀── transforms   │
│  │ (S3, DynamoDB│   │  (target DB) │                  │
│  │  Lambda)     │   └──────────────┘                  │
│  └──────────────┘                                     │
│                                                       │
│  ┌──────────────┐   ┌──────────────┐                  │
│  │  Prometheus  │──▶│   Grafana    │                  │
│  │ (metrics)    │   │ (dashboards) │                  │
│  └──────────────┘   └──────────────┘                  │
└──────────────────────────────────────────────────────┘
```

### Setup Flow
1. Install prerequisites: Docker, Kind, kubectl, Helm
2. `make up` → spins up Kind cluster, installs ArgoCD, deploys all services
3. ArgoCD watches the repo's `k8s/` directory and auto-syncs
4. Airflow triggers dbt runs on schedule
5. dbt transforms raw data in Postgres
6. Grafana dashboard shows pipeline health

### Repository Structure
```
local-data-platform/
├── k8s/                        # All K8s manifests (ArgoCD watches this)
│   ├── argocd/
│   │   └── application.yaml
│   ├── airflow/
│   │   ├── values.yaml         # Helm values override
│   │   └── dags/               # Airflow DAG definitions
│   ├── dbt/
│   │   ├── Dockerfile
│   │   └── project/            # dbt project files
│   ├── localstack/
│   │   └── deployment.yaml
│   ├── postgres/
│   │   └── statefulset.yaml
│   └── monitoring/
│       ├── prometheus/
│       └── grafana/
├── scripts/
│   ├── setup.sh                # One-command setup
│   └── teardown.sh
├── Makefile                    # make up, make down, make logs, etc.
├── docs/
│   ├── architecture.md
│   ├── design-decisions.md
│   └── production-considerations.md  # What you'd change for real prod
└── README.md
```

### Stretch: Policy as Code
Add Open Policy Agent (OPA) or a custom solution managing access configs in Git — directly mirrors the Policy as Code tooling Tanner built at Macquarie.

### "Production Considerations" Document
Critical for Staff-level credibility. Must include:
- Managed K8s (EKS/GKE) vs. self-managed
- High availability and disaster recovery
- Secrets management (Vault, AWS Secrets Manager)
- Network policies and security
- Cost optimization
- Observability (distributed tracing, log aggregation)
- CI/CD for infrastructure changes

---

## Project 5: Serverless Data API (Real Estate)

**Target competency**: Backend / Data Products
**Repo name**: `realestate-data-api` (suggested)
**Difficulty**: Medium
**Timeline**: 2-3 weeks

### What to Build
A production-style serverless API serving curated real estate data products.

### API Endpoints
```
GET  /properties              # List properties (paginated, filterable)
GET  /properties/{id}         # Get property details
GET  /properties/search       # Search with filters (price, beds, zip, etc.)
GET  /properties/{id}/history # Historical price trends
GET  /health                  # Health check
```

### Architecture
```
Client → API Gateway → Lambda (FastAPI) → DynamoDB
                                        → S3 (bulk data / images)
```

### Infrastructure as Code
All AWS resources defined in SAM template or Terraform:
- API Gateway
- Lambda functions
- DynamoDB table(s)
- S3 bucket
- IAM roles/policies

### Data Sources (pick one)
- **Synthetic data**: Generate realistic property listings with Faker. Easiest, no API key needed
- **Public datasets**: Zillow ZTRAX (academic), Realtor.com research data
- **Web scraping**: Scrape public listing data (be careful with ToS)

### Must-Have Features
- [ ] FastAPI with Pydantic request/response models
- [ ] DynamoDB single-table design (demonstrate NoSQL modeling skill)
- [ ] API key authentication
- [ ] Rate limiting
- [ ] Request validation and error handling
- [ ] OpenAPI/Swagger auto-generated docs
- [ ] SAM/Terraform IaC
- [ ] GitHub Actions CI/CD (deploy on merge to main)
- [ ] README with architecture diagram and API docs
- [ ] Optional: Streamlit or Jupyter notebook consuming the API

---

## Project 6: Portfolio Site (this repo)

**Target competency**: Frontend Engineering / Design
**Difficulty**: Medium-Hard (the Three.js + GSAP work is the challenging part)
**Timeline**: 3-4 weeks (parallel with other projects)

See ARCHITECTURE.md and DESIGN_SYSTEM.md for full specifications.

### Must-Have Features
- [ ] Astro static site deployed on GitHub Pages
- [ ] GSAP ScrollTrigger animations throughout
- [ ] Three.js orbiting tech logos scene
- [ ] Responsive (mobile-first)
- [ ] Accessible (WCAG AA, reduced motion support)
- [ ] Lighthouse 95+ on all metrics
- [ ] GitHub Actions auto-deploy + Lighthouse CI
- [ ] MDX support for project pages and articles
- [ ] Open-source with clean README and component docs

---

## Interview Question → Project Mapping

| Interview Question | Project(s) |
|---|---|
| "Walk me through a system you designed" | P4 (K8s platform) + real V1/V2 DaaS experience |
| "How do you approach data modeling?" | P1 (dbt pipeline) |
| "Tell me about developer tooling you've built" | P2 (AI agents) + real Policy as Code + dbt test UI |
| "How do you handle data quality?" | P1 (dbt tests) + real dbt test UI/API |
| "Serverless vs. containers?" | P5 (serverless) vs P4 (K8s) — you've built both |
| "How do you communicate technical decisions?" | P3 (article) + all READMEs |
| "How are you using AI in your work?" | P2 (AI agents) + portfolio meta-narrative |
| "Show me something you're proud of" | Portfolio site — pull it up live in the interview |
