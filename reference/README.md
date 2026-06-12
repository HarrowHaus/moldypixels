# Reference

U1's measurement pipeline. Clean emulator captures are quantified here; U2 tokens derive from `measured-values.json`, never from the mockups or the dossiers' CRT-photo numbers.

## Pieces

- `CAPTURE.md` — the capture checklist (filenames, emulator settings, rules).
- `captures/dc/`, `captures/n64/` — committed PNG captures (owner-provided; not yet present).
- `regions.json` — per-capture measurement spec: named crop boxes for palette quantization and color-range geometry targets. Tuned manually once captures land.
- `measure.py` — Python 3 + Pillow. Median-cut palette extraction per region, color-range bounding boxes for geometry. Deterministic output (sorted keys, tie-broken quantization counts).
- `measured-values.json` — the generated measurement record. Committed only once real captures exist.

## measured-values.json schema

```json
{
  "_generated_by": "reference/measure.py",
  "captures": {
    "dc/dc-bios-hub-flood.png": {
      "source_capture": "dc/dc-bios-hub-flood.png",
      "sha256": "<capture file hash>",
      "size": [640, 480],
      "regions": {
        "water-field": {
          "box": [0, 0, 640, 200],
          "palette": [ { "hex": "#A4D7CD", "share": 0.41 } ]
        }
      },
      "geometry": {
        "play-capsule": {
          "box": [0, 0, 640, 480],
          "target": "#F99560",
          "tolerance": 24,
          "bbox": { "x": 0, "y": 0, "width": 0, "height": 0 }
        }
      }
    }
  }
}
```

(The values above illustrate the shape only; nothing is committed until real captures produce real numbers.)

## Commands

```bash
python3 reference/measure.py --self-test   # pipeline proof against a synthetic image
python3 reference/measure.py               # measure captures -> measured-values.json
python3 reference/measure.py --check       # CI gate: output reproduces from captures;
                                           # while no captures exist, asserts no half-state
```

## U1 acceptance

`measure.py --check` green with real captures committed: `measured-values.json` reproduces byte-identically from `captures/` + `regions.json`.
