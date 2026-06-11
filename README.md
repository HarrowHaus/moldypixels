# Moldy Pixels

**Moldy Pixels** is a deliberately unserious name for a serious styled UI kit experiment: a retro-adjacent component ecosystem built around three visual design languages.

The first shipped vertical slice is **Saveglass UI** — a memory-screen inspired dogfood homepage that turns ordinary web components into saved objects: slots, registries, memory banks, system strips, overlays, and selected states.

> Premium UI components with questionable storage conditions.

## Current Status

This repo currently contains the first fully interactive static dogfood page for **Saveglass UI**.

It is intentionally dependency-free so it runs anywhere:

- no Vite
- no Next.js
- no npm install required
- no build step
- works in Termux with Python's built-in HTTP server
- suitable for GitHub Pages

The static version proves the visual system before the project expands into a shadcn-compatible registry/package structure.

## Included

```txt
index.html      Saveglass dogfood homepage
styles.css      full Saveglass theme system and component styling
app.js          interactive slots, themes, toasts, modal, mobile drawer
package.json    lightweight npm scripts for static serving
LICENSE         MIT license
.gitignore      basic ignores
```

## Run Locally

From a normal terminal:

```bash
python -m http.server 8080
```

Then open:

```txt
http://127.0.0.1:8080
```

Or use the npm helper:

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

## Interactive Features

The current dogfood homepage includes:

- interactive hero slot selector
- four full theme banks
- copy-install command with toast feedback
- template preview modal
- responsive mobile drawer
- component slot grid
- template memory bank
- registry-style data table
- segmented theme-load progress animation

## Theme Banks

Saveglass currently ships four visual banks:

| Theme | Use |
|---|---|
| Indigo Memory | flagship dark mode for dashboards and AI tools |
| Cyan Archive | lighter readable mode for docs and marketing |
| Violet Slot | premium creator-tool mode |
| Mono Save | professional neutral mode for internal tools |

Theme switching is handled with CSS variables on the root class, so the whole page changes without inline color hacks.

## Design Principles

Saveglass follows these rules:

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

The three kits should eventually share a common component contract while maintaining separate visual constitutions.

Planned structure:

```txt
moldy-pixels/
  saveglass/
  machine-candy/
  menu-ink/
  shared/
```

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

Expected component surface:

- Button
- Card
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Slider
- Badge
- Alert
- Toast
- Dialog
- Sheet
- Tabs
- Accordion
- Dropdown Menu
- Command Palette
- Table
- Data Table
- Sidebar
- Navbar
- Progress
- Skeleton
- Tooltip
- Popover
- Pricing Card
- Hero
- Template Card
- Theme Switcher
- Code Block
- Footer

## Acceptance Criteria

The current Saveglass page is successful if:

- the screenshot reads as memory-screen UI within three seconds
- it does not look like generic glassmorphism
- the hero is interactive
- theme banks switch the whole page
- template previews open in a modal
- the install command copies with toast feedback
- mobile layout remains usable
- the component styling implies a larger library

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
