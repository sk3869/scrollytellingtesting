---
title: Prompt templates
author: Sriram Kanala
last-reviewed: 2026-04-28
---

# Prompt templates

Copy-pasteable prompts for every step of the control loop. Replace `[bracketed text]` with your specifics.

---

## Planning loop

### Step 1 — Harvest

```
Go look at this codebase and tell me all the good ideas that you can find in the code.
Focus on [area: e.g. the layout system / the content pipeline / how images are loaded].
Do not propose changes yet — just list what is already there and what is working.

Mode: wide spray. You are making a menu.
```

### Step 2 — Converge

```
Let's discuss these ideas. Rank them by [criterion: e.g. assignment impact / effort to ship / how much they reinforce the spec].
Which two or three should we actually do in this part of the project, and which should we defer?
Write the agreed scope as a single paragraph.

Mode: narrowing. End with one paragraph you can defend.
```

### Step 3 — Specify

```
Go into docs/specs/ and create as many specs as we need to cover the scope we just agreed on.
Each spec should have: a one-line purpose, a short "what done looks like" section, and any constraints or non-goals.
Keep them small — one concern per file.

Mode: narrow. Meaning goes into files, not chat.
```

### Step 4 — Phase

```
Review the specs in docs/specs/ and plan phases in docs/phases/ so that at the end of this process
we will have addressed 100% of the specs we defined.
Each phase should: name the specs it covers, list concrete objectives, and define a runnable exit check for each objective.
Flag any spec that no phase covers.

Mode: narrow. Coverage is an explicit target — gaps here become bugs later.
```

---

## Execution loop

### Step 5 — Pre-flight QA

```
QA docs/phases/[NN-name].md and update it with any relevant information from the current codebase
to prepare it for implementation.
Check that: file paths still exist, referenced specs still say what the phase claims,
dependencies are installed, and the exit checks are actually runnable as written.
Report what you changed and why.

Mode: narrow, read-only first. Reconcile the plan with reality before executing.
```

### Step 6 — Implement

```
Execute phase [NN-name].md. Work one objective at a time.
Do not touch files outside the phase's stated scope.
Do not skip the exit check for an objective before moving to the next.
If you hit something the phase did not anticipate, stop and ask.

Mode: narrow jet. Thumb pressed down.
```

### Step 6a — Unit tests

```
For the code changed in this objective, write unit tests that cover:
(1) the positive case — typical inputs produce the expected output
(2) the negative case — invalid inputs fail loudly and safely
(3) edge cases — empty, zero, unicode, and any off-by-one boundaries you can identify.
Do not test library internals. Place tests under tests/unit/ mirroring the source path. All tests must pass.
```

### Step 6a — Integration tests

```
Write integration tests that exercise the seam between [module A] and [module B]
using real (not mocked) implementations where possible.
Cover the happy path and one failure mode of the seam.
Tests live in tests/unit/ if they can run in jsdom, otherwise tests/browser/.
```

### Step 6a — E2E golden path

```
Write or update a Playwright spec at tests/browser/[flow].spec.ts that scripts the headline
user journey described in docs/specs/[NN].md.
It must: load the built static site, perform the flow end-to-end, and assert the user-visible outcome.
This test is the golden path — it must never be deleted to make a build pass.
```

### Step 7 — Exit QA

```
QA phase [NN-name].md to ensure that 100% of the phase objectives are met.
For each objective, run its exit check and report pass or fail.
Run npm run lint && npm run test && npm run build && npm run test:e2e and report results.
Do not mark the phase complete if any check fails.
If a check fails, suggest whether we loop back to step 5 (re-plan), step 6 (keep implementing), or an earlier planning step.

Mode: narrow. Pass/fail only. No vibes.
```

---

## Supervision prompts (use anytime)

### Trajectory check

```
Before editing, inspect the current codebase and report:
- What files did you read?
- What did you locate?
- Can you reproduce or simulate the issue?
- What do you believe the cause is?
- What is the smallest safe edit?
Do not edit yet.

Mode: narrow. Enforcing read → locate → reproduce → explain before any edit.
```

### Architecture-layer check

```
Classify this task before implementation:
content / component / layout / route / data / build / deploy / test

Then explain why the fix belongs there.
If more than one layer is involved, name the primary one and list the others as touched.

Mode: narrow. Naming the layer prevents editing in the wrong place.
```

### Thrash detector

```
The last attempt failed. Do not keep editing blindly.
Summarise:
- what changed
- what failed
- what evidence we have (commands run, outputs, test results)
- whether to loop back to pre-flight QA, tests, implementation, or spec revision
Do not edit again until we agree on the loopback target.

Mode: narrow. This is the verbal equivalent of taking the keyboard back.
```

### Review burden report

```
After implementation, report:
- files changed
- LOC added / removed
- tests added
- commands run (lint / test / build / e2e)
- what changed from the plan
- what was deliberately not changed
- what a human reviewer should inspect first
Keep it under ten lines.
```

### Audit — Knuth lens

```
Audit the code changed in phase [NN-name].md through a Knuth lens.
For each non-trivial algorithm: state the invariant, check it holds at loop boundaries,
verify termination, and flag any premature optimization.
List findings as: [file:line] — observation — disposition (blocker | backlog | wontfix).
Do not change code.
```

### Audit — Clean Code lens

```
Audit the code changed in phase [NN-name].md through a Clean Code lens.
Check: names tell the truth, functions do one thing, responsibilities are separated,
SOLID is not violated, no dead code, no misleading comments.
List findings as: [file:line] — observation — disposition (blocker | backlog | wontfix).
Do not change code.
```

### Audit — Gang of Four lens

```
Audit any new abstractions introduced in phase [NN-name].md through a Gang-of-Four lens.
Is a named pattern a good fit? Am I reaching for a pattern where a plain function would do?
List findings as: [file:line] — pattern name or "no pattern needed" — reason — disposition.
Do not change code.
```

---

Keep reading → [06-reference-as-context-pack.md](06-reference-as-context-pack.md)
