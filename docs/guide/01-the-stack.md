---
title: The stack
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# The stack

This project uses **Next.js 16 with React 19 and TypeScript**, configured for static site export. Here is what each piece is and why it is here.

## React

A JavaScript library for building user interfaces out of **components** — small, reusable pieces of UI. A component is a function that takes data (props) and returns what to show:

```tsx
function SlideHeading({ text }: { text: string }) {
  return <h1 className="heading heading--1">{text}</h1>;
}
```

React handles updating the screen when data changes. You describe what to show; React figures out the minimal DOM changes to make it happen.

## JSX

JSX is the HTML-looking syntax inside those JavaScript/TypeScript files. It compiles down to function calls:

```tsx
// What you write:
<h1 className="heading">Hello, {name}</h1>

// What it becomes:
React.createElement("h1", { className: "heading" }, "Hello, ", name)
```

You never write the compiled version. The TypeScript compiler does that for you at build time.

## Next.js

React is a library — it doesn't care about routing, builds, or file conventions. Next.js adds all of that:

- **File-based routing** — `app/page.tsx` → `/`, `app/images/page.tsx` → `/images/`
- **Dev server** — hot reload, fast refresh, TypeScript support out of the box
- **Build pipeline** — compiles TypeScript, bundles JS, optimises output
- **Static export** — `output: "export"` pre-builds every page to plain HTML

## Static export

With `output: "export"`, Next.js runs your React components at build time and saves the output as `.html` files. When someone visits your site, GitHub Pages just serves those files. No server needed.

This is why the project uses `images: { unoptimized: true }` — Next.js image optimisation requires a server to resize images on demand. Static export can't do that.

## TypeScript

TypeScript adds type annotations to JavaScript. The compiler checks them before the code runs:

```ts
function getImages(): string[] { ... }  // must return an array of strings

getImages().forEach((img: number) => ...)  // ← TypeScript catches this mistake
```

You will hit TypeScript errors in the terminal. Read them top-to-bottom — they usually tell you exactly what type was expected and what was found.

## How this project is organised

| Path | What it is | Touch it? |
|------|-----------|-----------|
| `app/page.tsx` | Homepage — loads `content/home.md` | ✅ to change homepage |
| `app/globals.css` | Design system — all tokens, layouts, components | ✅ to change visual style |
| `content/home.md` | Slide content — Alzheimer's causes | ✅ to change content |
| `content/pages/*.md` | Depth pages (e.g. `/resources`) | ✅ to add pages |
| `public/images/` | Image assets | ✅ drop files here |
| `components/` | React components — layouts, motion, UI | ⚠️ with care |
| `lib/` | Content pipeline utilities | ⚠️ with care |
| `next.config.ts` | Build configuration | ❌ leave alone |
| `package.json` | Dependencies and scripts | ❌ leave alone |
| `tsconfig.json` | TypeScript configuration | ❌ leave alone |

## Why this stack and not something else

| Alternative | Why not used here |
|-------------|------------------|
| Plain HTML/CSS/JS | No component reuse, no build pipeline, no content pipeline |
| Astro | Less React ecosystem; fewer scrollytelling animation libraries |
| Gatsby | Slower build, heavier config, in maintenance mode |
| Create React App | No routing, no static export, deprecated |
| Hugo | Go templates instead of React; harder to port animation code |

Keep going → [02-hosting.md](02-hosting.md)
