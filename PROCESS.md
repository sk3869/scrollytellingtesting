# PROCESS.md

_Assignment: Scrollytelling spec-driven project_
_Feature documented: `splitMarkdownIntoSlides` parser and its unit tests_

---

## Section 1 — One feature, the prompts I used

**Feature:** The slide-parser function (`lib/content/parser.ts`) that splits a markdown file into individual slide objects, and the Vitest unit tests that verify it.

**Prompts sent to the AI, in order:**

1. _"Make a scrolly telling website"_

2. _"Okay so make only a homepage and add this feature. It is for an assignment. I will send the template shortly"_

3. _"Here is the Repo, the instructions are in it [bseai_degree GitHub URL]"_ — at this point the AI fetched the repo and started building plain HTML/CSS/JS. This was wrong.

4. _"Wait I must make my own Idea, don't copy the idea just the template. So now, in this [scrollytelling_spec_driven URL] the README shows the instructions of what should be done. Can you look over them?"_

5. _"do a website on Alzheimer's and all the causes of it. Now the template should be [bseai_degree URL]. So make a list of all Alzheimer's causes and give explanations and make a scrolly telling site on the bullet points of the list."_

6. _"okay but the project layout should be EXACTLY EQUAL to the template I gave. Can you do that?"_ — at this point the AI rebuilt the full Next.js project from scratch, including the parser.

7. _"Understand this [assignment brief]. Whatever you report back from the plan, can you write it in the README also."_

8. _"Sure. Make sure to report back to README as well as this conversation."_ — triggered Phase 01 execution (ESLint + deploy workflow).

9. _"Okay run it and report back as always"_ — triggered Phase 02 (images route + SVG assets).

10. _"continue"_ — triggered Phase 03, including this unit test and this file.

---

## Section 2 — Exit checks: pass and fail

These exit checks were defined in `docs/specs/06-parser-tests.md` and `docs/phases/03-tests-and-docs.md`.

| Exit check | Result |
|------------|--------|
| `vitest.config.ts` exists | ✅ PASS |
| `tests/unit/lib/content/parser.test.ts` exists | ✅ PASS |
| `npm run test` exits with code 0 | ✅ PASS |
| Positive case: 3-slide input returns 3 nodes | ✅ PASS |
| `![bg]` sets `backgroundSrc`, stripped from `cleanContent` | ✅ PASS |
| `![bg 50% 65%]` sets `backgroundFocal` to `"50% 65%"` | ✅ PASS |
| `![split]` sets `splitSrc`, stripped from `cleanContent` | ✅ PASS |
| `![split-reverse]` sets `splitReverseSrc`, stripped from `cleanContent` | ✅ PASS |
| Single slide (no separator) returns 1 node | ✅ PASS |
| Empty string returns `[]` | ✅ PASS |
| Whitespace-only returns `[]` | ✅ PASS — edge case caught |
| `rawContent` preserved with directives intact | ✅ PASS |
| `---` with surrounding whitespace still splits correctly | ✅ PASS |

**No failures.** 10 / 10 tests passed on the first run.

---

## Section 3 — Failure-mode reflection

**Failure mode encountered: does more than you asked.**

The clearest example happened early in the session. The first prompt was simply "make a scrollytelling website." The AI immediately built a complete three-file plain HTML/CSS/JS implementation — `index.html`, `styles.css`, and `script.js` — with all 13 slides, a full design system, and a scroll-snap engine. This was not wrong technically, but it was not what was needed. The actual assignment required a Next.js project matching a specific template repository.

When the user clarified ("the project layout should be EXACTLY EQUAL to the template"), the AI had to discard everything it had built and start over — this time building ~40 TypeScript files to replicate the template architecture. The first build was wasted effort because the AI interpreted "make a scrollytelling website" as a complete greenfield task rather than asking one clarifying question first: *what template and what stack?*

What changed: after the redo, the AI adopted the spec-driven planning loop from the assignment brief — Harvest → Converge → Specify → Phase — which forces scope to be written down before any code is touched. Each phase now starts with a Pre-flight QA that checks assumptions against the real codebase before executing. This prevented the same failure from recurring in Phases 01, 02, and 03.
