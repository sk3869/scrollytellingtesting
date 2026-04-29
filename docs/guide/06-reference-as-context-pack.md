---
title: Reference projects as context packs
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# Reference projects as context packs

One of the highest-leverage things you can do when building with AI is to **stop asking it to invent** and **start asking it to port**. The tool for that is a *reference project* — a real, working codebase you point the AI at when you say "do something like this."

## The reference used in this project

This project was built by harvesting patterns from a larger scrollytelling site:

- **Reference (repo):** <https://github.com/kaw393939/bseai_degree>
- **Reference (live):** <https://kaw393939.github.io/bseai_degree/>
- **This project (repo):** <https://github.com/sk3869/scrollytellingtesting>
- **This project (live):** <https://sk3869.github.io/scrollytellingtesting/>

The parent site has the full working implementation of sticky scenes, scroll-scrubbed reveals, presentation-mode slides, and a Markdown-driven content pipeline. Every component in `components/` was ported from it — with Alzheimer's content substituted for the BSEAI degree content.

## What is a context pack

A **context pack** is a curated bundle of real artefacts that give an AI concrete ground to stand on when it writes code. A good context pack contains:

- **Working source files.** The actual `.tsx`, `.ts`, `.css` that already solve the problem.
- **A short description of what it is and why it exists.** One paragraph per concern.
- **The decision trail.** Why this pattern and not another.
- **A mapping from "what I want" to "files to read."** E.g. "to add a sticky scene, read `components/motion/PresentationSlide.tsx`."

## Why this saves tokens and improves quality

**Token savings.** An AI that has to invent an answer hedges — it tries multiple approaches, re-derives first principles, produces boilerplate. An AI handed a reference file does one thing: rewrites that file to fit your context.

**Quality.** The thing an AI is worst at — knowing the shape of an API it hasn't seen recently — is exactly what a reference file supplies. It reads `useScroll` used in the reference five seconds before it writes `useScroll` in your code.

**Reusability.** A context pack built for one project can be reused for the next. The scarce resource in future work is not "can I figure this out" — it is "can I get back to it quickly." A context pack is that shortcut, paid forward.

## How to harvest a pattern from bseai_degree

This is the workflow to copy any pattern from the reference into your project.

### 1. Identify the pattern

Browse the live site. Find one thing. Write it in one sentence:
> *"I want the sidebar progress dots on the right edge."*

### 2. Locate the files

Find the smallest set of files that contains the pattern. For the progress dots:
- `components/motion/PresentationProgress.tsx`
- `components/motion/presentation-nav.ts`
- The CSS for `.presentation-progress` in `app/globals.css`

### 3. Write a one-paragraph harvest note

```markdown
# Progress dots (ported from bseai_degree)
Source: https://github.com/kaw393939/bseai_degree/blob/main/components/motion/PresentationProgress.tsx
What it does: Right-side fixed rail with 6 visible dots, sliding window, editable counter.
Key files: PresentationProgress.tsx, presentation-nav.ts, globals.css (.presentation-progress-*)
Why this design: Uses getBoundingClientRect polling on scroll — simpler than IntersectionObserver for this use case.
```

### 4. Turn it into a spec

Write `docs/specs/NN-progress-rail.md` — what the behaviour should be, not the code.

### 5. Turn the spec into a phase

Write `docs/phases/NN-progress-rail.md` with objective, reference paths → target paths, steps, exit checks.

### 6. Implement

Give the AI the phase file, the spec, and the two or three reference files:

> "Implement phase NN. Read the phase file first, then the spec, then the listed reference files. Port into the target paths. Run the exit checks."

That is the narrow jet. The wide spray happened in steps 1–3.

## The harvest-and-port loop over time

1. **Project A.** Build something, keep the code readable.
2. **Project B.** Harvest from A when you want a pattern. Write a spec + phase + note in B. A is untouched.
3. **Project C.** Harvest from both A and B. If a pattern appears everywhere, promote it to a scaffold repo.
4. **Project D onward.** Start from the scaffold. New patterns flow in; old ones are already there.

Professional teams do this exact thing with internal component libraries and design systems.

## Two failure modes to avoid

- **Cargo-culting.** Porting a pattern you don't understand because the reference used it. Always write the one-paragraph "why" note — it forces you to check.
- **Stale references.** A reference locked to an old Next.js version will lead you into old APIs. For version-sensitive things (build config, hooks, deployment), trust the current docs over the reference.

## Keep reading

- [03-working-with-ai.md](03-working-with-ai.md) — the mental model this complements
- [04-your-assignment.md](04-your-assignment.md) — the workflow this feeds into
- Reference live site: <https://kaw393939.github.io/bseai_degree/>
