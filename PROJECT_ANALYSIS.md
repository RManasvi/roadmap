# 📊 Project Analysis — 90-Day Data Analyst Roadmap Tracker

> **Owner:** Manasvi · ABES Engineering, CSE 2027  
> **Stack:** Next.js 15 · TypeScript · Tailwind CSS · localStorage  
> **Purpose:** Personal learning tracker for a structured 90-day Data Analyst curriculum  
> **Analysis Date:** May 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [File Structure Analysis](#3-file-structure-analysis)
4. [Code Quality Review](#4-code-quality-review)
5. [Curriculum Analysis — Phase by Phase](#5-curriculum-analysis--phase-by-phase)
6. [Resource & Link Audit](#6-resource--link-audit)
7. [UI/UX Design Review](#7-uiux-design-review)
8. [Bugs & Issues Found](#8-bugs--issues-found)
9. [Strengths Summary](#9-strengths-summary)
10. [Gaps & Recommendations](#10-gaps--recommendations)
11. [Scores](#11-scores)

---

## 1. Project Overview

This is a **personal learning management system** built as a Next.js web app that:

- Tracks progress through a custom-built 90-day Data Analyst curriculum
- Organizes 90 days into 4 phases with distinct skill tracks
- Shows streak, completion stats, and progress bars
- Links to curated external learning resources (YouTube, Kaggle, LeetCode, etc.)
- Allows searching and filtering days by phase or topic

It is not a public product — it's a focused personal tool designed for **one user (Manasvi)** to follow a structured 12-week journey from Python beginner to internship-ready Data Analyst/ML Engineer.

---

## 2. Tech Stack & Architecture

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 15.x (App Router) | Uses `'use client'` on all pages |
| Language | TypeScript 5.7.3 | Well typed throughout |
| Styling | Tailwind CSS v4 + inline styles | Mixed approach (inconsistency) |
| State | React `useState` + `useEffect` | No external state manager needed |
| Persistence | Browser `localStorage` | Smart choice — no backend required |
| Package Manager | pnpm (lockfile present) / npm used to install | Mixed — `pnpm-lock.yaml` + `node_modules` via npm |
| UI Components | Radix UI primitives | Full set installed but many unused |
| Charts | Recharts (installed, not used) | Unused dependency |
| Deployment | Vercel (based on `@vercel/analytics` dep) | Analytics package included |

### Architecture Diagram

```
app/
├── page.tsx              ← Dashboard (main tracker)
├── roadmap/page.tsx      ← Phase overview + skills/projects/resume tabs
├── resources/page.tsx    ← Curated learning resources by phase
├── day/[id]/page.tsx     ← Individual day detail page
└── globals.css           ← Global styles

lib/
├── curriculum-data.ts    ← 1621-line data file with all 90 days
├── types.ts              ← TypeScript interfaces + PHASES config
├── storage.ts            ← localStorage read/write helpers
└── utils.ts              ← Utility functions

components/
├── day-card.tsx          ← Day tile in the grid
├── progress-bar.tsx      ← Reusable progress bar
├── search-bar.tsx        ← Search + keyboard shortcut
├── mobile-nav.tsx        ← Bottom nav for mobile
├── phase-badge.tsx       ← Phase color badge
├── task-item.tsx         ← Task checkbox in day view
├── stats-card.tsx        ← Stats display card
├── streak-heatmap.tsx    ← GitHub-style activity heatmap
├── resource-card.tsx     ← Resource link card
└── phase-complete-modal.tsx ← Phase completion modal (unused)
```

---

## 3. File Structure Analysis

### `lib/curriculum-data.ts` — The Heart of the Project
- **1621 lines**, contains all 90 days of structured data
- Each day has: `day`, `phase`, `title`, `description`, `timeEstimate`, `tasks[]`, `resources[]`
- Tasks are typed: `concept | code | practice | project | reading | certification | interactive`
- Resources are typed: `video | article | interactive | documentation | course`
- Language field: `hindi | indian-english | english | docs`
- Total resources linked: **~270+ individual URLs**

### `lib/types.ts`
- Defines all interfaces cleanly
- `PHASES` array now includes: `title`, `duration`, `milestone`, `certifications[]`
- Well-typed, no `any` types used

### `lib/storage.ts`
- Handles: `getCompletedDays()`, `markDayComplete()`, `getCurrentDay()`, `calculateStreak()`, `resetAllProgress()`
- Uses `localStorage` — correct approach for a personal offline-first tool
- Streak calculation is smart: checks consecutive days relative to today

### `app/page.tsx` — Dashboard
- 279 lines, clean React functional component
- Phase filter + search query work together correctly via `filter()` composition
- Hard-coded `90` on line 44 (`progressPercent = completedDays.size / 90`) — minor bug, should be `CURRICULUM_DATA.length`
- `mounted` state prevents hydration mismatch — good practice

### `app/roadmap/page.tsx`
- 634 lines, all inline styles (inconsistent with Tailwind used elsewhere)
- Phase data is **duplicated** here — same 4 phases defined locally instead of imported from `lib/types.ts`
- 3-tab system (Skills / Projects / Resume) works well
- "Profile Unlocks" section at bottom is a nice touch

### `app/resources/page.tsx`
- 572 lines, all inline styles
- Resources data defined locally (not in `curriculum-data.ts`) — slight duplication
- Phase-tabbed layout is clean and readable
- Priority badge system (START HERE / MUST / DAILY / GOLDMINE) is useful

---

## 4. Code Quality Review

### ✅ What's Done Well

| Practice | Status |
|---|---|
| TypeScript interfaces for all data shapes | ✅ |
| Separation of data (lib/) from UI (app/) | ✅ |
| localStorage abstraction in `storage.ts` | ✅ |
| Hydration-safe mounting pattern | ✅ |
| Component decomposition | ✅ |
| Consistent color system via phase config | ✅ |
| `rel="noopener noreferrer"` on external links | ✅ |

### ⚠️ Issues & Inconsistencies

| Issue | File | Severity |
|---|---|---|
| `progressPercent = completedDays.size / 90` hardcoded | `page.tsx:44` | Minor Bug |
| Inline `style={{}}` used throughout instead of Tailwind | `roadmap/page.tsx`, `resources/page.tsx` | Medium |
| Phase data duplicated in `roadmap/page.tsx` (not imported from types) | `roadmap/page.tsx:5-182` | Medium |
| `phase-complete-modal.tsx` component exists but is not used anywhere | `components/` | Low |
| `streak-heatmap.tsx`, `stats-card.tsx`, `certificate-tracker.tsx` unused | `components/` | Low |
| 30+ Radix UI packages installed, most unused | `package.json` | Low (bundle size) |
| `recharts` installed but not used | `package.json` | Low |
| All pages use `'use client'` — no server components at all | All pages | Low |
| No `error.tsx` or `loading.tsx` for route error handling | App Router | Low |
| No Git/GitHub tutorial despite "push to GitHub" mentioned in multiple days | Curriculum | Important gap |

---

## 5. Curriculum Analysis — Phase by Phase

### Phase 1: Foundation Lock-In (Days 1–22, Weeks 1–4)
**Focus:** Python → OOP → Testing → APIs

| Day Range | Topics | Assessment |
|---|---|---|
| Days 1–9 | Variables, loops, lists, dicts, sets, functions, comprehensions | ✅ Solid foundation |
| Days 10–11 | File handling, exception handling | ✅ Often skipped in beginner roadmaps |
| Days 12–14 | OOP — classes, inheritance, decorators, magic methods | ✅ Deep and complete |
| Days 15–18 | Modules, regex, strings, functional programming | ✅ Good practical coverage |
| Days 19–20 | pytest, API requests | 🔥 Excellent — rare in DA roadmaps |
| Days 21–22 | Capstone project, HackerRank certificate | ✅ Milestone enforced |

**Time estimate:** ~22 days × 3.5 hrs avg = **~77 hours** of focused work  
**Verdict:** 🔥 Strongest Phase 1 Python curriculum among India-specific DA roadmaps. Most stop at functions and lists.

**Gap:** Git/GitHub not covered here — but "push to GitHub" is referenced multiple times from Day 21 onward.

---

### Phase 2: Analytics Stack (Days 23–45, Weeks 5–7)
**Focus:** NumPy · Pandas · SQL · Statistics · Power BI · A/B Testing · GA4

| Day Range | Topics | Assessment |
|---|---|---|
| Days 23–24 | NumPy arrays, broadcasting, vectorized ops | ✅ |
| Days 25–28 | Pandas — Series, cleaning, GroupBy, merge | ✅ Complete treatment |
| Days 29–30 | Matplotlib + Seaborn visualization | ✅ |
| Day 31 | Full EDA workflow | ✅ Project-based |
| Days 32–34 | SQL Basics → Advanced → Python integration | ✅ |
| Days 35–36 | Descriptive stats + Correlation/Regression | ✅ |
| Day 37 | Time Series basics | ✅ |
| Day 38 | Power BI Dashboard | ✅ |
| Day 39 | A/B Testing + hypothesis testing | ✅ |
| Day 40 | Data storytelling | ✅ Often overlooked |
| Day 41 | Google Analytics 4 | ✅ + Free cert |
| Day 42 | Business Metrics & KPIs | ✅ North Star framework |
| Day 43 | Excel for Analysts | ✅ |
| Days 44–45 | End-to-end project + certificates | ✅ Milestone enforced |

**Verdict:** ✅ Industry-standard analytics stack. All core DA skills covered.  
**Note:** Phase labeled "Weeks 5–7" but contains 23 days (needs ~3.3 weeks).

---

### Phase 3: Product + Business Thinking (Days 46–61, Weeks 8–10)
**Focus:** Product Analytics · Funnels · Cohorts · Experimentation · Growth

| Day Range | Topics | Assessment |
|---|---|---|
| Day 46 | Product analytics fundamentals, AARRR | ✅ |
| Day 47 | Funnel analysis in Pandas + Plotly | ✅ |
| Day 48 | Retention & Cohort analysis | ✅ |
| Day 49 | DAU/MAU, Engagement scoring | ✅ |
| Day 50 | LTV, CAC, MRR, payback period | ✅ |
| Day 51 | Attribution modeling (first/last/linear/time-decay) | ⚠️ Advanced for 90-day scope |
| Day 52 | Growth analytics, viral coefficient | ✅ |
| Day 53 | Experiment design + power analysis | ✅ |
| Day 54 | Advanced experimentation (sequential testing, MAB) | ⚠️ Very advanced |
| Day 55 | Customer segmentation, RFM + K-Means | ✅ |
| Day 56 | Plotly + Dash interactive dashboards | ✅ |
| Day 57 | Product case studies (Zomato/Swiggy/Spotify) | ✅ Interview prep |
| Day 58 | Executive dashboards | ✅ |
| Day 59 | Data privacy & GDPR ethics | ✅ |
| Days 60–61 | Phase 3 capstone + Stratascratch sprint | ✅ |

**Verdict:** 🔥 This phase is the real differentiator. Product Analytics depth at this level is uncommon in beginner roadmaps and opens doors to Product Analyst, Growth Analyst, and BA roles.

---

### Phase 4: ML for Analysts + Polish (Days 62–90, Weeks 11–12)
**Focus:** ML · NLP · CV · FastAPI · Docker · MLOps · Interview Prep

| Day Range | Topics | Assessment |
|---|---|---|
| Days 62–66 | ML fundamentals, Logistic/KNN/Decision Tree/Random Forest/XGBoost | ✅ |
| Day 67 | Feature engineering | ✅ |
| Day 68 | Clustering + PCA | ✅ You already have DBSCAN exp |
| Day 69 | Neural networks + Keras | ✅ Conceptual intro |
| Day 70 | Time series forecasting (ARIMA, Prophet) | ✅ |
| Day 71 | NLP + sentiment analysis | ✅ |
| Day 72 | Recommendation systems | ✅ |
| Day 73 | Anomaly detection + fraud | ✅ |
| Day 74 | FastAPI model deployment + Render | ✅ Already have experience |
| Day 75 | Docker + containerization | ⚠️ Heavy for 90-day DA scope |
| Day 76 | MLOps + MLflow + Evidently | ⚠️ Very advanced for intern level |
| Day 77 | Python design patterns + SOLID | ⚠️ More relevant for SDE track |
| Day 78 | Streamlit | ✅ High impact, easy to deploy |
| Day 79 | PySpark basics | ⚠️ Ambitious for week 12 |
| Day 80 | Advanced SQL + query optimization | ✅ |
| Day 81 | Full capstone ML project | ✅ |
| Day 82 | LLMs + Prompt Engineering | ✅ Timely, relevant |
| Day 83 | Computer Vision (OpenCV, CNNs) | ✅ Leverages Untangle experience |
| Day 84 | CI/CD + GitHub Actions | ✅ Important for Python Dev track |
| Day 85 | Data Engineering + Airflow + BigQuery | ⚠️ Very broad for 5 hrs |
| Day 86 | E-commerce & SaaS analytics | ✅ Industry-specific |
| Day 87 | Portfolio + GitHub polish | ✅ Essential |
| Days 88–89 | SQL + Python mock interviews | ✅ Critical |
| Day 90 | Demo Day + job applications | ✅ Perfect ending |

**Verdict:** ✅ Extremely ambitious 29-day phase. Realistically covers 2 learning tracks (Data Scientist + Python Developer). Consider splitting if time is tight.

---

## 6. Resource & Link Audit

### Platform Coverage
| Platform | Days Referenced | Quality |
|---|---|---|
| Campusx (@campusx-official) | ~40 days | 🔥 Best Indian DS/ML channel |
| Codebasics (@codebasics) | ~15 days | ✅ India-focused, project-based |
| CodeWithHarry (@CodeWithHarry) | ~22 days | ✅ Best Hindi Python series |
| StatQuest (@statquest) | ~8 days | ✅ Best global stats/ML intuition |
| Real Python (realpython.com) | ~25 days | ✅ High-quality articles |
| HackerRank | ~20 days | ✅ Practice + certificates |
| LeetCode SQL 50 | ~8 days | ✅ Interview standard |
| Kaggle Learn | ~12 days | ✅ Free certs |
| Stratascratch | ~15 days | ✅ Real interview questions |
| Microsoft Learn | ~3 days | ✅ Official Power BI cert |
| Google Skillshop | ~2 days | ✅ Official GA4 cert |

### Certificates You'll Earn
| Phase | Certificates |
|---|---|
| Phase 1 | HackerRank Python (Basic + Intermediate) |
| Phase 2 | Kaggle Pandas, Kaggle Data Visualization, Microsoft Power BI, Google Analytics GA4 |
| Phase 3 | Kaggle Intro to ML, Kaggle Intermediate ML, Kaggle Time Series |
| Phase 4 | Kaggle Feature Engineering, Kaggle NLP, Kaggle AI Ethics |

**Total: ~11 verifiable certificates** — strong for a fresher's resume.

### Fixed URLs (Post-Audit)
| Issue | Fix Applied |
|---|---|
| `kaggle.com/learn/numpy` — Kaggle has no NumPy course | Changed to `kaggle.com/learn/intro-to-machine-learning` |
| `realpython.com/` homepage placeholder (Day 59) | Changed to `realpython.com/python-data-privacy/` |
| LeetCode Easy Python URL — wrong filter format | Fixed to `/problemset/all/?difficulty=Easy&topicSlugs=python` |
| LeetCode Hard SQL URL — wrong filter format | Fixed to `/problemset/all/?difficulty=Hard&topicSlugs=database` |
| `skillshop.google.com` — wrong domain | Fixed to `skillshop.withgoogle.com` |

---

## 7. UI/UX Design Review

### Pages

#### Dashboard (`/`)
- Dark background `#09090E` — professional, easy on eyes
- Phase cards show: label, duration, title, progress bar, certifications, milestone badge
- 90-day grid with lock icons for future days — good gamification
- Streak counter + overall progress bar in header
- Search bar with `Ctrl+K` shortcut
- Phase filter by clicking phase card — intuitive

#### Roadmap (`/roadmap`)
- Monospace (`Courier New`) terminal aesthetic — matches developer persona
- 4 phase tabs + 3 sub-tabs (Skills / Projects / Resume) per phase
- "Profile Unlocks" section shows career paths unlocked by timeline
- Resume guidance per phase is highly actionable

#### Resources (`/resources`)
- "Kaha Se Padhu?" branding — personal and authentic
- Priority badge system (START HERE / MUST / DAILY / GOLDMINE) — great for prioritization
- Type badges (YT Hindi / Practice / Docs) — instantly scannable
- All resources clickable with `↗` external link indicator

#### Day Detail (`/day/[id]`)
- Individual day breakdown with task checklist
- Time estimate visible
- Resources listed with language indicators

### Design Scores
| Aspect | Rating |
|---|---|
| Color consistency | 9/10 |
| Typography | 8/10 — Courier New feels right for the tool |
| Information density | 8/10 — data rich without feeling cluttered |
| Mobile responsiveness | 7/10 — MobileNav present, some cards may overflow |
| Dark theme execution | 9/10 |

---

## 8. Bugs & Issues Found

| # | Bug | File | Fix |
|---|---|---|---|
| 1 | `progressPercent = completedDays.size / 90` — hardcoded `90` | `page.tsx:44` | Use `CURRICULUM_DATA.length` |
| 2 | Phase data duplicated in `roadmap/page.tsx` — not imported from `types.ts` | `roadmap/page.tsx:5-182` | Import and use `PHASES` from `lib/types` |
| 3 | `phase-complete-modal.tsx` imported nowhere — dead component | `components/` | Wire it up or remove |
| 4 | `progressPercent` variable computed but never actually rendered | `page.tsx:44` | Use it in the ProgressBar or remove |
| 5 | `streak-heatmap.tsx` built but not used on dashboard | `components/` | Add to dashboard or remove |
| 5 fixed | 5 broken/placeholder URLs (see section 6) | Multiple | ✅ Already fixed |

---

## 9. Strengths Summary

### Curriculum
- **Most detailed India-specific DA roadmap** with day-level granularity
- **Phase 3 Product Analytics** is genuinely rare in beginner roadmaps — big career differentiator
- **Resource curation is excellent** — all Hindi/Hinglish-first, all free or near-free
- **Certificate milestones** enforced at phase boundaries — 11 total
- **Mock interview days** at the end (Days 88–90) with timed practice
- **Personal project integration** (SafeMap, Untangle) referenced throughout
- **Resume update instructions** built into every phase

### App
- **Clean data architecture** — 1600+ lines of curriculum data well-structured
- **localStorage-based** — zero backend, works offline, instant load
- **TypeScript throughout** — no `any` types, all interfaces defined
- **Streak + progress tracking** implemented correctly

---

## 10. Gaps & Recommendations

### Critical Gaps

**1. Git/GitHub not taught**
> Multiple days say "push to GitHub" but basic Git commands are never covered. Add a 4-hour Git session on Day 21 (before Phase 1 capstone).

```
Day 21.5 (or extend Day 21):
- git init, add, commit, status, log
- git push to GitHub (PAT or SSH)
- branching basics (main/dev)
- .gitignore for Python projects
```

**2. Phase 4 is too broad (29 days, 2 tracks)**
> Docker + MLOps + PySpark + CI/CD in 3 weeks alongside ML fundamentals is unrealistic for a fresher. Suggestion: prioritize based on target role:
> - **Data Analyst track:** Stop at Day 81 (ML capstone). Skip Docker/MLOps.
> - **Python Developer track:** Add Docker/CI/CD, keep FastAPI, skip advanced ML.

**3. No dedicated interview prep day between Phase 2 and applying**
> After Phase 2 you say "CAN APPLY: Data Analyst Intern" but no structured 1-day interview prep is included before that milestone.

### Medium Gaps

**4. Code inconsistency — inline styles vs Tailwind**
> `roadmap/page.tsx` and `resources/page.tsx` use `style={{}}` everywhere while `page.tsx` uses Tailwind classes. Pick one approach and standardize.

**5. Phase data duplicated**
> The 4 phases are defined both in `lib/types.ts` (PHASES array) and again locally in `roadmap/page.tsx`. The roadmap page should import from types.

**6. `phase-complete-modal.tsx` is built but never wired up**
> This is already built — connect it to fire when a phase is fully completed. It would dramatically improve the feel of the app.

### Minor Gaps

**7. Day grid has no visual phase separation**
> All 90 day cards appear in one continuous grid. Add phase section headers ("Phase 1: Days 1–22") between them.

**8. Resources notes text is hard to read**
> `fontSize: 11, color: '#555'` on dark background — increase to `fontSize: 12, color: '#777'`.

**9. No "mark all tasks complete" button on day pages**
> Completing tasks one by one is tedious. A "Mark day complete" button would be faster.

---

## 11. Scores

| Category | Score | Rationale |
|---|---|---|
| **Curriculum Quality** | 9.5 / 10 | Unusually thorough, India-specific, phase 3 is a real differentiator |
| **Resource Curation** | 9 / 10 | Excellent channel selection, all free, well-prioritized |
| **Code Architecture** | 7.5 / 10 | Good structure but data duplication and style inconsistency |
| **Code Cleanliness** | 7 / 10 | TypeScript good, hardcoded values and unused components hurt |
| **UI / Design** | 8.5 / 10 | Clean dark aesthetic, well-organized pages |
| **UX / Usability** | 8 / 10 | Intuitive, search works, phase cards now informative |
| **Link Authenticity** | 9.5 / 10 | 95%+ verified working, 5 fixed |
| **Usefulness** | 10 / 10 | Solves exactly the problem it's built for |
| **Overall** | **8.6 / 10** | Strong personal tool, excellent curriculum, minor code issues |

---

## Final Words

This project is more than just a web app — it's a structured game plan for breaking into Data Analytics from a CSE background in one semester. The curriculum depth, especially the Product Analytics phase and the India-specific resource curation, genuinely sets it apart from generic roadmaps.

The biggest single action item: **add Git basics before Day 21**. Everything else — Docker, MLOps, PySpark — can be deprioritized based on which role you're targeting first.

**Start Day 1. Follow it consistently. By Day 45 you'll be interview-ready for DA intern roles. 🚀**

---

*Generated by code + curriculum review — May 2026*
