# Phase 02 — Images Route and Assets

**Status:** COMPLETE  
**Specs covered:** 02-images-route.md, 03-image-assets.md

## Objectives

### Objective A — /images/ route
Create `app/images/page.tsx` that statically renders a gallery of all image files in `public/images/`.

**Exit check:**
```bash
npm run build
# Build must pass and list /images/ as a generated route

grep -r "images" out/index.html || true
# Navigate to http://localhost:3000/images/ after npm run dev — page must render without 404
```

---

### Objective B — SVG image assets
Add at least 3 SVG image files to `public/images/` relevant to the Alzheimer's topic. Wire them into `content/home.md` using `![bg]` or `![split]` directives.

**Exit check:**
```bash
# At least 3 image files (excluding .gitkeep)
ls public/images/ | grep -v ".gitkeep" | wc -l
# Must be >= 3

# home.md must reference images
grep "!\[bg\]\|!\[split\]" content/home.md
# Must return at least one match
```

---

## Dependencies
- Phase 01 (ESLint config) should be complete so `npm run lint` can verify the new page.
- Image files must exist before they can be referenced in home.md.

## Files this phase touches
- `app/images/page.tsx` (new)
- `public/images/*.svg` (new files, 3+)
- `content/home.md` (edit — add `![bg]` / `![split]` directives pointing to new images)

## Files this phase must NOT touch
- Any component file under `components/`
- `lib/` files
- `app/globals.css`

## Loopback notes
No loopbacks. Pre-flight found that `home.md` already referenced `.jpg` paths that didn't exist — updated all three to `.svg` as part of Objective B. Added `![bg]` to the hero and closing slides (neither had one before). `/images/` route built cleanly on first attempt using `fs.readdirSync` in an RSC — valid at build time with `output: export`.

## Review burden report
- Files changed: 7 (5 SVG images new, `app/images/page.tsx` new, `content/home.md` patched)
- LOC added: ~400 (SVG markup) + ~65 (images page) + 6 (home.md edits)
- Tests added: 0 (UI/content phase)
- Commands run: `npm run lint` exit 0 ✅ · `npm run build` exit 0 ✅
- Changed from plan: `.jpg` refs in home.md updated to `.svg` (pre-flight finding — not in original phase plan)
- Not changed: no component, lib, or config files touched
- Reviewer focus: `app/images/page.tsx` uses `fs.readdirSync` at build time — safe with static export; confirm it handles empty dir gracefully (empty-state branch present)

## Audit findings
No non-trivial logic. `getImages()` is a simple pure function — reads dir, filters by extension set, sorts. No pattern audit needed.
