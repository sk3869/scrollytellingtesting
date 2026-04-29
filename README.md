# Alzheimer's Disease: Understanding the Causes

A scrollytelling presentation on the ten known causes of Alzheimer's disease, built with Next.js and Framer Motion.

**Live site:** https://sk3869.github.io/scrollytellingtesting/
**Author:** Sriram Kanala

---

## Setup

```bash
npm install
npm run dev        # localhost:3000
npm run build      # static export → /out
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest unit tests
npm run test:e2e   # Playwright e2e
```

---

## Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 — App Router, static export |
| Language | TypeScript (strict) |
| Animations | Framer Motion 12 |
| Content | Markdown + gray-matter + Zod |
| Rendering | next-mdx-remote (RSC) + remark-gfm |
| Fonts | Newsreader · Public Sans |
| Testing | Vitest · Playwright |
| Deploy | GitHub Pages via GitHub Actions |

---

## Deployment

**One-time setup:**
1. Fork this repo
2. Go to **Settings → Pages → Source → GitHub Actions**
3. Push any commit to `main` — when the Actions tab goes green, the site is live at `https://<user>.github.io/<repo>/`

The workflow sets `NEXT_PUBLIC_BASE_PATH` to the repo name automatically.

---

## Project structure

```
.github/workflows/deploy.yml   ← CI/CD pipeline
app/
  page.tsx                     ← homepage (loads content/home.md)
  [...slug]/page.tsx            ← depth pages (content/pages/*.md)
  images/page.tsx               ← auto-gallery of public/images/
  globals.css                   ← design system tokens + layout
  layout.tsx                    ← root layout + fonts
components/
  layouts/                      ← PageLayoutFactory · PresentationLayout · StandardLayout
  markdown/                     ← MarkdownRenderer (cta · stat-grid · source-line)
  motion/                       ← Reveal · DriftMedia · SceneCard · ParallaxBackground
                                   PresentationSlide · PresentationProgress
                                   PresentationShortcuts · PresentationFooterGate
  ui/                           ← Heading · Text · CallToActionGroup · SourceLine
  visualization/                ← StatGrid
  site-header.tsx · site-footer.tsx · page-shell.tsx
content/
  home.md                       ← 13 Alzheimer's slides
  pages/resources.md            ← /resources depth page
docs/
  specs/                        ← what to build (one file per concern)
  phases/                       ← when and how (execution plans with exit checks)
lib/
  content/                      ← schema · repository · parser · depth-page
  site-config.ts · sources.ts · stakeholder-paths.ts · image-credits.ts
public/images/                  ← drop images here; auto-listed at /images/
tests/unit/                     ← Vitest tests (mirrors source paths)
eslint.config.mjs
next.config.ts
PROCESS.md
```

---

## Adding content

**New slide** — edit `content/home.md`, separate slides with `---`. Image directives:
```markdown
![bg](/images/file.jpg)             full-bleed cinematic background
![split](/images/file.jpg)          right image, left text
![split-reverse](/images/file.jpg)  left image, right text
```

**Custom code blocks:**
````markdown
```cta
[Label](/path)
[External](https://example.com)
```
```stat-grid
55M | People living with dementia
10M | New cases per year
```
````

**New depth page** — create `content/pages/slug.md` with `layout: "standard"`. Live at `/slug/` automatically.

**Images** — drop into `public/images/`, reference as `/images/file.jpg`. Auto-listed at `/images/`.

---

---

# Planning log

_A record of every planning step run in this project. Updated after each step._

---

## Step 1 — Harvest · 2026-04-28

A full codebase read was run to catalogue everything before proposing changes.

### Working

| Area | What's there |
|------|-------------|
| Layout system | Two layouts (`"presentation"` / `"standard"`) selected by frontmatter. `PageLayoutFactory` routes between them. Presentation uses sticky-scroll pin (170–200vh sections, 100vh sticky stage). Split and standard block variants. |
| Content pipeline | `ContentRepository` loads + Zod-validates markdown. `splitMarkdownIntoSlides` parses slides on `---` and strips image directives. `MarkdownRenderer` (RSC) handles `cta`, `stat-grid`, `source-line` code blocks. |
| Motion system | `PresentationSlide` provides `scrollYProgress` via `SlideContext`. `ParallaxBackground` (velocity blur, y-parallax, vignette). `Reveal`, `DriftMedia`, `SceneCard`, `LayeredRevealGroup` — all respect `prefers-reduced-motion`. |
| Navigation | `PresentationProgress` (6-dot rail, editable counter). `PresentationShortcuts` (arrows, j/k, Home/End, `/` palette, `?` help). `PresentationFooterGate` (body classes for first/middle/last slide). |
| Design system | Golden-ratio type scale, 24px spacing grid, cream/ink/accent palette, alpha ramps, glass panels, responsive at 1100/768/480px. |
| Build | `output: "export"`, `trailingSlash`, optional `NEXT_PUBLIC_BASE_PATH`. `npm run build` passes — generates `/`, `/resources/`, `/_not-found`. |
| Content | `home.md` — 13 slides, all 10 Alzheimer's causes, `![split]` + `![split-reverse]` directives, `stat-grid` and `cta` blocks. |
| Sources | `lib/sources.ts` — 4 real sources defined (alz2024, who2023, lancet2020, nia2024). |

### Missing or empty

| Path | Finding |
|------|---------|
| `.github/workflows/` | Does not exist — no deploy |
| `eslint.config.mjs` | Does not exist — `npm run lint` crashes |
| `app/images/page.tsx` | Does not exist — `/images/` is a 404 |
| `public/images/` | `.gitkeep` only — no images committed |
| `tests/` | `.gitkeep` only — zero tests |
| `docs/` | Does not exist — no specs or phases |
| `PROCESS.md` | Does not exist |

---

## Step 2 — Converge · 2026-04-28

**Ranked by: assignment pass/fail → course concept → effort**

| # | Gap | Impact | Effort |
|---|-----|--------|--------|
| 1 | No deploy workflow | Zero on "Deployed" criterion | Low |
| 2 | No ESLint config | Exit checks can't run | Low |
| 3 | No `/images/` page | Explicitly required in brief | Low |
| 4 | No images in `public/images/` | "At least one image visible" required | Medium |
| 5 | No `PROCESS.md` | Explicitly graded | Trivial |
| 6 | No unit tests | PROCESS.md needs a real exit check | Medium |
| 7 | No `docs/` scaffold | Core methodology the course is teaching | Low |

**Agreed scope:** Fix the two hard blockers (deploy workflow + ESLint config), then add the `/images/` route and SVG image assets wired into `home.md`, then write `PROCESS.md` and one unit test for `splitMarkdownIntoSlides`, then scaffold `docs/specs/` and `docs/phases/`. Defer full test suite, Playwright e2e, `scripts/`, and additional depth pages.

---

## Step 3 — Specs · 2026-04-28

Six spec files written to `docs/specs/`:

| Spec | One-line purpose |
|------|-----------------|
| `01-deploy.md` | GitHub Actions workflow — static export + deploy to Pages with `NEXT_PUBLIC_BASE_PATH` |
| `02-images-route.md` | `/images/` page — build-time gallery of `public/images/`, empty-state safe |
| `03-image-assets.md` | At least 3 SVG images in `public/images/`, referenced in `home.md` slides |
| `04-eslint.md` | `eslint.config.mjs` — flat config (ESLint 9), `npm run lint` exits 0 |
| `05-process-doc.md` | `PROCESS.md` — three required sections: prompts, exit checks, failure-mode |
| `06-parser-tests.md` | Vitest unit tests for `splitMarkdownIntoSlides` — 7 cases, no mocking |

---

## Step 4 — Phases · 2026-04-28

Four phase files written to `docs/phases/`. All 6 specs covered — no gaps.

| Phase | Specs | Status |
|-------|-------|--------|
| `00-scaffold.md` | (pre-spec) | ✅ Complete |
| `01-deploy.md` | 01, 04 | ✅ Complete |
| `02-images.md` | 02, 03 | ⏳ Pending |
| `03-tests-and-docs.md` | 05, 06 | ⏳ Pending |

---

## Phase 01 execution · 2026-04-28

### Pre-flight QA

| Check | Result |
|-------|--------|
| ESLint 9.39.4 installed | ✅ |
| `typescript-eslint` installed | ✅ |
| `@eslint/js` installed | ✅ |
| `npm run lint` currently fails (expected) | ✅ crashes with "no config found" |
| `.github/` does not exist (needs creating) | ✅ confirmed |

All clear. No loopbacks needed.

### Objective A — ESLint config

Created `eslint.config.mjs` using flat config (ESLint 9 format) extending `eslint:recommended` + `typescript-eslint/recommended`. Unused vars set to `warn`, explicit-any set to `warn`. `.next/`, `out/`, `docs/` ignored.

**Exit check:** `npm run lint` → exit code 0 ✅

### Objective B — GitHub Actions workflow

Created `.github/workflows/deploy.yml`. Two jobs: `build` (runs `npm ci`, `npm run build` with `NEXT_PUBLIC_BASE_PATH` set to the repo name, uploads `./out`) and `deploy` (uses `actions/deploy-pages@v4`). Triggers on push to `main` and `workflow_dispatch`.

**Exit check:** `actions/deploy-pages` present in workflow ✅ · `npm run lint` exit 0 ✅ · `npm run build` exit 0 ✅

### Review burden

| Item | Value |
|------|-------|
| Files changed | 2 new |
| LOC added | ~50 |
| Tests added | 0 |
| Commands run | `lint` ✅ · `build` ✅ |
| Scope respected | No app/component/content files touched |
| Reviewer focus | Workflow permissions block · `NEXT_PUBLIC_BASE_PATH` passthrough |

---

---

## Phase 02 execution · 2026-04-28

### Pre-flight QA

| Check | Result |
|-------|--------|
| `public/images/` has only `.gitkeep` | ✅ confirmed empty |
| `home.md` references `.jpg` paths that don't exist | ✅ found — `genetics-dna.jpg`, `heart-brain.jpg`, `sleep-brain.jpg` |
| No `![bg]` on hero or closing slides | ✅ confirmed missing |
| `app/images/` route does not exist | ✅ confirmed |
| `vitest.config.ts` does not exist | ✅ confirmed — Vitest installed but no config yet |

Pre-flight flagged that all three existing image refs used `.jpg` extensions — updated to `.svg` during execution.

### Objective A — `/images/` route

Created `app/images/page.tsx` as a React Server Component. Uses `fs.readdirSync` at build time to read `public/images/`, filters to real image extensions (jpg, jpeg, png, gif, svg, webp), skips `.gitkeep`. Renders a CSS grid gallery with filename labels. Handles empty state with a message rather than crashing.

**Exit check:** `npm run build` generates `/images/` as a static route ✅

### Objective B — SVG image assets

Created 5 SVG files in `public/images/`:

| File | Used on slide | Description |
|------|--------------|-------------|
| `hero-brain.svg` | Slide 1 (hero) `![bg]` | Neural network on dark amber background |
| `genetics-dna.svg` | Slide 5 (genetics) `![split]` | DNA double helix with coloured base pairs |
| `heart-brain.svg` | Slide 7 (cardiovascular) `![split-reverse]` | Heart and brain connected by blood vessels |
| `sleep-brain.svg` | Slide 10 (sleep) `![split]` | Brain with crescent moon and glymphatic wave patterns |
| `closing-hope.svg` | Slide 13 (closing) `![bg]` | Warm light rays on dark background |

Updated `content/home.md`:
- Added `![bg](/images/hero-brain.svg)` to the opening hero slide
- Changed all three `![split]` / `![split-reverse]` refs from `.jpg` → `.svg`
- Added `![bg](/images/closing-hope.svg)` to the closing slide

All 5 directives confirmed: `![bg]`, `![split]`, `![split-reverse]`, `![split]`, `![bg]`.

**Exit check:** 5 images in `public/images/` ✅ · all directives in `home.md` ✅

### Exit QA — full quality suite

| Check | Result |
|-------|--------|
| Image count ≥ 3 | ✅ 5 files |
| `home.md` has `![bg]` directive | ✅ 2 instances |
| `home.md` has `![split]` / `![split-reverse]` directives | ✅ 3 instances |
| `/images/` listed in build output | ✅ `○ /images` (static) |
| `npm run lint` | ✅ exit 0 |
| `npm run build` | ✅ exit 0 |

### Review burden

| Item | Value |
|------|-------|
| Files changed | 7 (5 SVGs new, 1 page new, 1 content patch) |
| LOC added | ~470 |
| Tests added | 0 |
| Scope respected | No component, lib, or config files touched |
| Reviewer focus | `app/images/page.tsx` — `fs.readdirSync` at build time; confirm empty-dir branch works |

---

---

## Phase 03 execution · 2026-04-28

### Pre-flight QA

| Check | Result |
|-------|--------|
| `vitest.config.ts` exists | ❌ missing — must create |
| `tests/unit/` exists | ✅ (`.gitkeep` only) |
| `npm run test` currently fails | ✅ exits code 1 — "no test files found" |
| `PROCESS.md` exists | ❌ missing |
| Parser is a pure function (no DOM / fs needed) | ✅ confirmed — safe to test in `node` environment |

Pre-flight flagged the missing `vitest.config.ts` — added as an unplanned prerequisite before writing tests.

### Objective A — `vitest.config.ts`

Created `vitest.config.ts` pointing at `tests/unit/**/*.test.ts`, using `node` environment (parser needs no DOM), with `@` path alias matching `tsconfig.json`.

### Objective B — Parser unit tests

Created `tests/unit/lib/content/parser.test.ts` with 10 test cases covering:

| Test | What it checks |
|------|---------------|
| Multi-slide positive case | 3-slide input → 3 `SlideNode` objects with correct content |
| `![bg]` directive | `backgroundSrc` set, directive stripped from `cleanContent` |
| `![bg 50% 65%]` focal point | `backgroundFocal` set to `"50% 65%"` |
| `![split]` directive | `splitSrc` set, stripped from `cleanContent` |
| `![split-reverse]` directive | `splitReverseSrc` set, stripped from `cleanContent` |
| Single slide (no `---`) | Returns exactly 1 node |
| Empty string | Returns `[]` |
| Whitespace-only | Returns `[]` |
| `rawContent` preserved | Original text including directives intact |
| `---` with whitespace | Still splits correctly |

**Exit check:** `npm run test` → 10 / 10 passed, exit 0 ✅

### Objective C — `PROCESS.md`

Created `PROCESS.md` at repo root with all three required sections:
1. **Prompts used** — 10 actual prompts from this session, in order, unedited
2. **Exit checks** — 13 checks for the parser feature, all marked ✅ PASS
3. **Failure-mode reflection** — "does more than you asked" — AI built plain HTML/CSS/JS on the first prompt instead of asking what stack/template was needed; had to rebuild entirely from scratch

**Exit check:** file exists ✅ · all three required headings present ✅

### Exit QA — full quality suite

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ exit 0 |
| `npm run test` | ✅ 10 / 10 passed, exit 0 |
| `npm run build` | ✅ exit 0 — all 5 routes generated |

### Review burden

| Item | Value |
|------|-------|
| Files changed | 4 new (`vitest.config.ts`, test file, `PROCESS.md`, phase doc) |
| LOC added | ~220 |
| Tests added | 10 |
| Scope respected | No app/component/lib/content files touched |
| Reviewer focus | `PROCESS.md` Section 1 — confirm prompts are faithful to session |

---

## All phases complete · 2026-04-28

| Phase | Specs | Status |
|-------|-------|--------|
| 00 — Scaffold | (pre-spec) | ✅ |
| 01 — Deploy | 01-deploy · 04-eslint | ✅ |
| 02 — Images | 02-images-route · 03-image-assets | ✅ |
| 03 — Tests & docs | 05-process-doc · 06-parser-tests | ✅ |

**Full quality gate (final):** `npm run lint` ✅ · `npm run test` 10/10 ✅ · `npm run build` ✅

**Outstanding:** Push to GitHub, enable Pages in Settings → Pages → GitHub Actions, confirm live URL, add URL and name to top of this README.
