# Spec 04 — ESLint Configuration

## Purpose
Make `npm run lint` pass cleanly so it can serve as a real exit check in every phase.

## What done looks like
- A config file exists at the root: `eslint.config.mjs`.
- `npm run lint` exits with code 0.
- The config covers TypeScript files in `app/`, `components/`, and `lib/`.
- The config extends `eslint:recommended` and `typescript-eslint/recommended`.

## Constraints
- Must use the flat config format (ESLint 9+) — the project already has ESLint 9 in devDependencies.
- No rules that conflict with existing code should be set to `error` without first confirming the code passes.
- `next/core-web-vitals` rules are optional (Next.js ESLint plugin not in devDependencies — do not add it unless the lint config is confirmed working without it).

## Non-goals
- Prettier integration.
- Per-file override rules.
- Enforcing zero warnings (warnings are acceptable, errors are not).
