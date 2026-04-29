# Spec 03 — Image Assets in public/images/

## Purpose
Provide at least three committed image files in `public/images/` that are visually appropriate for the Alzheimer's topic and are referenced correctly in the presentation slides.

## What done looks like
- At least 3 image files exist in `public/images/` (SVG format acceptable).
- The images are referenced in `content/home.md` using `![bg]`, `![split]`, or `![split-reverse]` directives on appropriate slides.
- Images render visibly in the browser when the site is served.
- At least one slide uses a full-bleed `![bg]` cinematic background.
- The `/images/` page (spec 02) lists them all.

## Constraints
- SVG is preferred for committed assets (small, scalable, no copyright issues).
- Filenames must be lowercase with hyphens only (e.g. `brain-neurons.svg`).
- Each image must relate meaningfully to its slide's content — no generic stock placeholders.

## Non-goals
- Photography or raster images (can be added by the student later).
- Image optimisation pipeline.
