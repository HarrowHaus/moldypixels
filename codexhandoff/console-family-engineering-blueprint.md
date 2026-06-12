# CONSOLE FAMILY — ENGINEERING BLUEPRINT
## 9999.css + reality.css · publishable frameworks · execution graph

This is the build-system and execution blueprint. Aesthetic law lives in the per-framework dossiers (9999css-dossier.md, realitycss-dossier.md); this document governs how the frameworks become real, publishable, testable software. No unit in this document is "done" until its acceptance check passes. Nothing here is decorative.

---

## 1. VERDICT ON THE PROPOSED COURSE

The proposed anatomy (tokens, reset, layout primitives, utilities, component-agnostic patterns, docs, templates; framework-agnostic CSS; boring tooling; acceptance gates; agent units) is correct. Corrections and additions encoded below:

1. **Monorepo from the start.** Two frameworks + shared tooling is the canonical pnpm-workspaces case.
2. **Cascade layers are the spine.** All source CSS is authored inside a fixed `@layer` order. This is what makes the framework override-friendly and conflict-free in any host app.
3. **Visual regression is the primary quality gate.** Agent-built CSS regresses silently without screenshot diffs.
4. **The class names are the public API.** They get a frozen contract, semver rules, and a deprecation path.
5. **Reference fidelity is a CI gate**, not a vibe: the measurement pipeline lives in-repo.

---

## 2. REPOSITORY ARCHITECTURE

```
console-css/                          (single monorepo, pnpm workspaces)
├── packages/
│   ├── 9999css/
│   │   ├── src/
│   │   │   ├── index.css            (@layer order + @imports, single entry)
│   │   │   ├── tokens.css           (@layer tokens — ALL custom properties)
│   │   │   ├── reset.css            (@layer reset)
│   │   │   ├── base.css             (@layer base — element defaults, typography)
│   │   │   ├── primitives.css       (@layer primitives — layout)
│   │   │   ├── components/          (@layer components — one file per component)
│   │   │   ├── utilities.css        (@layer utilities)
│   │   │   └── modes/pal.css        (mode token overrides)
│   │   ├── js/vmu.js                (ESM source; built to ESM + IIFE)
│   │   ├── dist/                    (build output, gitignored)
│   │   ├── package.json
│   │   └── API.md                   (frozen class contract)
│   ├── realitycss/                  (same shape; js/expansion-pak.js; modes/hardware.css)
│   └── internal/                    (private, never published)
│       ├── build/                   (shared Lightning CSS config, build scripts)
│       ├── lint/                    (stylelint config, token-only-color rule)
│       └── test/                    (Playwright config, axe runner, contrast script)
├── docs/
│   ├── 9999/                        (Astro site)
│   └── reality/                     (Astro site)
├── examples/                        (plain-HTML templates, per framework)
├── integrations/                    (smoke apps: html/, react/, next/, astro/)
├── reference/                       (capture images, measure scripts, measured-values.json)
├── .changeset/                      (changesets versioning)
└── .github/workflows/ci.yml
```

Both packages publish independently to npm as `9999css` and `realitycss` (names to be availability-checked in U0; fallback scopes `@harrowhaus/9999css` etc.).

---

## 3. SOURCE CSS ORGANIZATION — THE LAYER CONTRACT

`index.css` opens with the immutable layer declaration:

```css
@layer reset, tokens, base, primitives, components, utilities;
```

Rules, all lintable:
- **tokens.css is the only file allowed to contain raw color values.** Everywhere else: `var()` only. (Custom stylelint rule enforces this.)
- **reset**: minimal modern reset (box-sizing, margin zero, media defaults, reduced-motion collapse). No opinions beyond neutralization.
- **base**: element-level defaults — body background (the water / the sky), typography stack, link/focus defaults. This is where "the world is always present" is implemented.
- **primitives** (layout, both frameworks share names): `.x-stack`, `.x-cluster`, `.x-grid`, `.x-center`, `.x-frame`, `.x-screen` (the full-bleed screen primitive from the mockups), prefixed per framework (`.dc-screen`, `.r64-screen`).
- **components**: one file per component, class API per the dossiers' inventories.
- **utilities**: deliberately small set — text scale, color roles, the framework's effect utilities (`.dc-bevel`/`.dc-flood`, `.r64-fog-*`/`.r64-extrude`), spacing scale. This is NOT a Tailwind clone; utilities exist to expose the grammar, not replace authoring.
- **Logical properties** (`margin-inline`, `inset-block`) everywhere directionality applies.
- **Modes are token swaps only**: `modes/pal.css` and `modes/hardware.css` redefine custom properties under a class/attribute scope (`.dc-pal`, `[data-r64-mode="hardware"]`). No component file may branch on mode.

---

## 4. BUILD SYSTEM (boring, reliable)

- **Tool: Lightning CSS** as the single CSS processor — bundles `@import`, transpiles nesting, adds vendor prefixes from a browserslist target, minifies. One dependency replaces a PostCSS plugin stack. (PostCSS remains the documented fallback if a plugin need ever appears; none is anticipated.)
- **Targets / browser floor**: last 2 versions of evergreen browsers + Safari ≥ 16.4 (first with full `@layer` + `:has` if needed). Documented on a Browser Support docs page with the fallback policy for `paint-order`/`-webkit-text-stroke` (decorative-only: degraded output is un-stroked but legible).
- **Outputs per package**:
  - `dist/<name>.css` (unminified, licensed header)
  - `dist/<name>.min.css` (+ sourcemap)
  - `dist/js/<feature>.js` (ESM) and `dist/js/<feature>.iife.js` (script-tag use), built with esbuild (also boring), zero runtime deps (three.js for the Expansion Pak is lazy-loaded at runtime, never bundled)
- **package.json contract**:
  ```json
  {
    "exports": {
      ".": "./dist/9999css.min.css",
      "./css": "./dist/9999css.css",
      "./vmu": { "import": "./dist/js/vmu.js", "default": "./dist/js/vmu.iife.js" },
      "./modes/pal": "./dist/modes/pal.css"
    },
    "files": ["dist", "API.md", "LICENSE"],
    "sideEffects": true
  }
  ```
- **Versioning & publishing**: changesets. Semver where the **class API is the surface**: removed/renamed class or changed token name = major; new class/token = minor; visual fix within contract = patch. `CHANGELOG.md` generated by changesets. npm publish with `--provenance` from CI only. CDN distribution is free via jsDelivr/unpkg once on npm; docs install page shows npm + CDN `<link>` both.
- **Commands** (root): `pnpm dev` (watch build + serve examples), `pnpm docs:dev`, `pnpm build`, `pnpm test`, `pnpm release` (changesets version + publish).

---

## 5. DOCS SITES (Astro; one per framework, shared internal components)

Pages — each is a real page with working examples, or it does not ship:
1. Homepage (composed as the framework's screens — built LAST, after grammar exists)
2. Installation (npm, CDN, plain HTML, React, Next.js, Astro — each with a copy-paste snippet proven by the integration smoke apps)
3. Design thesis (the dossier's constraint, subtraction list, quoted artifacts, measured palette)
4. Tokens (every token rendered live from the actual CSS — generated, not hand-copied)
5. Primitives (layout, with resizable demos)
6. Utilities
7. Components (parity tier + game tier, each: live demo, HTML, class API table, a11y notes)
8. Examples (links into /examples templates)
9. Accessibility (contrast table generated from tokens, focus policy, reduced-motion behavior)
10. Theming (mode swaps, re-tint token, safe override pattern via `@layer`)
11. Browser support
12. Changelog (rendered from CHANGELOG.md)

Docs rule inherited from the dossiers: the site never breaks character, but the homepage-as-screens is built only after U-series grammar units are complete (constraint: no decorative branding before grammar).

---

## 6. EXAMPLE TEMPLATES + PROOF MATRIX

Plain HTML first (each template = one .html importing only the built CSS; zero JS unless demonstrating the JS feature). Every primitive and every utility must appear in ≥1 template — coverage is checked by a script that parses templates for class usage and diffs against the API contract.

| Template | Proves (minimum) |
|---|---|
| SaaS landing | screen primitive, hero display type, capsule/extruded buttons, pricing-adjacent cards |
| Docs site page | prose defaults, code blocks, nav, tables |
| Dashboard | grid primitive, HUD/meter components, badges, charts-adjacent stat blocks |
| Blog/magazine | typographic scale, prose measure, balloon/pull-quote |
| Portfolio | frame primitive, image treatment, fog/flood effects |
| Ecommerce product page | gallery, price display, variant selectors, buy capsule |
| Mobile-first app shell | screen + stack primitives, bottom nav, safe-area handling |
| Admin table view | table component at density, selection states, pagination |
| Pricing page | cluster/grid, emphasis variants, gold-cart/shout accents |
| Auth screen | form components, focus states, error states |
| (game bonus) Save/file screen | game tier end-to-end: file slots, selector, dialog, VMU/power components |

---

## 7. VALIDATION & QUALITY GATES (all run in CI; all must pass to merge)

| Gate | Mechanism |
|---|---|
| CSS imports correctly | integration smoke apps build: plain HTML (file://), React (Vite), Next.js, Astro — each imports the package and renders a fixture page |
| No broken class names | docs + templates parsed; every class used must exist in built CSS; every API.md class must be used somewhere (dead-class check) |
| Docs examples work | every docs example is rendered by Playwright; console errors fail the build |
| Responsive layouts | Playwright screenshots at 360 / 768 / 1280 widths per template |
| Visual regression | Playwright screenshot diff against committed baselines (the agent-regression net) |
| Contrast | script evaluates every documented fg/bg token pair against WCAG AA; output rendered on the Accessibility page |
| Keyboard states | Playwright tab-walks each template; asserts :focus-visible produces a visible outline (computed-style check) |
| Axe pass | axe-core on every docs page and template, zero serious/critical |
| Token discipline | stylelint custom rule: raw color values outside tokens.css fail |
| Size budget | size-limit: core ≤ 30 KB min+gzip per framework; JS feature ≤ 8 KB (pre-three.js) |
| Reference fidelity | quoted-artifact components carry `data-ref` markers; script compares rendered colors against reference/measured-values.json within tolerance |
| No dependency lock-in | core package.json has zero `dependencies`; CI asserts it |
| Publishable | `npm pack` dry-run + `publint` pass |

---

## 8. AGENT-EXECUTABLE IMPLEMENTATION UNITS

Format: **ID · name — files touched → expected output · acceptance check · deps**. Units are per-framework where marked ×2 (execute for 9999css, then realitycss; the second execution reuses the first's patterns).

- **U0 · Repo scaffold** — root package.json, pnpm-workspace.yaml, .changeset/, stylelint config, Lightning CSS + esbuild build scripts in packages/internal, CI workflow skeleton, npm name availability check → monorepo installs, `pnpm build` runs (empty), CI green. *Acceptance:* fresh clone → install → build → test all exit 0. *Deps:* none.
- **U1 · Reference pipeline** — reference/: capture instructions (Flycast BIOS @ 640×480 VGA; SM64 title/file-select via emulator), measure.py (palette + geometry extraction), measured-values.json schema → committed clean captures + measured values replacing the dirty CRT numbers. *Acceptance:* measure.py reproduces measured-values.json from captures. *Deps:* U0.
- **U2 ×2 · Token layer** — src/tokens.css, modes/*.css → all dossier tokens as custom properties, mode files as pure token swaps, updated to U1 clean measurements. *Acceptance:* stylelint token rule passes; mode file contains only custom-property declarations. *Deps:* U0, U1.
- **U3 ×2 · Reset + base** — src/reset.css, src/base.css, src/index.css layer order → neutral reset; world-bearing body defaults; typography stack loads. *Acceptance:* blank HTML importing index.css renders the world (water/sky), correct fonts, no console errors. *Deps:* U2.
- **U4 ×2 · Layout primitives** — src/primitives.css → stack/cluster/grid/center/frame/screen. *Acceptance:* primitive fixture page renders correctly at 3 viewports (screenshots committed as first baselines). *Deps:* U3.
- **U5 · Test harness** — packages/internal/test: Playwright config, axe runner, contrast script, dead-class checker, size-limit config → all gates from §7 wired into CI against existing fixtures. *Acceptance:* intentionally broken fixture fails each gate; restored fixture passes. *Deps:* U4 (needs something real to test).
- **U6 ×2 · Utilities + effect classes** — src/utilities.css → text/color/spacing scales + framework effect utilities (bevel/flood; fog/extrude). *Acceptance:* utility fixture passes visual regression; coverage script recognizes all utilities. *Deps:* U4, U5.
- **U7 ×2 · Parity-tier components** — src/components/*.css, API.md → full NES.css-parity inventory per dossier. *Acceptance:* each component: fixture + baseline + axe + keyboard gate green; API.md complete. *Deps:* U6.
- **U8 ×2 · Game-tier components** — src/components/ → file slots, selector, dialog, HUD/meter, scoreboard, start screen (+ power disc for reality, save-indicator for 9999). *Acceptance:* same gates + reference-fidelity markers pass against measured-values.json. *Deps:* U7, U1.
- **U9 · 9999 JS feature: VMU** — js/vmu.js → canvas 48×32 engine, print/sprite/animate/save/load/slots, .vms parser (verified against ≥2 real save files), ESM+IIFE builds, ARIA mirror. *Acceptance:* unit tests for parser offsets; demo fixture runs with script tag AND import; size gate. *Deps:* U7(9999).
- **U10 · reality JS feature: Expansion Pak** — js/expansion-pak.js → attribute activation, lazy three.js, 320×240/640×480 render targets, 3-point filter shader, vertex-color + fog materials, CSS poster fallback. *Acceptance:* fixture renders with and without the attribute; shader output spot-checked against reference description; no-JS page identical to poster baseline. *Deps:* U7(reality).
- **U11 ×2 · Templates** — examples/ (11 templates per framework, plain HTML) → §6 matrix. *Acceptance:* coverage script proves matrix; all gates green per template. *Deps:* U7; U8 for game template.
- **U12 ×2 · Docs site** — docs/: Astro shell, then pages 2–12 (homepage deferred) → live-example docs generated from real CSS, tokens page generated from tokens.css. *Acceptance:* docs build; every example renders; axe green; install snippets copied verbatim into integration apps and they build. *Deps:* U7, U11.
- **U13 · Integration smoke apps** — integrations/html|react|next|astro → minimal consumers importing the published-shape package (via workspace). *Acceptance:* all four build in CI and render fixture page; core dependency-count assertion passes. *Deps:* U7.
- **U14 ×2 · Docs homepage (the screens)** — docs/ homepage → the v4/v3-max screen compositions rebuilt from framework classes only (no bespoke CSS beyond page layout). *Acceptance:* homepage uses ≥90% framework classes (parsed); visual baselines committed. *Deps:* U8, U12. *(Constraint honored: branding after grammar.)*
- **U15 · Publish pipeline** — changesets config, release workflow, publint, npm provenance → versioned publish from CI; CDN smoke test fetches the published file from jsDelivr and diffs against dist. *Acceptance:* dry-run release on a canary tag end-to-end. *Deps:* U13, gates green.

---

## 9. EXECUTION GRAPH

```
U0 ──► U1 ──► U2 ──► U3 ──► U4 ──► U5
                              │      │
                              ▼      ▼
                             U6 ──► U7 ──┬─► U8 ──► U14
                                         ├─► U9 (9999)      
                                         ├─► U10 (reality)
                                         ├─► U11 ──► U12 ──► U14
                                         └─► U13 ──────────► U15
```
(×2 units execute 9999css first, realitycss second; realitycss inherits patterns, never copies values.)

## 10. FIRST BUILD ORDER (exact)

**U0 → U1 → U2(9999) → U3(9999) → U4(9999) → U5 → U6(9999) → U7(9999) → U13 → U11(9999, three templates: docs-page, auth, dashboard) → U12(9999, pages: install/tokens/components/a11y) → then the realitycss U2–U7 pass → U8 both → U9 → U10 → U11 remainder → U12 remainder → U14 → U15.**

Rationale: the harness (U5) exists before any component is written, so every component lands already-gated; integrations (U13) run early so "usable anywhere" is proven while the surface is small and cheap to fix; the homepage (U14) and the full template set come after the grammar, per the no-decorative-branding constraint; publishing (U15) is last and is rehearsed with a canary before any real release.

## 11. CONSTRAINTS — ENFORCEMENT MAP

| Constraint | Enforced by |
|---|---|
| No fake CLI | No CLI exists in this blueprint. One is added only as a future unit with its own tests |
| No fake package claims | README feature list generated from API.md (which is checked against built CSS) |
| No placeholder docs | Docs pages ship only with passing live examples (U12 acceptance) |
| No branding before grammar | U14 ordering + ≥90% framework-class homepage check |
| No React / no Tailwind in core | zero-dependency CI assertion; core is plain CSS |
| HTML-first examples | examples/ are .html files; framework integration lives only in integrations/ |
| Buildable, testable, publishable | §7 gates + U15 canary release |
