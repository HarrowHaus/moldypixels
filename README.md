# MOLDY PIXELS

**Moldy Pixels** is a family of console-inspired CSS frameworks built reference-first: real screens are captured and measured before any component is styled. The first two members are **9999.css** (Dreamcast-inspired, prefix `.dc-`) and **reality.css** (N64-inspired, prefix `.r64-`), both plain-CSS frameworks with one optional JS feature each.

## Status — honest

Pre-release. Nothing is published to npm. No component code exists yet.

What the repo currently contains, exactly:

- the engineering blueprint and both design dossiers (`meta/`)
- the three design-target mockups (`design-targets/`)
- the U0 monorepo scaffold: two package shells with locked `@layer` order and placeholder CSS, a working Lightning CSS + esbuild build, stylelint wiring (token rule stubbed, enforced from U2), smoke checks, changesets init, and a CI workflow
- the old pre-reset site, preserved on the `archive/pre-reset` branch

No badges for things that don't run; no feature lists for things that don't exist.

## Repo map

```txt
packages/
  9999css/          Dreamcast framework package shell (src/, js/vmu.js, API.md)
  realitycss/       N64 framework package shell (src/, js/expansion-pak.js, API.md)
  internal/         private, never published
    build/          shared Lightning CSS + esbuild build script
    lint/           stylelint config + token-only-color rule stub
    test/           U0 smoke checks (real harness lands in U5)
docs/
  9999/             Astro docs site (U12)
  reality/          Astro docs site (U12)
examples/           plain-HTML templates (U11)
integrations/       html / react / next / astro smoke apps (U13)
reference/          capture + measurement pipeline (U1)
design-targets/     mockup HTMLs — visual targets, not shipped code
meta/               law documents, decisions log, asset provenance
.changeset/         changesets versioning
.github/workflows/  CI: install → build → test
```

## How the build works

pnpm workspaces monorepo. `pnpm build` runs `packages/internal/build/build.mjs`, which bundles each package's `src/index.css` with **Lightning CSS** (browserslist targets: last 2 evergreen + Safari ≥ 16.4) into `dist/<name>.css` and `dist/<name>.min.css` (+ sourcemap), and builds each JS feature with **esbuild** to ESM + IIFE. `pnpm test` lints and runs the smoke checks. Versioning/publishing is wired through **changesets** but nothing is released yet.

```bash
pnpm install
pnpm build
pnpm test
```

## Law documents

- [`meta/console-family-engineering-blueprint.md`](meta/console-family-engineering-blueprint.md) — engineering law
- [`meta/9999css-dossier.md`](meta/9999css-dossier.md) — 9999.css aesthetic law
- [`meta/realitycss-dossier.md`](meta/realitycss-dossier.md) — reality.css aesthetic law
- [`meta/moldypixels-builder-prompt-phase1.md`](meta/moldypixels-builder-prompt-phase1.md) — Phase 1 scope
- [`meta/DECISIONS.md`](meta/DECISIONS.md) — decisions log

## Legal

Not affiliated with or endorsed by SEGA or Nintendo. Fan-made homage. All fonts and assets open-licensed; provenance logged in [`meta/ASSETS.md`](meta/ASSETS.md).

## License

[MIT](LICENSE)
