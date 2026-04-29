# Spec 01 — GitHub Actions Deploy to GitHub Pages

## Purpose
Automate static export and deployment to GitHub Pages on every push to `main`.

## What done looks like
- A file exists at `.github/workflows/deploy.yml`.
- Pushing a commit to `main` triggers the workflow.
- The workflow runs `npm ci`, `npm run build`, and uploads `./out` as a Pages artifact.
- The live site is reachable at `https://<username>.github.io/<repo>/`.
- `NEXT_PUBLIC_BASE_PATH` is set to `/<repo-name>` so all routes and assets resolve under the subdirectory path GitHub Pages uses.

## Constraints
- Must use the official `actions/upload-pages-artifact` and `actions/deploy-pages` actions.
- Node version must match the project (Node 20).
- No server runtime — output must be fully static (`output: "export"` already set in next.config.ts).

## Non-goals
- Custom domain setup (deferred).
- Preview deployments on pull requests (deferred).
