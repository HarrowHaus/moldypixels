# Capture instructions

These captures are the measurement inputs for `measure.py`. The dossiers' current palette numbers came from CRT photos and are directional only; tokens (U2) derive from measurements of THESE files once committed.

## Rules (all captures)

- **PNG only.** Never JPEG, never re-encoded screenshots of screenshots.
- Full frame, native aspect ratio, no cropping.
- All emulator enhancement off: no CRT filters, no scanlines, no upscaling shaders, no texture filtering enhancements, no widescreen hacks.
- Use the emulator's built-in screenshot function where available (pixel-exact), not OS screen grabs of a scaled window.
- Commit to `reference/captures/dc/` and `reference/captures/n64/` with the exact filenames below.

## Dreamcast — Flycast, VGA (640×480)

Settings: video output 640×480, VGA cable mode, region US (NTSC).

| File | Screen | Notes |
|---|---|---|
| `dc/dc-bios-hub-ghost.png` | BIOS main menu (hub) | Cursor positioned so at least one icon is clearly **unselected** (pale ghost line-drawing state) |
| `dc/dc-bios-hub-flood.png` | BIOS main menu (hub) | Same view with an icon **selected** (full-saturation color flood) |
| `dc/dc-file-manager.png` | Memory card / file manager | The deep cobalt field with file tiles and white utility text |
| `dc/dc-cd-player.png` | CD player | The giant pale-gray embossed numerals on white |
| `dc/dc-clock.png` | Clock/date setting screen | The big thin digits — first screen every owner saw |

## N64 — Super Mario 64, accuracy-focused emulator

Use simple64 or mupen64plus with ParaLLEl-RDP (accuracy preset). Native internal resolution (320×240) output at 1× or 2× integer scale — record which in the commit message.

| File | Screen | Notes |
|---|---|---|
| `n64/n64-title.png` | Title screen with logo | Full logo visible: gold extrusion steps and per-letter face colors |
| `n64/n64-file-select.png` | File select | "FILE A"-style cards, stars, mono stats visible |
| `n64/n64-gameplay-hud.png` | Bright daylight gameplay | Cobalt sky and lavender fog in frame, HUD numerals (stars/coins/health) visible |

## After committing captures

1. Region crop boxes in `regions.json` get tuned to the actual frames (one-time manual pass).
2. `python3 reference/measure.py` writes `reference/measured-values.json`.
3. CI re-runs measurement and fails if the committed JSON doesn't reproduce — that is U1's acceptance gate.
