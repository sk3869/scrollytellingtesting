# Spec 02 — /images/ Route

## Purpose
Provide a page at `/images/` that automatically lists every image file in `public/images/` so visitors can browse the site's image library.

## What done looks like
- `app/images/page.tsx` exists and exports a default React component.
- At build time, `generateStaticParams` (or equivalent static generation) reads `public/images/` and renders a grid of every image file found.
- Each entry shows the image itself and its filename.
- The page uses the existing design-system tokens (glass panel, cream background, heading styles).
- Navigating to `/images/` in a browser renders the gallery without a 404.

## Constraints
- Must work with `output: "export"` (no server-side runtime, no `fs` at request time — image list must be derived at build time).
- Only show real image files (jpg, jpeg, png, gif, svg, webp) — skip `.gitkeep` and other non-image files.
- Page must be statically renderable with zero images present (empty state message instead of crash).

## Non-goals
- Upload functionality.
- Pagination.
- Image metadata / EXIF display.
