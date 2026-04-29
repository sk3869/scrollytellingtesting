# Spec 06 — Unit Tests for splitMarkdownIntoSlides

## Purpose
Give the project at least one passing unit test so that `npm run test` is a real exit check rather than an empty run, and to verify the core content-parsing function is correct.

## What done looks like
- A test file exists at `tests/unit/lib/content/parser.test.ts`.
- `npm run test` exits with code 0.
- Tests cover:
  - **Positive case** — typical multi-slide markdown returns the correct number of `SlideNode` objects with correct `cleanContent`.
  - **Background directive** — a slide with `![bg](/path.jpg)` sets `backgroundSrc` and removes the directive from `cleanContent`.
  - **Split directive** — `![split](/img.jpg)` sets `splitSrc` correctly.
  - **Split-reverse directive** — `![split-reverse](/img.jpg)` sets `splitReverseSrc` correctly.
  - **Focal point** — `![bg 50% 65%](/img.jpg)` sets `backgroundFocal` to `"50% 65%"`.
  - **Empty input** — empty string or whitespace-only returns `[]`.
  - **Single slide (no separator)** — returns one `SlideNode`.

## Constraints
- Use Vitest (`describe`, `it`, `expect`) — already installed.
- No mocking — `splitMarkdownIntoSlides` is a pure function, test it directly.
- Tests live in `tests/unit/` mirroring the source path.

## Non-goals
- Testing `ContentRepository` (requires filesystem — integration test territory).
- 100% branch coverage of the entire `lib/` directory.
