# Moldy Pixels

**Moldy Pixels** is a deliberately unserious name for a serious styled UI kit experiment: a retro-adjacent component ecosystem built around three visual languages.

> Premium UI components with questionable storage conditions.

## Current Architecture

The repo now uses a hub-and-kits layout plus a manifest-driven library dashboard:

```txt
/                 Moldy Pixels hub
/library/          Library parity dashboard
/saveglass/        Saveglass UI dogfood showcase
/machine-candy/    Machine Candy UI dogfood showcase
/menu-ink/         Menu Ink UI dogfood showcase
```

The root page routes into the three style systems. The `/library/` page tracks the real component, block, and template parity target.

## Style Slices

| Kit | Visual engine | Route |
|---|---|---|
| Saveglass UI | memory slots, registries, translucent overlays | `/saveglass/` |
| Machine Candy UI | molded plastic, LCD fields, appliance controls | `/machine-candy/` |
| Menu Ink UI | ink frames, chapter menus, archive ledgers | `/menu-ink/` |

## Current Status

This repo contains static, dependency-free dogfood showcases for the first three Moldy Pixels styles.

It now also contains explicit inventory manifests:

```txt
data/kits.js
data/components.js
data/blocks.js
data/templates.js
```

These drive:

```txt
/library/
```

The dashboard separates **planned**, **prototype**, and **showcase** status so the project does not pretend a visual demo is a finished component library.

No framework is required:

- no Vite
- no Next.js
- no npm install required
- no build step
- works in Termux with Python's built-in HTTP server
- suitable for GitHub Pages

## Run Locally

```bash
python -m http.server 8080
```

Then open:

```txt
http://127.0.0.1:8080
```

Or:

```bash
npm run start
```

## Run in Termux

```bash
pkg update
pkg install python git

git clone https://github.com/HarrowHaus/moldypixels.git
cd moldypixels
python -m http.server 8080
```

Then open Android browser to:

```txt
http://127.0.0.1:8080
```

## Routes

```txt
/                                Moldy Pixels hub
/library/                         Manifest-driven parity dashboard
/saveglass/                       Saveglass dogfood showcase
/machine-candy/                   Machine Candy dogfood showcase
/menu-ink/                        Menu Ink dogfood showcase
/templates/dashboard.html          Saveglass SaaS dashboard preview
/templates/ai-workspace.html       Saveglass AI workspace preview
/templates/docs-manual.html        Saveglass docs/manual preview
/templates/marketplace.html        Saveglass marketplace preview
```

## Files

```txt
index.html                         Moldy Pixels hub
library/index.html                 Library parity dashboard
data/*.js                          Manifest data for kits/components/blocks/templates
shared/library.css                 Library dashboard styles
shared/render-library.js           Library dashboard renderer
saveglass/index.html                Saveglass dogfood showcase
styles.css                         core Saveglass theme system and components
phase2.css                         Saveglass component lab, blocks, and template page styles
app.js                             Saveglass homepage interactions
phase2.js                          Saveglass component lab and block archive interactions
templates/template-page.js         tiny shared script for Saveglass preview template pages
templates/*.html                   full static Saveglass template previews
machine-candy/index.html           Machine Candy dogfood homepage
machine-candy/machine-candy.css    Machine Candy visual system
machine-candy/machine-candy.js     Machine Candy interactions
menu-ink/index.html                Menu Ink dogfood homepage
menu-ink/menu-ink.css              Menu Ink visual system
menu-ink/menu-ink.js               Menu Ink interactions
package.json                       static server scripts
LICENSE                            MIT license
.gitignore                         basic ignores
```

## Design Principles

Saveglass:

1. **Slot before card** — cards are saved objects, not generic rectangles.
2. **Metadata is ornament** — slot IDs, status labels, versions, and timestamps create the style.
3. **Glow means state** — glow is reserved for selection, focus, loading, warning, or error.
4. **Transparency must stay readable** — translucent shells use solid inner surfaces when text matters.
5. **Structure beats decoration** — dividers, status strips, rails, and registries do more work than random effects.

Machine Candy:

1. **Machine before candy** — playful color only works because the grid is strict.
2. **Controls must look pressable** — buttons need compression, seams, and tactile feedback.
3. **Inputs are readouts** — form fields should feel like LCD windows, not generic boxes.
4. **Color is mode-based** — palettes are appliance modes, not random pastel blobs.
5. **Cute is allowed; childish is not** — typography and spacing keep it usable.

Menu Ink:

1. **Frame before ornament** — decoration must reinforce containment and selection.
2. **Chapters organize action** — navigation should feel like a manual or menu system.
3. **Tables are ledgers** — data gets archival structure, not SaaS spreadsheet gloss.
4. **Selection is formal** — active states use ink fill, side marks, or chapter emphasis.
5. **No cosplay** — no fake fantasy textures, parchment overload, or lore nonsense.

## Next Build Move

Use the manifest layer to generate parity pages:

```txt
/component index
/block index
/template index
/per-kit component pages
```

Then bring Machine Candy and Menu Ink to Saveglass parity before starting shadcn registry JSON.

## License

MIT.

## Name Disclaimer

Yes, the repo is called **Moldy Pixels**.

No, the design work is not moldy.

Probably.
