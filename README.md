# Moldy Pixels

**Moldy Pixels** is a deliberately unserious name for a serious styled UI kit experiment: a retro-adjacent component ecosystem built around three visual languages.

> Premium UI components with questionable storage conditions.

## Current Architecture

The repo now uses a hub-and-kits layout plus manifest-driven library catalogs:

```txt
/                 Moldy Pixels landing page
/library/          Library parity dashboard
/components/       Shared component catalog
/blocks/           Shared block catalog
/templates/        Shared template catalog and Saveglass previews
/saveglass/        Saveglass UI dedicated style page
/machine-candy/    Machine Candy UI dedicated style page
/menu-ink/         Menu Ink UI dedicated style page
```

The root page is the umbrella landing page. Each style has its own dedicated product page. The `/library/`, `/components/`, `/blocks/`, and `/templates/` routes expose the library depth and parity target.

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
/components/
/blocks/
/templates/
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
/                                Moldy Pixels landing page
/library/                         Manifest-driven parity dashboard
/components/                      Shared component catalog
/blocks/                          Shared block catalog
/templates/                       Shared template catalog
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
index.html                         Moldy Pixels landing page
library/index.html                 Library parity dashboard
components/index.html              Shared component catalog
blocks/index.html                  Shared block catalog
templates/index.html               Shared template catalog
data/*.js                          Manifest data for kits/components/blocks/templates
shared/library.css                 Library/catalog dashboard styles
shared/render-library.js           Library dashboard renderer
shared/render-catalog.js           Components/blocks/templates catalog renderer
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

## Next Build Move

Generate per-kit component pages:

```txt
/saveglass/components/button/
/machine-candy/components/button/
/menu-ink/components/button/
```

Then repeat for blocks and templates before starting shadcn registry JSON.

## License

MIT.

## Name Disclaimer

Yes, the repo is called **Moldy Pixels**.

No, the design work is not moldy.

Probably.
