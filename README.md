# Moldy Pixels

**Moldy Pixels** is a deliberately unserious name for a serious styled UI kit experiment: a retro-adjacent component ecosystem built around three visual design languages.

The first shipped style is **Saveglass UI** — a memory-screen inspired dogfood site that turns ordinary web components into saved objects: slots, registries, memory banks, system strips, overlays, and selected states.

> Premium UI components with questionable storage conditions.

## Current Status

This repo currently contains a static, dependency-free **Saveglass UI dogfood showcase**.

It includes:

- interactive homepage
- live component lab
- component variant controls
- copyable code snippet panel
- block archive with preview modal
- theme bank switcher
- template launcher
- four full preview template pages
- registry-style table
- mobile drawer, modal, and toast behavior

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
/                              Saveglass dogfood homepage
/templates/dashboard.html       SaaS dashboard preview
/templates/ai-workspace.html    AI workspace preview
/templates/docs-manual.html     Docs/manual preview
/templates/marketplace.html     Template marketplace preview
```

## Files

```txt
index.html                    Saveglass dogfood homepage
styles.css                    core Saveglass theme system and components
phase2.css                    component lab, blocks, and template page styles
app.js                        homepage interactions
phase2.js                     component lab and block archive interactions
templates/template-page.js    tiny shared script for preview template pages
templates/*.html              full static template previews
package.json                  static server scripts
LICENSE                       MIT license
.gitignore                    basic ignores
```

## What Saveglass Is

**Saveglass UI** is a styled component direction based on modernized 2000s console memory interfaces.

It is not generic glassmorphism.

Glassmorphism usually means frosted cards and blur. Saveglass uses translucency as part of a larger visual grammar:

- save slots
- memory banks
- selected rails
- metadata strips
- system overlays
- registry tables
- segmented progress
- status chips
- theme banks

A normal web component gets translated into the Saveglass visual world:

| Normal component | Saveglass interpretation |
|---|---|
| Button | selectable system slot |
| Card | save file / saved object |
| Table | file registry |
| Dialog | system confirmation overlay |
| Sidebar | memory bank |
| Badge | metadata/status chip |
| Progress | segmented save/load bar |
| Toast | system notification |
| Theme switcher | memory bank loader |

## Design Principles

1. **Slot before card** — cards are saved objects, not generic rectangles.
2. **Metadata is ornament** — slot IDs, status labels, versions, and timestamps create the style.
3. **Glow means state** — glow is reserved for selection, focus, loading, warning, or error.
4. **Transparency must stay readable** — translucent shells use solid inner surfaces when text matters.
5. **Structure beats decoration** — dividers, status strips, rails, and registries do more work than random effects.

## The Larger Moldy Pixels Plan

Moldy Pixels is planned as a three-style UI ecosystem:

| Kit | Visual direction |
|---|---|
| Saveglass UI | memory-screen components, translucent slots, registry panels |
| Machine Candy UI | candy-colored molded hardware, LCD fields, appliance controls |
| Menu Ink UI | elegant menu panels, ink frames, chapter navigation |

The next build move is to use the now-proven Saveglass site architecture to create separate dogfood sections for **Machine Candy** and **Menu Ink**.

## Future Package Direction

The intended production form is a shadcn-compatible registry and styled component library.

Planned Saveglass package surface:

```txt
packages/saveglass/
  components/
  blocks/
  templates/
  themes/
  icons/
  registry.json
```

## Deployment

Because this is static, GitHub Pages can serve it directly from the repo root.

Recommended GitHub Pages setting:

```txt
Source: Deploy from branch
Branch: main
Folder: /root
```

## License

MIT.

## Name Disclaimer

Yes, the repo is called **Moldy Pixels**.

No, the design work is not moldy.

Probably.
