---
title: Your assignment
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# Your assignment — the brief

Think of this file as a technology brief handed to you on day one of a junior engineering job.

## Goal

Ship a personal scrollytelling web page at your own GitHub Pages URL, built from this template.

**Live URL:** `https://sk3869.github.io/scrollytellingtesting/`
**Topic:** Alzheimer's disease — the ten known causes

## Setup (already done for this repo)

1. Repo forked/created at `github.com/sk3869/scrollytellingtesting`
2. Cloned locally and `npm install` run
3. GitHub Pages enabled: **Settings → Pages → Source → GitHub Actions**
4. First push to `main` triggers the deploy workflow

## Workflow (for each piece of work)

1. **Decide scope.** What exactly are you building this session? Write it in one sentence.
2. **Decide the exit check.** How will you know it is done? ("Build passes" is not enough.)
3. **Build it.** By hand, with AI help, or both. When using AI, give it the scope and exit check up front.
4. **Run the check.** If it fails, fix, repeat.
5. **Commit and push.** Site redeploys automatically.

If you get stuck, the order to consult is:

1. Your own notes / the phase you are working on
2. The relevant spec in `../specs/`
3. The reference project (`kaw393939/bseai_degree`) — see [06-reference-as-context-pack.md](06-reference-as-context-pack.md)
4. The AI pair, with the above in hand
5. Your instructor

## Using the template's features

**Images.** Drop files into `public/images/`. Reference them in Markdown as `/images/yourfile.jpg`. They appear automatically at `/images/`.

**New slides.** Edit `content/home.md`. Slides are separated by `---`.

**New pages.** Create `content/pages/slug.md` with `layout: "standard"` frontmatter. Live at `/slug/` automatically.

**Image directives in slides:**
```markdown
![bg](/images/file.svg)              full-bleed cinematic background
![split](/images/file.svg)           right image, left text
![split-reverse](/images/file.svg)   left image, right text
```

**Custom code blocks in slides:**
````markdown
```cta
[Link label](/path)
[External](https://example.com)
```
```stat-grid
55M | People living with dementia
10M | New cases per year
```
````

## What makes a good submission

| Criterion | Target |
|-----------|--------|
| **Deployed** | Site live at `https://sk3869.github.io/scrollytellingtesting/` |
| **Original content** | Alzheimer's topic with your own writing — not placeholder text |
| **Scrollytelling element** | At least one scroll-linked effect (sticky panel, parallax, scene swap) |
| **Images used intentionally** | At least one image in `public/images/`, visible on the page, listed at `/images/` |
| **Clean commit history** | Commits have real messages — no `wip`, `asdf`, or `final-FINAL-v2` |
| **README updated** | Live site URL and your name — both present |
| **PROCESS.md submitted** | Short file showing how you worked, not just what you shipped |

## PROCESS.md — grading the payload, not just the vehicle

Anyone can ship a deployed page. The point of this assignment is practising how to direct an AI pair on something bigger than a chat window. Alongside your site, commit `PROCESS.md` containing three sections:

1. **One feature, the prompts you used.** Pick one feature you built with AI help. Paste the actual prompts in order. No editing for flattery.
2. **Exit checks — pass and fail.** For that same feature, list the exit checks you defined and mark each pass or fail.
3. **Failure-mode reflection.** Which of the four failure modes did you actually hit? Describe the moment in one paragraph.

**The four failure modes (from [03-working-with-ai.md](03-working-with-ai.md)):**
- Short memory
- Invents when unsure
- Does more than you asked
- Cannot tell you it is lost

Length target: one page. Admitting mistakes is worth more than pretending everything was smooth.

## Stretch goals

- Multiple scroll-linked scenes
- Custom fonts or a deliberate type system
- Working through all phases in `../phases/` to build out the full content pipeline
- A custom domain

## How to submit

1. Confirm `https://sk3869.github.io/scrollytellingtesting/` loads correctly
2. Confirm `README.md` has your live URL and your name (Sriram Kanala ✅)
3. Confirm `PROCESS.md` exists with all three sections
4. Submit the GitHub repo URL to your instructor

Keep going → [03-working-with-ai.md](03-working-with-ai.md)
