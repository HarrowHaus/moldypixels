# BUILDER PROMPT — MOLDY PIXELS · PHASE 1 (REPO RESET + U0)

Copy everything below this line into the builder session, with these files attached: console-family-engineering-blueprint.md, 9999css-dossier.md, realitycss-dossier.md, and the four mockup HTML files.

---

You are the builder for **MOLDY PIXELS**, a monorepo of console-inspired CSS frameworks at https://github.com/HarrowHaus/moldypixels. The attached `console-family-engineering-blueprint.md` is engineering law. The attached dossiers (`9999css-dossier.md`, `realitycss-dossier.md`) are aesthetic law. Where this prompt says "per blueprint," read that section and follow it exactly. Wherever the blueprint says `console-css/` as the repo name, substitute `moldypixels/` — package names remain `9999css` and `realitycss` as specified.

## Scope of this session — Phase 1 ONLY

Phase 1 = repo reset + blueprint unit **U0 (Repo scaffold)**. Nothing else. Do not begin U1 or any later unit. When U0's acceptance check passes, commit, report, and stop for review.

### Step 1 — Preserve, then clear
1. Create branch `archive/pre-reset` from the current default branch and push it. The old repo contents survive there. Do not delete git history.
2. On the default branch, remove all existing files and directories except `.git`.

### Step 2 — Establish the monorepo (blueprint §2, §4)
1. Scaffold the pnpm-workspaces layout from blueprint §2: `packages/9999css`, `packages/realitycss`, `packages/internal/{build,lint,test}`, `docs/`, `examples/`, `integrations/`, `reference/`, `.changeset/`, `.github/workflows/ci.yml`. Empty directories get a short `README.md` stating what will live there and which blueprint unit fills it — one factual sentence each, no aspirational copy.
2. Commit the law into the repo: blueprint and both dossiers go in `/meta/`. The four mockup HTML files go in `/design-targets/` with a README stating: *these are visual targets and measurement-era artifacts, not shipped code; tokens derive from `reference/measured-values.json` once U1 lands, not from these files.*
3. Wire U0 tooling per blueprint §4 and the U0 unit definition: root scripts (`dev`, `docs:dev`, `build`, `test`, `release`), Lightning CSS + esbuild build scripts in `packages/internal/build`, stylelint config (including a stub for the token-only-color custom rule, marked not-yet-enforced until U2), changesets initialized, CI workflow running install → build → test.
4. Check npm name availability for `9999css` and `realitycss`. Record the result in `/meta/DECISIONS.md`. If either is taken, set package names to the `@harrowhaus/` scope and note it — do not silently choose.

### Step 3 — New README (root)
Write a new `README.md` containing, in this order:
1. **MOLDY PIXELS** — one-paragraph identity: a family of console-inspired CSS frameworks built reference-first; first two members **9999.css** (Dreamcast-inspired) and **reality.css** (N64-inspired).
2. **Status — honest**: pre-release; nothing is published to npm; no component code exists yet; the repo currently contains the engineering blueprint, design dossiers, design targets, and the U0 scaffold. List exactly what exists. No badges for things that don't run, no feature lists for things that don't exist.
3. Repo map (the §2 tree, annotated).
4. How the build works (one short section: pnpm, Lightning CSS, changesets — only what's actually wired).
5. Links to `/meta/` law documents.
6. Legal: "Not affiliated with or endorsed by SEGA or Nintendo. Fan-made homage. All fonts and assets open-licensed; provenance logged in /meta/ASSETS.md." Create `/meta/ASSETS.md` now with the fonts already specified in the dossiers and their licenses (all Google Fonts / OFL).
7. License: MIT. Add the LICENSE file.

### Step 4 — Acceptance (from blueprint U0) and stop
- Fresh clone → `pnpm install` → `pnpm build` → `pnpm test` all exit 0 (build/test may be no-ops that succeed honestly — they must not pretend to do work they don't do).
- CI workflow green on the pushed commit.
- Then: post a short report — what was archived, what was scaffolded, npm-name result, anything ambiguous you encountered — and **stop**. U1 (reference pipeline) begins only on explicit approval.

## Standing constraints (from blueprint §11 — violations are bugs)
- No fake CLI, no fake package claims, no placeholder docs pretending to be complete.
- No decorative branding before the framework grammar exists — the README is plain.
- No React or Tailwind dependencies anywhere in core packages; core packages keep zero `dependencies`.
- Ask questions only if genuinely blocked; otherwise decide per the blueprint and log the decision in `/meta/DECISIONS.md`.
