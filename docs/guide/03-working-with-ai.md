---
title: Working with AI
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# Working with AI

> This is the most important file in the guide. Read it after your first deploy.

## The core claim

> **AI coding success is determined more by process than by prompting.**

Recent empirical research on coding agents shows performance is driven by **behavioural patterns (trajectories)**, not outputs. Failure modes are **systematic**, not random. Correctness depends on **validation and context**, not fluency.

This leads to the working principle:

```
AI generates code.
Humans define intent, constraints, and verification.
```

## The garden-hose model

Think of directing an AI like holding a garden hose:

- **Wide spray** — explore, list, survey. "Tell me what's here." Used in Harvest and Converge.
- **Narrow jet** — execute, one objective at a time. "Do exactly this." Used in Implement.

Most failed AI sessions use the jet setting for exploration (too narrow, invents because context is missing) or the spray setting for implementation (too wide, does more than asked). Match the setting to the step.

## The four failure modes

Every AI session that goes wrong falls into one of these:

| Mode | What it looks like |
|------|--------------------|
| **Short memory** | AI forgets decisions made earlier in the same session; contradicts itself |
| **Invents when unsure** | AI makes up an API, a file path, or a package that doesn't exist |
| **Does more than you asked** | AI refactors three files when you asked it to change one |
| **Cannot tell you it is lost** | AI confidently produces code that doesn't address the actual problem |

The process below is designed to prevent all four.

## The control loop

```
Planning:   Harvest → Converge → Specify → Phase
Execution:  Pre-flight QA → Implement (with tests) → Exit QA
```

### Planning loop

**Step 1 — Harvest (wide spray)**
> "Go look at this codebase and tell me all the good ideas you can find. Focus on [area]. Do not propose changes yet — just list what is already there."

Output: a menu of options.

**Step 2 — Converge**
> "Rank these ideas by [criterion]. Which two or three should we do? Write the agreed scope as a single paragraph."

Output: one paragraph you can defend.

**Step 3 — Specify**
> "Create specs in `docs/specs/` for the scope we agreed on. Each spec: one-line purpose, 'what done looks like', constraints, non-goals."

Output: small, stable files. One concern per file.

**Step 4 — Phase**
> "Review the specs and plan phases in `docs/phases/`. Each phase names its specs, lists concrete objectives, and defines a runnable exit check. Flag any spec with no phase."

Output: explicit coverage. Gaps become bugs later.

### Execution loop (per phase)

**Step 5 — Pre-flight QA**
> "QA `docs/phases/NN-name.md` against the current codebase. Check: file paths still exist, specs still say what the phase claims, dependencies installed, exit checks runnable. Report what you'd change."

Output: reconciled plan. Never skip this.

**Step 6 — Implement**
> "Execute phase NN. Work one objective at a time. Do not touch files outside the phase scope. Do not skip the exit check for an objective before moving to the next. If you hit something the phase didn't anticipate, stop and ask."

Output: code changes, narrowly scoped.

**Step 6a — Tests**
Write after each objective:
- Unit tests: positive case, negative case, edge cases
- Integration tests: real implementations where possible
- E2E golden path: one Playwright test per spec

**Step 7 — Exit QA**
> "Run `npm run lint && npm run test && npm run build && npm run test:e2e`. Report pass/fail for each objective's exit check. Do not mark the phase complete if any check fails."

Output: pass/fail only. No vibes.

## Tests as durable exit checks

A test is not just quality assurance — it is a machine-readable record of what "done" means. When you write an exit check as a test, it survives the next AI session, the next month, and the next collaborator. A vague check ("it seems to work") does not.

**The tiered model:**

```
Tier 1 — Static analysis:  Does it compile? Lint violations?
Tier 2 — Unit tests:       Do isolated functions produce correct outputs?
Tier 3 — Integration:      Do components interact correctly?
Tier 4 — Functional:       Does it do what the spec intended?
```

All four must pass. A build can succeed with broken logic. Tests can pass with wrong assumptions. **Tier 4 requires human judgment against the original spec.**

**When a Tier 4 check fails:** stop. Do not patch. Return to Step 1 (Decide). The spec itself is flawed.

## Quality audits (Step 7.5)

Optional after any phase with non-trivial logic. Run one or more lenses:

**Knuth — algorithms and correctness:**
> "For each non-trivial algorithm: state the invariant, check it holds at loop boundaries, verify termination, flag premature optimisation. List as [file:line] — observation — disposition."

**Clean Code — readability:**
> "Check: names tell the truth, functions do one thing, responsibilities are separated, no dead code. List findings with disposition."

**Gang of Four — patterns:**
> "Is a named pattern a good fit? Am I reaching for a pattern where a plain function would do? List findings with disposition."

Dispositions: `blocker` (fix before closing) | `backlog` (follow-up) | `wontfix` (documented trade-off).

## Supervision prompts (use anytime)

**Trajectory check** — before editing:
> "Inspect the codebase and report: what files did you read, what did you locate, can you reproduce the issue, what do you believe the cause is, what is the smallest safe edit. Do not edit yet."

**Architecture-layer check:**
> "Classify this task: content / component / layout / route / data / build / test. Explain why the fix belongs there."

**Thrash detector** — when stuck:
> "The last attempt failed. Summarise: what changed, what failed, what evidence we have. Should we loop back to pre-flight QA, tests, implementation, or spec revision? Do not edit again until we agree."

**Review burden report:**
> "Report: files changed, LOC added/removed, tests added, commands run, what changed from the plan, what was not changed, what a reviewer should inspect first. Under ten lines."

## If Step 7 fails — loopback rules

| Failure | Loopback target |
|---------|----------------|
| Objective failed, plan was right | Back to Step 6 |
| Test missing or wrong | Back to Step 6a → then 6 |
| Audit found a blocker | Back to Step 6 |
| Plan no longer matches reality | Back to Step 5 |
| Spec itself is wrong | Back to Step 3 → 4 → 5 |

Write down which loopback and why in the phase file.

## Key principles

1. **No edit before diagnosis.** Editing without understanding leads to failure every time.
2. **Context before action.** Give the AI code, references, and constraints before asking it to execute.
3. **Validation is mandatory.** Correctness must be measured, not assumed.
4. **Small phases win.** Large, unbounded tasks produce drift, complexity, and unreviewable diffs.
5. **Learning must be externalized.** The AI forgets between sessions. Write findings into files.

## What this process is not

- Not a guarantee that AI-generated code is correct.
- Not a replacement for software engineering judgment.
- Not just writing better prompts.
- Not automation without supervision.
- Not tied to one model or one vendor.

It is a **disciplined control system for turning probabilistic generation into reviewable software work.**

Keep going → [07-prompt-templates.md](07-prompt-templates.md)
