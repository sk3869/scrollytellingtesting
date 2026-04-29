---
title: A real run of the loop
author: Sriram Kanala
last-reviewed: 2026-04-28
status: complete — Phase 03 (tests and docs)
---

# A real run of the loop

This file documents one end-to-end run of the control loop on a real phase from this project.
It shows the actual prompts sent, where the plan had to change, and which failure mode showed up.

---

## Setup

- **Phase:** `docs/phases/03-tests-and-docs.md`
- **Specs addressed:** `05-process-doc.md`, `06-parser-tests.md`
- **Starting state:** Phases 00, 01, 02 complete. No tests existed. No `PROCESS.md`. No `vitest.config.ts`.
- **Objective:** Write 10 unit tests for `splitMarkdownIntoSlides`. Write `PROCESS.md`.

---

## Step 5 — Pre-flight QA

**Prompt sent:**
> "Phase 03 Pre-flight — check: does `vitest.config.ts` exist, does `tests/unit/` exist, does `npm run test` currently fail, does `PROCESS.md` exist, is the parser a pure function safe to test without DOM."

**What the pre-flight found that the plan didn't know:**

- `vitest.config.ts` was **missing** — the plan assumed it existed. Added as an unplanned prerequisite.
- `npm run test` was exiting code 1 with "no test files found" — confirmed the baseline.
- `PROCESS.md` confirmed missing.
- Parser confirmed pure function — no DOM, no filesystem — safe to test in `node` environment.

**Change made to the phase file:** added `vitest.config.ts` creation as Objective A before the tests.

---

## Step 6 — Implement

**Prompts sent (in order):**

1. > "Create `vitest.config.ts` pointing at `tests/unit/**/*.test.ts`, node environment, `@` alias matching tsconfig."

2. > "Create `tests/unit/lib/content/parser.test.ts`. Cover: positive multi-slide case, `![bg]` directive, `![bg 50% 65%]` focal point, `![split]`, `![split-reverse]`, single slide, empty string, whitespace-only, rawContent preserved, `---` with whitespace. Use Vitest `describe`/`it`/`expect`. No mocking."

3. > "Run `npm run test` and report."

4. > "Write `PROCESS.md` with three sections: actual prompts from this session in order (unedited), exit checks for the parser test feature all marked pass/fail, and a one-paragraph failure-mode reflection identifying which of the four modes was hit."

**Trajectory table:**

| # | Prompt | Agent behaviour | Shape | Evidence |
|---|--------|----------------|-------|----------|
| 1 | Create vitest config | Wrote config with correct env + alias | edit | `vitest.config.ts` created |
| 2 | Write parser tests | Wrote 10 test cases covering all spec requirements | edit | `parser.test.ts` created |
| 3 | Run tests | Reported 10/10 pass, exit 0 | verify | `npm run test` output |
| 4 | Write PROCESS.md | Documented prompts, exit checks, failure-mode | edit | `PROCESS.md` created |

No thrash rows. No loopbacks.

**Tests written:**

| Level | What it covers | First-run result |
|-------|---------------|-----------------|
| Unit — positive | 3-slide input → 3 SlideNodes with correct content | ✅ pass |
| Unit — positive | `![bg]` sets `backgroundSrc`, stripped from `cleanContent` | ✅ pass |
| Unit — positive | `![bg 50% 65%]` sets `backgroundFocal` | ✅ pass |
| Unit — positive | `![split]` sets `splitSrc` | ✅ pass |
| Unit — positive | `![split-reverse]` sets `splitReverseSrc` | ✅ pass |
| Unit — positive | Single slide (no `---`) → 1 node | ✅ pass |
| Unit — negative | Empty string → `[]` | ✅ pass |
| Unit — edge | Whitespace-only → `[]` | ✅ pass |
| Unit — edge | `rawContent` preserved with directives intact | ✅ pass |
| Unit — edge | `---` with surrounding whitespace still splits | ✅ pass |

**Failure mode that showed up (in an earlier phase, not this one):**
- [x] **Does more than you asked** — the AI built a complete plain HTML/CSS/JS site before we had established the correct stack. See `PROCESS.md` Section 3 for the full account.

---

## Step 7 — Exit QA

**Commands run:**

```bash
npm run lint     # exit 0 ✅
npm run test     # 10/10 passed, exit 0 ✅
npm run build    # exit 0, all 5 routes generated ✅
```

**All objectives met.** Phase marked complete.

---

## Step 7.5 — Audit pass

Not run. `splitMarkdownIntoSlides` is a pure function with no non-trivial algorithm (split + regex + map/filter). Clean Code lens: all names accurate, function does one thing, no dead code. No findings to log.

---

## Review burden report

| Item | Value |
|------|-------|
| Files changed | 4 new |
| LOC added | ~220 |
| Tests added | 10 |
| Commands run | lint ✅ · test ✅ · build ✅ |
| Changed from plan | `vitest.config.ts` added (pre-flight finding) |
| Not changed | All app/components/lib/content files |
| Reviewer focus | `PROCESS.md` Section 1 — confirm prompts are faithful |

---

## Retrospective

**What worked:** Pre-flight QA caught the missing `vitest.config.ts` before any code was written — zero loopbacks because of it. Testing a pure function with no mocking kept the tests simple and fast (185ms total). Writing the trajectory table in real-time made the session shape visible.

**What didn't:** The `PROCESS.md` failure-mode section references a failure from Phase 00 (before the planning loop was established), not from Phase 03 itself. A future version of this file should document a failure that happened *during* the spec-driven loop, not before it.

**What I'd do differently:** Start with `vitest.config.ts` in the spec itself, not as a pre-flight discovery. Pre-flight should find infrastructure surprises; a missing config file is predictable from a fresh scaffold.

**What I'd change in the guide:** Add a "pre-flight checklist" template to `07-prompt-templates.md` specifically for test infrastructure (config files, runner versions, environment).

---

Keep reading → [05-glossary.md](05-glossary.md)
