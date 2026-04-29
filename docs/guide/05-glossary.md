---
title: Glossary
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# Glossary

One-line definitions for every term you will hit in this project.

## Web / framework terms

- **Component** — a reusable piece of UI, written as a function that returns JSX. See [01-the-stack.md](01-the-stack.md).
- **Props** — the arguments a component receives: `function Heading({ text }) { ... }`.
- **JSX** — HTML-looking syntax inside JavaScript/TypeScript. Compiles to `React.createElement(...)` calls.
- **Hydration** — when a server-rendered HTML page wakes up and becomes interactive in the browser.
- **Static export** — a Next.js mode (`output: "export"`) that pre-builds every page to plain HTML at build time. No server needed to run the site.
- **SSR (server-side rendering)** — page HTML is generated on each request by a server. Not used here.
- **SSG (static site generation)** — page HTML is generated once at build time. This project uses SSG via static export.
- **ISR (incremental static regeneration)** — SSG with scheduled re-builds. Not available on GitHub Pages.
- **basePath** — the URL prefix your site lives under. For this project: `/scrollytellingtesting`. Next.js applies it automatically when `NEXT_PUBLIC_BASE_PATH` is set.
- **CSS Modules** — per-file scoped CSS. `StandardLayout.module.css` becomes a JS object where class names are unique. Used in `StandardLayout.tsx`.
- **Markdown** — lightweight text format with `# headings`, `**bold**`, `[links](url)`, etc.
- **Frontmatter** — a YAML block at the top of a Markdown file between `---` lines. Used for `title`, `layout`, `seo`, etc.
- **Zod** — a TypeScript library for validating that data matches a schema. Used in `lib/content/schema.ts` to validate Markdown frontmatter.
- **gray-matter** — a library that parses frontmatter out of Markdown files. Used in `lib/content/repository.ts`.
- **next-mdx-remote** — a library that renders MDX (Markdown with JSX) as React components at build time. Used in `components/markdown/MarkdownRenderer.tsx`.

## Deployment terms

- **GitHub Pages** — GitHub's free static-site hosting. Serves files from a branch or from GitHub Actions.
- **GitHub Actions** — GitHub's CI/CD system. Runs workflows defined in `.github/workflows/*.yml`.
- **Workflow** — the YAML file `.github/workflows/deploy.yml`. Builds and deploys the site on every push to `main`.
- **Artifact** — the output uploaded to GitHub Pages by `actions/upload-pages-artifact`. In this project, that is the `./out` folder from `npm run build`.
- **Vercel** — commercial hosting platform made by the Next.js team. Supports full Next.js features. Not used here.

## Scrollytelling terms

- **Scrollytelling** — a web storytelling technique where scrolling the page drives the narrative: panels stick, images change, text reveals.
- **Sticky element** — an element that scrolls with the page until it hits an offset, then stays pinned while other content scrolls past. CSS: `position: sticky; top: 0`.
- **Sticky stage** — the core scrollytelling pattern used here: a tall `section` (170–200vh) contains a `100vh` sticky inner. As the outer section scrolls, the sticky stage stays pinned, and `scrollYProgress` (0→1) drives animations.
- **Viewport** — the visible portion of the browser window.
- **IntersectionObserver** — a browser API that fires when an element enters or leaves the viewport. Used for "fade in on scroll" effects.
- **Framer Motion** — the React animation library used in this project. Provides `motion.div`, `useScroll`, `useTransform`, `useSpring`, `useVelocity`, and more.
- **useScroll** — a Framer Motion hook that returns `scrollYProgress` (0→1) as the user scrolls through a target element. Used in `PresentationSlide.tsx`.
- **useTransform** — a Framer Motion hook that maps one motion value to another. E.g. maps `scrollYProgress` (0→1) to `opacity` (0→1).
- **Parallax** — a visual effect where a background moves at a different rate than the foreground, creating depth. Used in `ParallaxBackground.tsx`.
- **Glass panel** — the semi-transparent frosted card used to display slide content. CSS class `.glass-panel` / `.glass-panel--dark`.

## Content pipeline terms

- **SlideNode** — the parsed data structure for one slide. Has `cleanContent`, `backgroundSrc`, `backgroundFocal`, `splitSrc`, `splitReverseSrc`.
- **Slide directive** — an image syntax in Markdown that controls slide layout: `![bg](...)`, `![split](...)`, `![split-reverse](...)`.
- **Custom code block** — a fenced code block with a special language tag that renders a UI component instead of code. Supported tags: `cta`, `stat-grid`, `source-line`.
- **ContentRepository** — the class in `lib/content/repository.ts` that loads and Zod-validates Markdown files.
- **splitMarkdownIntoSlides** — the pure function in `lib/content/parser.ts` that splits a Markdown body into `SlideNode[]` on `---` separators.

## AI-collaboration terms

- **Spec** — a short, stable file describing *what* a piece of the project should do. Lives in `docs/specs/`.
- **Phase** — a scoped implementation step with explicit files to change and runnable exit checks. Lives in `docs/phases/`.
- **Reference** — a real working codebase used as ground truth to port from (`kaw393939/bseai_degree`). See [06-reference-as-context-pack.md](06-reference-as-context-pack.md).
- **Exit check** — a runnable command or observable state that decides whether a task is done. Not a vibe. E.g. `npm run test` exits 0.
- **Context pack** — a curated bundle of real source files + notes that give an AI concrete ground when it writes code. See [06-reference-as-context-pack.md](06-reference-as-context-pack.md).
- **Garden-hose model** — the mental model for AI collaboration: wide spray (explore) → narrow jet (execute). See [03-working-with-ai.md](03-working-with-ai.md).
- **Harvest** — Step 1 of the planning loop. Wide survey of the codebase — list what exists, don't propose yet.
- **Converge** — Step 2 of the planning loop. Rank ideas, agree on scope in one paragraph.
- **Pre-flight QA** — Step 5 of the execution loop. Validate the phase plan against the real codebase before executing.
- **Trajectory** — the sequence of actions (read / locate / reproduce / explain / edit / verify) a coding session follows. Shape matters more than length.
- **Thrash** — a session that edits repeatedly without diagnosis. A `thrash` row in the trajectory table is a signal to stop and loop back.

## Where to look things up

- React: <https://react.dev>
- Next.js: <https://nextjs.org/docs>
- Framer Motion: <https://www.framer.com/motion/>
- MDN (HTML, CSS, JS): <https://developer.mozilla.org>
- TypeScript: <https://www.typescriptlang.org/docs/>
- Vitest: <https://vitest.dev>
