# reality.css — BUILD DOSSIER v1.0

**An N64-inspired CSS framework.** Named for Project Reality and the Reality Coprocessor. Pure CSS core, one launch JS feature (the Expansion Pak). Sister project: 9999.css.

> **The thesis:** the page should feel like 1997's idea of reality — vertex-shaded gradients, fog at the edges, big soft filtered textures, chunky carved type — pulled straight off the cartridge menus and file-select screens. Usable for ordinary websites and for web-game UI alike.

---

## 0. Decision record (locked with Bug, June 2026)

| Decision | Outcome |
|---|---|
| JS policy | Pure CSS core; JS ships in the same package as a launch *feature*, activated at runtime — not a separate release |
| Dominant register | Render-look surface (vertex gradients, fog, filter blur) + hardware controller primaries as tokens + 90s rainbow extruded display type |
| Name | reality.css |
| Class prefix | `.r64-` |
| Typography | Chunky slab display in the SM64 spirit — **open-licensed faces only, never font rips** — over a neutral rounded body |
| Screen treatment | Optional `.r64-composite` blur utility, **off by default**. Core is clean |
| Motion | Era-matched: springy, bouncy, squash-and-stretch. `.r64-reduce` utility + automatic `prefers-reduced-motion` |
| Sound | Reserved future feature (synthesized WebAudio, opt-in). Not in v1 |
| Inventory | Launch = NES.css parity + game tier. App tier staged for v1.1 |
| Demo site | Skippable homage intro (file-select), real usable docs underneath |
| Mode | ~~Dark-leaning charcoal canonical~~ **REVERSED by §0.5 measurement: DAYLIGHT is canonical** (cobalt sky, lavender fog, gold extrusion). Charcoal ships later as "hardware mode" |
| Expansion Pak | Launch feature in-package. Activated by attribute — plugging it in upgrades the page at runtime, like the real hardware |

---

## 0.5 Reference analysis log + MAXIMALISM MANDATE (June 2026)

Measured from real frames (SM64 logo, in-game footage; method per the 9999.css log — YouTube hardware captures, PIL quantization; clean emulator captures are the required next pass):

| Finding | Measured | Consequence |
|---|---|---|
| Logo extrusion is **warm gold**, not black | #D3AB5A / #E7D263 / #8A6D1F steps behind the letter faces | All display-type extrusion uses gold-tan shadow steps |
| Letter faces are **saturated primaries with white outlines**, individually rotated | #E55B25 / #0DA355 / #F2D518 / cobalt; each letter tilted, jaunty | Rainbow display type = per-letter color + white outline + per-letter rotation + float animation |
| The iconic world is **bright daylight** | sky #3169F7 cobalt, clouds/fog #A2ACE4 / #D4D7F5 lavender-white, Mario red #DF0107 | **DECISION REVERSED: daylight is canonical.** Charcoal-hardware becomes the staged dark variant. The framework quotes the screens, not the plastic |
| HUD numerals are **chunky yellow with dark outlines** | yellow #F2D518 family, 4-direction dark outline | Counters, stats, badges use outlined chunky numerals (★×120, ×7 patterns) |

### The maximalism mandate (this framework's register — deliberate inversion of restraint)
reality.css does not ration boldness; it rations *illegibility*. Laws:
1. **Screens, not sections** (inherited from the 9999 analysis). Title screen, file select, course select — full-bleed worlds.
2. **Every display word is an event:** rainbow per-letter color, white outline, gold extrusion steps, per-letter rotation, idle float/bob animation.
3. **The world is always present:** cobalt sky, drifting clouds, low-poly flat-shaded terrain (CSS clip-path facets), fog at every edge. No element sits on a blank background, ever.
4. **Everything springs:** hover lifts, press squashes (scale 1.06/.93), cursors hop, continue-arrows bob, stars spin. Idle UI is still moving somewhere.
5. **Chunk floor:** no line thinner than 3px, no type smaller than 13px except mono stats, dark outlines on all display text.
6. **Legibility floors (the only restraint):** body text on solid surfaces, AA contrast maintained, `prefers-reduced-motion` collapses all spring/idle motion to fades, and `.r64-reduce` available.
7. Section labels are **game voice** ("SELECT FILE", "COURSE 6"), never marketing copy.

---

- **Name:** reality.css
- **Tagline:** "An N64-inspired CSS framework."
- **Prefix:** `.r64-`
- **Register:** what the console *rendered*, on the console's own hardware colors. Charcoal plastic, four button primaries, gold-cart premium accents, fog, gradients on every surface, fat carved display type.
- **What it is not:** not pixel art (that's NES territory), not PS1 jitter/affine wobble (PSone.css owns that), not a CRT filter pack.

## 2. Tokens

```css
:root {
  /* Surfaces — charcoal plastic */
  --r64-bg:     #232327;
  --r64-panel:  #313137;
  --r64-raise:  #3C3C43;
  --r64-line:   #4A4A52;

  /* Ink */
  --r64-ink:    #F2F2EE;            /* warm white */
  --r64-ink-2:  #B8B8BF;

  /* The controller primaries — semantic by hardware function */
  --r64-a:      #2A4FC9;            /* A button blue  → primary / info     */
  --r64-b:      #00A05A;            /* B button green → success            */
  --r64-c:      #FFC400;            /* C button yellow→ warning / focus    */
  --r64-start:  #D6362B;            /* Start red      → danger / error     */

  /* Gold cartridge — premium accent */
  --r64-gold:   linear-gradient(165deg, #8A6D1F 0%, #D9B43A 45%, #B08F2C 60%, #8A6D1F 100%);

  /* Fog — always the page background color */
  --r64-fog:    var(--r64-bg);

  /* Shape */
  --r64-r-sm: 8px;  --r64-r-md: 12px;  --r64-r-lg: 18px;

  /* Extrusion depth (the 3D button look) */
  --r64-depth: 6px;

  /* Motion — spring, snap, squash */
  --r64-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --r64-snap:   120ms;  --r64-bounce: 220ms;  --r64-settle: 320ms;
}
```

The semantic mapping is the lore: **A = primary action** (A confirmed everything), **B = success**, **C = warning and focus** (the yellow C-buttons pulled your attention), **Start = danger**. Document this mapping in the README — it's a feature, not trivia.

### Typography

| Role | Face | Fallback stack | Notes |
|---|---|---|---|
| Display | **Alfa Slab One** | Ultra, serif | The fat carved SM64-menu spirit. Headers, hero, file-select titles. **Never a ripped game font** (§9) |
| Body | **Fredoka** (400/500) | Nunito Sans, sans-serif | Rounded and toy-like enough to be era-true, legible enough for real docs — Nunito Sans read too "modern SaaS" |
| Mono | **IBM Plex Mono** | monospace | Scores, stats, code |

Scale: 13 / 15 / 17 (body) / 22 / 28 / 38 / 56. Display face minimum size 22px — slab weight collapses below that.

## 3. The generative constraint (REVISED after NES.css/pxlkit analysis)

**The constraint:** *every element is a low-poly object with light painted into it, sitting in fog.* No element is "flat UI with N64 colors" — every surface carries painted vertex light (multi-corner gradient + top-light edge), every interactive element has physical extruded depth, and the page itself is a fogged world (charcoal atmosphere with a horizon glow), never a flat background color.

**The subtraction list (banned):** flat single-color fills on any surface; hairline 1px borders as edge treatment (the N64 had no thin lines — everything is chunky); pixel-art anything (that's NES territory); pure #FFF or #000; transitions without spring/overshoot character; neutral grays with no color temperature.

**Quoted artifacts (components must be recognizable as the console's screens):** the file-select card ("FILE A", star row, mono stats), the bouncing ▶ selector cursor, the segmented power/HUD meter, the "PRESS START" pulse, fog swallowing the edges of long content. Test: someone who picked a save file in 1996 should feel it immediately.

**Commitment floor:** the mouse cursor is a chunky white cartoon glove pointer (original SVG, generic point-and-click iconography — no Nintendo asset); the docs site never breaks character. Icons are defined as low-poly triangle-mesh data (flat-shaded facets, per-face colors) — reality's equivalent of pxlkit's grid-as-data format: hand-editable, agent-generatable, and the data format itself enforces the aesthetic.

### 3.1 Vertex-gradient surfaces (the constructing technique)
The N64 had almost no real-time lighting; artists painted light into vertex colors, so every surface carries a soft multi-corner gradient. Recipe — corner radials stacked over a base, hue-shifted a few degrees apart, low alpha:

```css
.r64-panel {
  background:
    radial-gradient(120% 120% at 0% 0%,    rgb(120 130 255 / .10), transparent 55%),
    radial-gradient(120% 120% at 100% 0%,  rgb(255 255 255 / .06), transparent 55%),
    radial-gradient(120% 120% at 100% 100%, rgb(0 0 0 / .28),      transparent 60%),
    var(--r64-panel);
  border-radius: var(--r64-r-md);
  border-top: 1px solid rgb(255 255 255 / .07);   /* painted top light */
}
```

Flat fills are banned on panels, cards, and buttons. If a surface has no gradient, it isn't reality.css.

### 3.2 Extruded buttons + squash-and-stretch
Buttons are physical objects: a hard 0-blur drop extrusion below, and a press that squashes like a Mario 64 menu item.

```css
.r64-btn {
  border-radius: var(--r64-r-md);
  box-shadow: 0 var(--r64-depth) 0 rgb(0 0 0 / .45);
  transition: translate var(--r64-snap) var(--r64-spring),
              box-shadow var(--r64-snap) var(--r64-spring),
              scale var(--r64-snap) var(--r64-spring);
}
.r64-btn:hover  { translate: 0 -2px; box-shadow: 0 calc(var(--r64-depth) + 2px) 0 rgb(0 0 0 / .45); }
.r64-btn:active { translate: 0 4px; scale: 1.05 0.94;          /* the squash */
                  box-shadow: 0 2px 0 rgb(0 0 0 / .45); }
```

### 3.3 Rainbow extruded display type
The 90s-print rainbow treatment, built from layered text-shadow extrusion (no images, no ripped logo):

```css
.r64-display {
  font-family: var(--r64-font-display);
  color: var(--r64-ink);
  text-shadow:
    1px 1px 0 #1b1b1f, 2px 2px 0 #1b1b1f, 3px 3px 0 #1b1b1f,
    4px 4px 0 #1b1b1f, 6px 7px 12px rgb(0 0 0 / .5);
}
/* Rainbow variant: wrap words in spans; cycle the four primaries */
.r64-display--rainbow span:nth-child(4n+1) { color: var(--r64-a); }
.r64-display--rainbow span:nth-child(4n+2) { color: var(--r64-start); }
.r64-display--rainbow span:nth-child(4n+3) { color: var(--r64-c); }
.r64-display--rainbow span:nth-child(4n+4) { color: var(--r64-b); }
```

Restraint rule: rainbow is for the hero and section titles only — body chrome stays charcoal + one primary.

### 3.4 Fog utilities
Draw-distance as a design tool. Long scrollable regions, image edges, and overflowing lists fade into `--r64-fog`:

```css
.r64-fog-b { mask-image: linear-gradient(to bottom, #000 70%, transparent 100%); }
.r64-fog-x { mask-image: linear-gradient(to right, transparent, #000 8% 92%, transparent); }
```

Modal/overlay scrims are fog: `rgb(35 35 39 / .8)` with a subtle radial clear-spot behind the dialog — the world fogs out, the UI stays rendered.

### 3.5 Filtered-texture backgrounds
The N64 smear: decorative background images ship tiny (32–64px tiles) and are scaled up with smoothing **on** (`image-rendering: auto`) — the opposite of pixel-art crispness. Ship 3–4 original tileable textures (stone, grass, sky) as data-URI examples.

### 3.6 `.r64-composite` (optional, off by default)
One utility for the CRT-memory crowd: very subtle blur(0.4px) + faint chroma fringe via dual text-shadow on a wrapper class. Documented with a warning that it costs legibility. Never applied by core components.

## 4. Component inventory — v1.0 launch

### Parity tier (NES.css equivalence)
`.r64-btn` (charcoal default / `--a` `--b` `--c` `--start` primaries / `--gold` premium), `.r64-input`, `.r64-select`, `.r64-checkbox`, `.r64-radio`, `.r64-toggle` (thumb lands with a spring overshoot), `.r64-card`, `.r64-panel`, `.r64-badge`, `.r64-progress` (vertex-gradient fill), `.r64-table`, `.r64-list`, `.r64-avatar`, `.r64-balloon`, `.r64-kbd`, `.r64-divider`.

### Game tier (the differentiator)
- **`.r64-file-select`** — the file-select card grid: each save is a vertex-gradient card with display-type slot label ("FILE A"), stat lines in mono, star/progress row. States: empty ("NEW") / occupied / selected (lifts −4px with `--r64-c` glow ring).
- **`.r64-dialog`** — dialogue box: bottom-pinned raised panel, speaker tab in display type, optional typewriter reveal, bouncing ▼ continue indicator (springs on a loop).
- **`.r64-hud-bar`** — health/power bar with vertex-gradient fill; segmented `--cells` variant; `--gold` variant for special meters.
- **`.r64-selector`** — vertical menu; the cursor is a chunky ▶ that *hops* between rows on the spring ease (contrast with 9999.css's drifting orb — the two frameworks must feel like different consoles).
- **`.r64-scoreboard`** — mono columns; rank 1 gets the gold-cart gradient treatment.
- **`.r64-start`** — full-viewport start screen: rainbow display title with slow float, "PRESS START" in a spring pulse.

### App tier — staged v1.1 (spec'd, not built at launch)
Tabs, modal (fog scrim spec above), toast (springs in from edge), tooltip, navbar, pagination, breadcrumbs, accordion. Ship none in v1.0, then all in v1.1.

## 5. Launch JS feature: the Expansion Pak

The real Expansion Pak was RAM that upgraded graphics — including unlocking hi-res mode. The feature maps exactly: **plugging it in upgrades the page's rendering, at runtime.** Same package as the core; the core never requires it.

### 5.1 Activation
```html
<html data-expansion-pak>          <!-- standard: renders at 320×240 -->
<html data-expansion-pak="hires">  <!-- hi-res: renders at 640×480 -->
```
`expansion-pak.js` lazy-loads three.js (the only dependency, loaded only when the attribute exists) and mounts scenes into any `[data-r64-scene]` element. Internal render target is the era resolution above, upscaled to the element with smoothing on — the blur is free and authentic.

### 5.2 What the Pak renders
- **Hero scenes:** slow-orbiting low-poly objects (ship 2–3 original models ≤ 500 tris: a cartridge-like slab, a crystal, terrain) behind or beside hero text.
- **Shader spec (GLSL, for the implementing agent):**
  - **3-point bilinear filtering** — the N64's signature: sample the 3 nearest texels in a triangular pattern with barycentric weights, producing the diagonal smear (vs. standard 4-tap bilinear). This is the one shader that must be right; reference implementations exist in MIT-licensed retro shader packs whose math ports directly to GLSL.
  - **Vertex colors, no real-time lights** — light is painted into the mesh.
  - **Fog uniform** matched to `--r64-fog`, near/far tuned so geometry fades exactly into the page background — the scene and the page share one atmosphere.
  - Dithering pass to hide gradient banding; color depth limited to RGBA 5551-equivalent.
- **No-JS / no-Pak fallback:** every `[data-r64-scene]` element carries a CSS vertex-gradient poster background, so the page is complete without it — exactly like an N64 game running without the Pak.

### 5.3 The demo toggle
The docs site renders a cartridge-slot control. Clicking it sets the attribute live: fog deepens, hero geometry spins up, hi-res toggles. *This is the screenshot/clip that markets the framework.*

### 5.4 Reserved future features (named, not built)
- **Sound:** synthesized WebAudio menu blips/confirms, opt-in attribute, no samples ever.
- **Rumble utilities:** spring-shake micro-feedback classes.
- **Light mode:** "kid's-bedroom daylight" palette, staged after launch.

## 6. Demo site

1. **Intro (≤3s, skippable, once per session):** charcoal field, fog clears, "reality.css" resolves in rainbow display type with the extrusion building shadow-layer by shadow-layer.
2. **Docs chrome = file select:** the doc sections are `.r64-file-select` cards ("FILE A — Getting Started"). Selecting one springs it forward and loads the section.
3. The cartridge-slot Expansion Pak toggle lives in the header, always visible.
4. Underneath: normal, fast, searchable docs with copy-paste HTML.

## 7. Accessibility baseline (non-negotiable)

- All shipped fg/bg pairs meet WCAG AA on charcoal; `--r64-c` yellow is never used for body text, only fills/rings.
- `:focus-visible`: 3px `--r64-c` ring + 2px offset on every interactive component. Never removed.
- `prefers-reduced-motion` honored automatically (springs become fades); `.r64-reduce` for per-project opt-down.
- Hit targets ≥ 44×44 on touch. Semantic HTML throughout docs. Expansion Pak scenes are `aria-hidden` decoration with text equivalents.

## 8. Package & engineering constraints

```
reality.css/
  css/reality.css       (core, single file; build from /src partials)
  js/expansion-pak.js   (the Pak; lazy-loads three.js only when activated)
  assets/               (original low-poly models + tiny textures, all ours)
  docs/
  LICENSE               (MIT)
```
- Core budget: **≤ 30 KB min+gzip**, zero runtime deps, no JS required for any CSS component.
- Pak budget: ≤ 8 KB before three.js; three.js loaded from CDN/lazy chunk only on activation.
- Browser floor: last 2 evergreen. Acceptance: every component renders correctly with JS disabled.

## 9. Legal posture

- Never reproduce: Nintendo logos, the N64 logo cube, game fonts (no SM64 font rips — evoke with open-licensed slabs), sounds, sprites, characters, or screenshots. Models and textures are original.
- Footer + README: "Not affiliated with or endorsed by Nintendo. A fan-made homage."
- All fonts open-licensed (Alfa Slab One, Ultra, Nunito Sans, IBM Plex Mono — all OFL). MIT license.

## 10. Definition of done — v1.0

1. Every parity-tier and game-tier component implemented, documented, with copy-paste examples.
2. Vertex-gradient discipline holds: no flat-filled panels anywhere (lint for plain `background: <color>` on surfaces).
3. Expansion Pak: attribute activation, 320×240/hires targets, 3-point filter shader verified against reference output, CSS fallback posters on every scene.
4. Motion reads springy at every interactive state; reduced-motion path verified.
5. Size, a11y, and no-JS acceptance checks pass.
6. Demo site live with skippable intro, file-select docs nav, working cartridge-slot toggle.
