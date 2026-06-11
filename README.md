# Moldy Pixels

**Moldy Pixels** is a deliberately unserious name for a serious styled UI kit experiment: a retro-adjacent component ecosystem built around three visual design languages.

The repo now contains two dogfood style slices:

- **Saveglass UI** — memory-screen components: slots, registries, memory banks, system strips, overlays, and selected states.
- **Machine Candy UI** — candy-plastic hardware components: molded buttons, LCD fields, appliance controls, chunky panels, and friendly mode selectors.

> Premium UI components with questionable storage conditions.

## Current Status

This repo currently contains static, dependency-free dogfood showcases.

Saveglass includes:

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

Machine Candy includes:

- standalone dogfood homepage
- interactive device preview screen
- component/control examples
- block direction cards
- template direction cards
- four appliance mode themes
- molded button and LCD field styling

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
/                                Saveglass dogfood homepage
/machine-candy/                  Machine Candy dogfood homepage
/templates/dashboard.html         SaaS dashboard preview
/templates/ai-workspace.html      AI workspace preview
/templates/docs-manual.html       Docs/manual preview
/templates/marketplace.html       Template marketplace preview
```

## Files

```txt
index.html                         Saveglass dogfood homepage
styles.css                         core Saveglass theme system and components
phase2.css                         component lab, blocks, and template page styles
app.js                             homepage interactions
phase2.js                          component lab and block archive interactions
templates/template-page.js         tiny shared script for preview template pages
templates/*.html                   full static Saveglass template previews
machine-candy/index.html           Machine Candy dogfood homepage
machine-candy/machine-candy.css    Machine Candy visual system
machine-candy/machine-candy.js     Machine Candy interactions
package.json                       static server scripts
LICENSE                            MIT license
.gitignore                         basic ignores
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

## What Machine Candy Is

**Machine Candy UI** is a tactile consumer-hardware style based on friendly 2000s electronics.

It is not claymorphism, pastel SaaS, or a kids-app skin. The style depends on:

- molded plastic surfaces
- pressable hardware buttons
- LCD-style readout fields
- appliance control logic
- candy color palettes under strict grid discipline
- chunky panels with real internal structure

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

## The Larger Moldy Pixels Plan

Moldy Pixels is planned as a three-style UI ecosystem:

| Kit | Visual direction |
|---|---|
| Saveglass UI | memory-screen components, translucent slots, registry panels |
| Machine Candy UI | candy-colored molded hardware, LCD fields, appliance controls |
| Menu Ink UI | elegant menu panels, ink frames, chapter navigation |

The next build move is **Menu Ink UI** under `/menu-ink/`.

## Future Package Direction

The intended production form is a shadcn-compatible registry and styled component library.

Planned package surface:

```txt
packages/
  saveglass/
  machine-candy/
  menu-ink/
shared/
  preview-system/
  accessibility/
  registry-utils/
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
