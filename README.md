# Moldy Pixels

**Moldy Pixels** is now a console CSS framework monorepo, not the old three-style static dogfood site.

This repo is being rebuilt around two publishable, plain-CSS frameworks:

```txt
9999.css      Dreamcast-inspired CSS framework
reality.css   N64-inspired CSS framework
```

The old Saveglass / Machine Candy / Menu Ink site has been preserved on the `archive/pre-reset` branch before this reset.

## Phase

Current phase: **U0 — repo scaffold**.

U0 is intentionally boring. It creates the publishable monorepo shape, build commands, package shells, quality-gate placeholders, law documents, and visual targets. It does **not** implement the real component grammar yet.

## Architecture

```txt
packages/
  9999css/
  realitycss/
  internal/

docs/
  9999/
  reality/

examples/
integrations/
reference/
meta/
design-targets/
codexhandoff/
.github/workflows/
```

## Framework packages

### `packages/9999css`

Dreamcast-inspired CSS framework. Public prefix: `.dc-`.

### `packages/realitycss`

N64-inspired CSS framework. Public prefix: `.r64-`.

## Layer contract

Every package begins with the locked cascade layer order:

```css
@layer reset, tokens, base, primitives, components, utilities;
```

Rules:

- `tokens.css` is the only source file allowed to contain raw color values.
- Every other CSS file must use custom properties.
- Mode files are token swaps only.
- Core CSS has zero runtime dependencies.
- Class names are the public API.

## Commands

```bash
pnpm install
pnpm build
pnpm test
```

## Handoff files

Raw handoff archive:

```txt
codexhandoff/Buildmoldypixels.zip
codexhandoff/console-family-engineering-blueprint.md
```

Working law docs:

```txt
meta/console-family-engineering-blueprint.md
meta/9999css-dossier.md
meta/realitycss-dossier.md
meta/moldypixels-builder-prompt-phase1.md
```

Visual targets:

```txt
design-targets/9999-mockup-v3.html
design-targets/9999-mockup-v4.html
design-targets/reality-mockup-v3-max.html
```

## What is intentionally not here yet

- no fake CLI
- no fake npm availability claims
- no finished components
- no docs homepage
- no registry output
- no publishing workflow that actually publishes

Those belong to later U-series units after acceptance gates exist.
