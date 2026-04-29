---
title: Start here
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# Start here

You have been using AI for coding all semester. One chat, one file, one session, mostly homework-sized problems. **This project is different: multi-session, multi-file, real deployment.** The habits that worked on a one-shot assignment break at this scale — the AI forgets, invents APIs, contradicts yesterday's decisions, and confidently ships code that doesn't run.

This guide is about the habits that don't break.

> **The brief:** ship a scrollytelling web page on Alzheimer's disease causes, deployed to GitHub Pages.
> **The real lesson:** how to direct an AI coding assistant on a real project — with references, specs, phases, tests, and audits — without losing control of what it writes.

The Next.js stack is the *vehicle*. The process is the *payload*.

## Why these habits

The process in this guide is not taste. It is a response to four findings from large-scale empirical studies of AI coding agents:

- **Agents find the right file and still ship the wrong fix.** The ceiling is *judgment*, not editing skill.
- **Session shape beats session length.** Successful runs read, reproduce, edit once, then validate. Failed runs edit before they have read.
- **Unreviewable changes don't merge.** Size and noise kill more changes than bugs do.
- **The model matters more than the scaffold.** What carries is a tight spec and a real test.

Everything in Part 2 — the control loop, the spec/phase split, the exit checks, the audits — is aimed at these four failure modes.

## Reading order

Do Part 1 first. Ship something. Then come back for Part 2.

### Part 1 — Ship something first

| # | File | Time | Why |
|---|------|------|-----|
| 1 | [01-the-stack.md](01-the-stack.md) | 10 min | What Next.js, React, JSX, and static export actually are |
| 2 | [02-hosting.md](02-hosting.md) | 5 min | GitHub Pages vs Vercel, and why this class uses Pages |
| 3 | [04-your-assignment.md](04-your-assignment.md) | 10 min | The brief — setup, workflow, rubric, how to submit |

**Stop and ship.** Deploy a placeholder before reading Part 2.

### Part 2 — Why we work this way (read after first deploy)

| # | File | Time | Why |
|---|------|------|-----|
| 4 | [03-working-with-ai.md](03-working-with-ai.md) | 20 min | **Most important file.** Garden-hose model, failure modes, control loop, exit checks, audits |
| 5 | [07-prompt-templates.md](07-prompt-templates.md) | 10 min | Copy-pasteable prompts for every step of the control loop |
| 6 | [06-reference-as-context-pack.md](06-reference-as-context-pack.md) | 10 min | How to harvest ideas and working code from real sites into your own specs and phases |
| 7 | [08-a-real-run.md](08-a-real-run.md) | 10 min | One end-to-end run of the loop on a real phase — prompts, loopbacks, and all |

### Part 3 — Reference

| # | File | Why |
|---|------|-----|
| 8 | [05-glossary.md](05-glossary.md) | Every term in one place |
| — | [`../specs/`](../specs/) | What the site should do (6 spec files) |
| — | [`../phases/`](../phases/) | Step-by-step build plan (4 phases) |

## What you are building

A scrollytelling web page about **Alzheimer's disease** that:

1. Uses scroll to drive the story — sticky panels, parallax backgrounds, scroll-linked animation.
2. Is built from Markdown + React components.
3. Deploys to your own GitHub Pages URL: `https://sk3869.github.io/scrollytellingtesting/`.
4. Lists images automatically at `/images/`.

## What you are learning

- How a modern web framework (Next.js + React) is organised.
- How to deploy a static site to GitHub Pages for free.
- **How to direct an AI pair on a real project across many sessions — using files, not chat, to hold meaning.**

Keep going → [01-the-stack.md](01-the-stack.md)
