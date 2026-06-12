# Decisions

## U0 package names

Checked directly against the npm registry on 2026-06-12 (`GET https://registry.npmjs.org/<name>`):

- `9999css` — HTTP 404 (no package exists).
- `realitycss` — HTTP 404 (no package exists).

Both unscoped names are kept. This is not a final npm reservation; before U15 publish work, re-confirm against the registry and record the response again.

## U0 scope

U0 is scaffold only. Do not build components, docs homepage screens, registry files, or package publishing until later U-series units.

## Archive point

The pre-reset site (Saveglass / Machine Candy / Menu Ink) is preserved on branch `archive/pre-reset`, pointing at commit `db24f24` — the last commit before the monorepo reset commit `635789f`. Git history was not rewritten.

## Handoff documents

- The builder prompt says "the four mockup HTML files"; the handoff zip contained three (`9999-mockup-v3.html`, `9999-mockup-v4.html`, `reality-mockup-v3-max.html`). All three are committed to `design-targets/`. Owner confirmed (2026-06-12) these are the newest available: mockups show direction only — the blueprint is the build directive.
- `9999-mockup-v4 (2).html` from the zip was committed as `9999-mockup-v4.html`.
- The earlier `codexhandoff/` directory was removed: it held a stale zip plus a truncated copy of the blueprint. Canonical law documents live in `meta/` (full, byte-identical to the handoff versions) and visual targets in `design-targets/`. The original upload survives in git history and on `archive/pre-reset`-era commits.

## Fonts

The builder prompt assumed all dossier fonts are OFL. Verified against the google/fonts repository: all are OFL **except Ultra (Apache License 2.0)**, a fallback display face for reality.css. Logged in `meta/ASSETS.md`; no action needed (Apache 2.0 is compatible with our use).

## U1 reference pipeline

- Landed in two phases by owner decision (2026-06-12): pipeline first (CAPTURE.md, regions.json schema, measure.py, synthetic self-test, CI gate), captures second. The unit is **not accepted** until the owner's emulator captures are committed and `measure.py --check` reproduces `measured-values.json` from them.
- Captures must come from the owner: they require a Dreamcast BIOS image and an SM64 ROM, which cannot be sourced or run in the build environment. Emulators specified: Flycast (VGA 640×480) and simple64 / mupen64plus + ParaLLEl-RDP.
- Geometry measurement v1 is color-range bounding boxes (covers capsule heights and hub stagger coordinates). Corner radius and letter-spacing measurement get added during the regions.json tuning pass against real frames rather than speculated now.
- The pipeline self-test draws its fixture in memory instead of committing a fixture PNG — same code paths proven, no binary in the repo.
- CI installs Pillow into a venv (ubuntu runners' system Python is PEP 668 externally-managed).

## U0 build tooling

- Lightning CSS is the single CSS processor (blueprint §4); esbuild builds the JS features. The `browserslist` package was added as a root devDependency to translate the browserslist query into Lightning CSS targets.
- Each framework package carries its own copy of the MIT `LICENSE` because `package.json#files` ships it with the npm tarball.
