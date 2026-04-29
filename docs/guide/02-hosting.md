---
title: Hosting
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# Hosting

This project deploys to **GitHub Pages**. Here is why, plus the landscape of alternatives you will encounter in real jobs.

## The short answer

Push to `main`, wait ~2 minutes, your site is live at:

```
https://sk3869.github.io/scrollytellingtesting/
```

The workflow at [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) handles the build, applies the correct base path (`/scrollytellingtesting`), and uploads the static files. You do not run anything; GitHub does.

**One-time setup (already done for this repo):**
1. Go to **Settings → Pages → Build and deployment → Source → GitHub Actions**
2. Push any commit to `main` — first deploy takes ~2 minutes

## Hosting landscape

| Option | Free tier | Best for | Pain points |
|--------|-----------|----------|-------------|
| **GitHub Pages** *(this project)* | Generous | Static sites, student work, portfolios | Requires `basePath` config; no server-side code |
| **Vercel** | Generous | Next.js with SSR/ISR, preview deploys | Separate account; paid tiers |
| **Netlify** | Generous | Static + serverless functions | Another account to manage |
| **Cloudflare Pages** | Very generous | Static + edge functions, global CDN | Slightly different conventions |
| **Your own server** | Not free | Full control, any runtime | You maintain the OS, certs, security |

## Why GitHub Pages for this project

1. **You already have a GitHub account.** No new signup, no credit card.
2. **Nothing to leak.** No API keys, no database credentials to accidentally commit.
3. **Forces the right lessons.** Static export, base paths, limits of pre-rendered sites — real production concerns.
4. **Permanent URL for your portfolio.** `https://sk3869.github.io/scrollytellingtesting/` is yours.

## What GitHub Pages cannot do

Know these so you don't design a feature that won't work:

- **No server-side code.** No database queries, no API routes, no server-rendered pages.
- **No runtime environment secrets.** Secrets only exist at build time.
- **No server-side rendering.** Every page is pre-built at deploy time.
- **No custom auth.** Every visitor is anonymous.

If you need any of those, use Vercel or Netlify instead.

## How the base path works

GitHub Pages serves project sites at `/<repo-name>/`, not at `/`. So `/images/photo.jpg` would 404 — it needs to be `/scrollytellingtesting/images/photo.jpg`.

Next.js handles this automatically. The workflow sets:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /scrollytellingtesting
```

And `next.config.ts` reads it:

```ts
...(process.env.NEXT_PUBLIC_BASE_PATH && {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
})
```

Locally (`npm run dev`), `NEXT_PUBLIC_BASE_PATH` is not set, so routes work at `/`. On GitHub Pages they work at `/scrollytellingtesting/`. Both are correct.

## Vercel vs GitHub Pages for Next.js

Vercel is made by the Next.js team and supports all Next.js features (SSR, ISR, image optimisation, middleware). GitHub Pages only serves static files. That is why this project uses `output: "export"` and `images: { unoptimized: true }`.

For a commercial Next.js product, use Vercel. For a learning project or portfolio piece, GitHub Pages is the right fit.

## Custom domains

If you own a domain (e.g. `sriramkanala.com`):
1. Go to **Settings → Pages → Custom domain**
2. Add a `CNAME` record with your DNS provider pointing to `sk3869.github.io`
3. GitHub handles HTTPS automatically

Not required for this project.

Keep going → [04-your-assignment.md](04-your-assignment.md)
