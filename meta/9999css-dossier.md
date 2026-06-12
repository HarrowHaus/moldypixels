# 9999.css — BUILD DOSSIER v1.0

**A Dreamcast-inspired CSS framework.** Named for 9.9.99. Pure CSS core, one launch JS feature (the VMU). Sister project: reality.css.

> **The thesis:** every component should feel like it came off the console itself — the calm white-blue BIOS, the file manager, the save screens — not off a marketing poster. Crisp like a VGA box. Usable for ordinary websites and for web-game UI alike.

---

## 0. Decision record (locked with Bug, June 2026)

| Decision | Outcome |
|---|---|
| JS policy | Pure CSS core; JS ships in same package as a launch *feature*, not a separate add-on release |
| Dominant register | Dreamcast BIOS UI base + Jet Set Radio cel-shade as accent variant |
| Name | 9999.css (launch-date lore; "It's Thinking" branding explicitly rejected — do not use) |
| Class prefix | `.dc-` |
| Typography | Two voices: rounded BIOS sans for UI/body, square Y2K techno for display |
| Screen treatment | **Crisp always. No scanlines, no CRT filters, ever.** The Dreamcast was the VGA console; sharpness is the nostalgia |
| Motion | Era-matched: slow, floaty, orbital. `.dc-reduce` utility + automatic `prefers-reduced-motion` support |
| Sound | Reserved future feature (synthesized WebAudio, opt-in). Not in v1 |
| Inventory | Launch = NES.css parity + game tier. App tier staged for v1.1 |
| Demo site | Skippable homage boot intro, real usable docs underneath |
| Mode | Light is canonical at launch (the BIOS was bright). Dark mode staged |
| Swirl color | Single re-tintable RGB token. US orange default, PAL blue alt class |

---

## 0.5 Reference analysis log (June 2026) — READ BEFORE BUILDING ANYTHING

Mockups v1–v2 failed because they were designed from verbal memory, which converges on the AI-default "tasteful SaaS" look. v3 was rebuilt from measured reference frames. This section records what was measured, what it changed, and the laws that prevent regression.

### Method
Real frames pulled (YouTube capture thumbnails of hardware running on CRTs: BIOS main menu, file manager, CD player; SM64 logo + gameplay), dominant palettes extracted via PIL median-cut quantization on cropped screen regions. **Caveat:** CRT photos + JPEG compression dirty the values; treat them as directional. **Required next pass:** clean 640×480 VGA captures from the Flycast emulator booted to BIOS, re-measure, and pixel-measure capsule geometry (height, radius, letter-spacing) and the hub's exact stagger coordinates.

### Measured findings
| Finding | Measured | Consequence |
|---|---|---|
| Hub background is **water** | pale aqua caustics #A4D7CD / #62D7D0 on near-white | Animated liquid (SVG turbulence + caustic blobs), never a static gradient |
| Interactive vocabulary is **candy capsules** | Play pill #F99560→#F5923A coral; File pill #18F2C7→#1EDEAF mint; Set family magenta | Saturated capsule gradients are the button system; "tasteful" desaturation is a bug |
| Selection = **color flooding** | unselected icons are ghost-pale line drawings (pale pink/cyan strokes); selected floods full saturation | The framework's signature interaction: ghost → flood, not tint/ring |
| Section screens are **deep cobalt** | file manager field #093893→#135AA3, #1B98CA top glow; white utility text; mono metadata | Data-dense components (tables, file grids) live on cobalt, full-bleed |
| Dimension is **embossed, rationed** | CD player: giant pale-gray embossed numerals #D7DEE6 on white, glossy dark control strip | Depth comes from embossing + insets in a few places — NOT universal soft drop shadows |
| Layout is **screens, not sections** | each BIOS view: full-bleed, sparse, asymmetric (hub items staggered diagonally), tiny utility text + giant elements, ≥50% empty | Demo/docs compose as full-viewport screens; the component-board column is banned |

### Anti-SaaS laws (subtraction list v2 — these are what "safe" smells like)
1. **No centered card-grid component boards.** Compose as full-viewport screens.
2. **No universal soft drop shadows.** Depth budget: embossed numerals, capsule gradients, tile insets. Everything else sits flat on the field.
3. **No translucent white glass panels.** Surfaces are the water, the cobalt screen, or flat white — never frosted cards.
4. **Two type sizes per screen** (tiny utility + giant display/embossed), plus mono metadata. No marketing eyebrow-heading hierarchies.
5. **Asymmetry is mandatory.** The hub staggers diagonally; centered symmetric grids read as template.
6. **Emptiness is the luxury.** If a screen is more than ~50% components, cut components.
7. Section labels are **system hint lines** ("Select a file and press the button.") — never marketing copy.

### Improvement roadmap for the concept
1. Clean emulator captures → re-measure palette + geometry (replaces dirty CRT values).
2. Build the hub stagger from measured coordinates; build capsule metrics from pixel measurement.
3. Boot sequence study: time the real boot, choreograph the demo intro to its rhythm.
4. The same reference-first pass for every game-tier component before it's coded (find the screen, measure it, then build).
5. reality.css gets the identical treatment — and the measurement already surfaced a fork: SM64's logo extrusion is warm gold (#D3AB5A/#E7D263, not black) and the iconic world is bright (cobalt sky #3169F7, lavender fog #A2ACE4), which contradicts the locked dark-charcoal canonical mode. Decision pending with Bug.

---

- **Name:** 9999.css
- **Tagline:** "A Dreamcast-inspired CSS framework."
- **Prefix:** `.dc-`
- **Register:** the console's own software — BIOS, file manager, system screens. Calm, bright, rounded, floating. The loud Jet Set Radio voice exists only as an opt-in accent class (`.dc-shout`).
- **What it is not:** not a Y2K-chrome pastiche, not vaporwave, not a scanline filter. No blur anywhere in the core.

## 2. Tokens

All tokens are CSS custom properties on `:root`. The swirl accent is a **single space-separated RGB triple** so it can be re-tinted with one line (same pattern as ACETATE's re-tintable token).

```css
:root {
  /* The token. US swirl orange. */
  --dc-swirl: 244 93 34;            /* #F45D22 */

  /* Surfaces — BIOS white-blue */
  --dc-bg:        #EDF3F6;          /* page */
  --dc-panel:     #FFFFFF;          /* cards, inputs */
  --dc-tile:      #F7FAFC;          /* raised tiles, table headers */
  --dc-line:      #D5E0E7;          /* hairlines, input borders */

  /* Ink */
  --dc-ink:       #16324A;          /* primary text, deep blue-gray */
  --dc-ink-2:     #5A7184;          /* secondary text */

  /* Secondary accent — BIOS aqua (orbs, focus, info) */
  --dc-aqua:      98 198 222;       /* #62C6DE, also an RGB triple */

  /* Semantic */
  --dc-ok:        #2FA66A;
  --dc-warn:      #E8A13C;
  --dc-bad:       #D5494C;

  /* Shape */
  --dc-r-sm: 10px;  --dc-r-md: 16px;  --dc-r-lg: 24px;  --dc-r-pill: 999px;

  /* Depth — one airy diffuse shadow, nothing harsh */
  --dc-shadow: 0 8px 24px rgb(22 50 74 / 0.10);

  /* Motion — drift, never snap */
  --dc-ease:  cubic-bezier(0.22, 1, 0.36, 1);
  --dc-fast:  400ms;  --dc-med: 650ms;  --dc-slow: 900ms;
}

/* PAL region swap — one class on <html> re-tints the whole framework */
.dc-pal { --dc-swirl: 43 109 222; }   /* #2B6DDE */
```

Usage rule for the triples: always `rgb(var(--dc-swirl) / <alpha>)`. Accent fills, link color, active states, progress fills, and the primary button all derive from `--dc-swirl` and nothing else, so PAL mode (or any custom tint) is total.

### Typography

| Role | Face | Fallback stack | Notes |
|---|---|---|---|
| UI + body | **Jura** (500/600) | Quicksand, sans-serif | Thin, wide, lightly techno, rounded terminals — the closest open face to the BIOS voice. Load-bearing: this font must scream the era the way Press Start 2P does for NES.css |
| Display | **Michroma** | Audiowide, sans-serif | Square Y2K techno. Headers, hero, badges only. Letter-spacing 0.04em, never below 18px |
| Mono | **Spline Sans Mono** | monospace | Code, VMU labels, block counts |

Scale: 13 / 15 / 17 (body) / 21 / 27 / 36 / 52. Display face is rationed — if more than ~10% of visible text on a screen is Michroma, the page is shouting.

## 3. The generative constraint (REVISED after NES.css/pxlkit analysis)

NES.css works because every element is *constructed from* one technique (stacked box-shadow pixels), modern CSS is subtracted, and real game artifacts are quoted. 9999.css adopts the same discipline:

**The constraint:** *every surface is a beveled glass/plastic tile floating over an atmospheric gradient field.* One bevel recipe constructs every component — buttons, inputs, cards, table rows, toggles, the VMU shell — no exceptions:

```css
.dc-bevel {
  background: linear-gradient(180deg, rgb(255 255 255 / .92), rgb(244 250 253 / .85));
  border-radius: var(--r-md);
  box-shadow:
    inset 0 1.5px 0 rgb(255 255 255 / .95),    /* top edge light */
    inset 0 -3px 6px rgb(22 50 74 / .12),       /* bottom inner shade */
    0 6px 18px rgb(22 50 74 / .14);             /* float */
}
/* glossy sheen: ::before overlay, linear-gradient(180deg, rgb(255 255 255/.55), transparent 55%) */
```

The page background is never flat — it is the BIOS atmosphere: layered soft radial gradients (pale blue-white, aqua zones, a faint warm bloom) drifting slowly.

**The subtraction list (banned):** flat unbeveled surfaces; default soft drop shadows without the inset bevel pair; blur of any kind; scanlines; hairline 1px borders as the primary edge treatment; anything that reads "modern SaaS default."

**Quoted artifacts (components must be recognizable as the BIOS):** the clock/date screen (big thin digits, the first thing every owner saw), the memory-card file grid with block-count readouts, the spinning save indicator, the orb field, jewel-like glassy buttons. Test: someone who set their Dreamcast's clock in 1999 should feel it immediately.

**Icon format:** icons are defined as small polygon/grid data (pxlkit's grid-as-data pattern), rendered as crisp SVG — hand-editable, agent-generatable, never from a generic icon font.

**Commitment floor:** the mouse cursor is an orb (SVG data-URI cursor); the docs site never breaks character, down to the arrows inside buttons.

### 3.1 The orb (signature primitive)
The BIOS's floating orbs become the framework's atom: loader, list bullet, avatar fallback, radio indicator, step marker.

```css
.dc-orb {
  width: 1em; aspect-ratio: 1; border-radius: 50%;
  background:
    radial-gradient(circle at 32% 28%, #fff 0 18%, transparent 40%),
    radial-gradient(circle at 50% 50%,
      rgb(var(--dc-aqua)) 0%, rgb(var(--dc-aqua) / .55) 70%, rgb(var(--dc-aqua) / .25) 100%);
  box-shadow: 0 4px 10px rgb(var(--dc-aqua) / .35);
}
.dc-orb--swirl { /* same recipe with --dc-swirl */ }
```

Loader = three orbs orbiting on a slow ease (`--dc-slow`), gently scaling. **Do not** build a spiral/swirl-shaped spinner — the swirl is SEGA's trademark (see §9). Orbs are the loader.

### 3.2 Crispness discipline
- `backdrop-filter`, `filter: blur()`, scanline overlays: **banned in core.**
- All edges from `border` + `border-radius` + flat fills. Depth comes from the single diffuse shadow and surface steps (`--dc-bg` → `--dc-tile` → `--dc-panel`), never from blur.

### 3.3 The cel-shade accent: `.dc-shout`
The JSR voice, applied per-element to make one thing loud (a CTA, a promo card, a badge):

```css
.dc-shout {
  border: 3px solid #101418;
  border-radius: var(--dc-r-sm);
  box-shadow: 5px 5px 0 #101418;       /* hard offset, no blur */
  background: rgb(var(--dc-swirl));
  color: #fff;
  font-family: var(--dc-display);
}
.dc-shout:active { translate: 3px 3px; box-shadow: 2px 2px 0 #101418; }
```

Rule of restraint: one `.dc-shout` cluster per viewport.

### 3.4 Motion grammar
Everything drifts. Hover states ease over `--dc-fast`; panels enter by floating up 8px + fade over `--dc-med`; orbs pulse on a 2.4s loop. Nothing snaps, bounces, or shakes — that's reality.css's personality, not ours.

```css
@media (prefers-reduced-motion: reduce) { /* all animation off automatically */ }
.dc-reduce, .dc-reduce * { animation: none !important; transition-duration: 1ms !important; }
```

## 4. Component inventory — v1.0 launch

### Parity tier (NES.css equivalence)
`.dc-btn` (default / `--primary` swirl-filled / `--ghost`), `.dc-input`, `.dc-select`, `.dc-checkbox`, `.dc-radio` (orb indicator), `.dc-toggle` (pill, orb thumb slides on drift ease), `.dc-card`, `.dc-panel`, `.dc-badge`, `.dc-progress` (swirl fill, rounded track), `.dc-table`, `.dc-list` (orb bullets), `.dc-avatar` (orb fallback), `.dc-balloon` (speech bubble), `.dc-kbd`, `.dc-divider`.

### Game tier (the differentiator)
- **`.dc-save-slot`** — the DC file-manager save tile: rounded card, 32×32 icon well (fed by the VMU's .vms parser when JS is on, any image when off), title, block-count metadata line in mono. States: empty / occupied / selected.
- **`.dc-dialog`** — game dialogue box: panel pinned bottom, speaker name tab, optional typewriter reveal (CSS steps() on a clipped width for short lines; JS enhancement for arbitrary text).
- **`.dc-hud-bar`** — health/energy bar; segmented variant `.dc-hud-bar--cells`.
- **`.dc-selector`** — vertical menu list; selected row gets an orb cursor that drifts (not jumps) between rows.
- **`.dc-scoreboard`** — mono columns, rank/name/score, top-3 rows tinted with `--dc-swirl` alpha steps.
- **`.dc-start`** — full-viewport start screen layout: centered display-type title, "PRESS START" pulse (slow opacity drift).

### App tier — staged v1.1 (spec'd, not built at launch)
Tabs, modal, toast, tooltip, navbar, pagination, breadcrumbs, accordion. All BIOS register. Do not ship half of these in v1.0; ship none, then all.

## 5. Launch JS feature: the VMU

The VMU was memory + a screen, so the feature is **persistence + display**. Ships in the same package; core CSS never depends on it.

### 5.1 The screen
`<canvas class="dc-vmu" data-scale="3">` — logical resolution **48×32, 1-bit**, integer-scaled (default 3× = 144×96), `image-rendering: pixelated`. LCD colors: background `#C7D3C0`, pixel `#102818`. The CSS ships a bezel treatment (rounded shell, d-pad/button hints as pure decoration) so the screen reads as a VMU even before JS draws to it.

### 5.2 API (vanilla JS, zero deps, ~3–5 KB)
```js
const vmu = new VMU(canvasEl);
vmu.print("HELLO");                 // 4×6 px built-in font; auto-marquee if wider than 48
vmu.sprite(bits, x, y);             // 1-bit sprite blit
vmu.animate(frames, { fps: 4 });    // frame loop
vmu.save(key, value);               // persistence: localStorage-backed
vmu.load(key);
vmu.slots();                        // enumerate saves → feeds .dc-save-slot rendering
vmu.clear();
```

### 5.3 The .vms parser (format archaeology — the viral feature)
`VMU.parseVMS(arrayBuffer)` reads real Dreamcast save files: text description fields from the header, the 16-color ARGB4444 palette, and the 32×32 4-bit icon frames that follow it. (Canonical format reference: Marcus Comstedt's Dreamcast VMS documentation at mc.pp.se — the implementing agent should verify offsets there.) Output:
- **Color path:** icon frames rendered into `.dc-save-slot` icon wells.
- **1-bit path:** luminance-thresholded, downscaled to 48×32, animated on the VMU screen.

Demo moment: drag a real Sonic Adventure .vms onto the page, watch your Chao appear in a save slot. The framework speaks the actual 1999 file format.

### 5.4 Reserved future features (named, not built)
- **Sound:** synthesized WebAudio chimes/blips (docked-VMU beep, confirm, move). Opt-in attribute. No samples ever.
- **Rumble micro-feedback:** small shake/jolt utilities. Low priority.
- **WASM VMU emulator:** a real minigame running on the demo site's VMU (existing open-source cores are WASM-portable). Pure flex, far future.

## 6. Demo site

Skippable homage intro → real docs.
1. **Boot (≤3s, skippable, plays once per session):** white field, orb bloom, "9999.css" in Michroma resolves. No swirl mark, no SEGA audio.
2. **Docs chrome = BIOS file manager:** nav rendered as the file-manager tile grid; each section is a "save file" (`.dc-save-slot`). A live VMU in the corner mirrors the section you're reading and persists your last position (eating our own persistence API).
3. Underneath: normal, fast, searchable component docs with copy-paste HTML.

## 7. Accessibility baseline (non-negotiable)

- All shipped fg/bg pairs meet WCAG AA; `--dc-ink` on every surface ≥ 7:1.
- `:focus-visible`: 3px `rgb(var(--dc-aqua))` ring + 2px offset, on every interactive component. Focus is never removed, only styled.
- `prefers-reduced-motion` honored automatically; `.dc-reduce` for per-project opt-down.
- Hit targets ≥ 44×44 on touch. Semantic HTML in all doc examples. VMU canvas always paired with an ARIA live-region text mirror.

## 8. Package & engineering constraints

```
9999.css/
  css/9999.css        (core, single file; build from /src partials)
  js/vmu.js           (the VMU feature, optional include)
  docs/               (demo site)
  LICENSE             (MIT)
```
- Core budget: **≤ 30 KB min+gzip.** No runtime dependencies. No JS required for any CSS component.
- Fonts: link Google Fonts in docs; document self-hosting for users.
- Browser floor: last 2 evergreen. Acceptance: every component renders correctly with JS disabled.

## 9. Legal posture

- Never reproduce: the SEGA swirl logo, Dreamcast logotype, SEGA fonts, sounds, sprites, screenshots, or boot audio. The swirl is referenced only as a **color**, never a shape.
- Footer + README: "Not affiliated with or endorsed by SEGA. A fan-made homage."
- All fonts open-licensed. All icons/sprites original. MIT license.

## 10. Definition of done — v1.0

1. Every parity-tier and game-tier component implemented, documented, with copy-paste examples.
2. PAL re-tint works with a single class; no hardcoded accent hex anywhere.
3. VMU: print/sprite/animate/save/load/slots + .vms parsing verified against at least two real save files.
4. Zero blur/scanline properties in the shipped core (lint for it).
5. Size, a11y, and no-JS acceptance checks pass.
6. Demo site live with skippable boot + docs.
