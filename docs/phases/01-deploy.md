# Phase 01 — Deploy Infrastructure

**Status:** COMPLETE  
**Specs covered:** 01-deploy.md, 04-eslint.md

## Objectives

### Objective A — GitHub Actions workflow
Create `.github/workflows/deploy.yml` that builds the static export and deploys to GitHub Pages.

**Exit check:**
```bash
# File must exist
ls .github/workflows/deploy.yml

# Workflow must contain the deploy-pages action
grep "actions/deploy-pages" .github/workflows/deploy.yml
```
After pushing to GitHub: Actions tab shows green, site loads at `https://<user>.github.io/<repo>/`.

---

### Objective B — ESLint configuration
Create `eslint.config.mjs` so that `npm run lint` exits with code 0.

**Exit check:**
```bash
npm run lint
echo "Exit code: $?"
# Must print: Exit code: 0
```

---

## Dependencies
- Node 20 available in GitHub Actions runner (ubuntu-latest includes it).
- `NEXT_PUBLIC_BASE_PATH` env var must be set to `/${{ github.event.repository.name }}` in the workflow.

## Files this phase touches
- `.github/workflows/deploy.yml` (new)
- `eslint.config.mjs` (new)

## Files this phase must NOT touch
- Any file under `app/`, `components/`, `lib/`, `content/`

## Loopback notes
No loopbacks required. Pre-flight confirmed ESLint 9, `typescript-eslint`, and `@eslint/js` all installed. `.github/` did not exist — created. Lint was crashing as expected (no config). Both objectives executed cleanly on first attempt.

## Review burden report
- Files changed: 2 (`.github/workflows/deploy.yml` new, `eslint.config.mjs` new)
- LOC added: ~50
- Tests added: 0 (infrastructure phase)
- Commands run: `npm run lint` (exit 0), `npm run build` (exit 0)
- Changed from plan: none
- Not changed: all app/, components/, lib/, content/ files untouched
- Human reviewer should check: workflow permissions block (`pages: write`, `id-token: write`) and that `NEXT_PUBLIC_BASE_PATH` is passed correctly to the build step

## Audit findings
No non-trivial logic introduced. No patterns to audit.
