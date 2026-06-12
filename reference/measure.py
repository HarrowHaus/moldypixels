#!/usr/bin/env python3
"""Reference measurement pipeline (blueprint U1).

Extracts dominant palettes (PIL median-cut, per dossier method) and simple
geometry (color-range bounding boxes) from the emulator captures in
reference/captures/, driven by the spec in regions.json, and writes
measured-values.json deterministically.

Usage:
  measure.py              measure all captures in regions.json, write output
  measure.py --self-test  verify the pipeline against a synthetic image
  measure.py --check      CI gate: reproduce committed output (or, while no
                          captures exist, assert no half-state)
"""
import argparse
import hashlib
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
REGIONS_FILE = ROOT / "regions.json"
CAPTURES_DIR = ROOT / "captures"
OUTPUT_FILE = ROOT / "measured-values.json"


def dominant_palette(img, box, colors=8, top=5):
    """Median-cut quantize a crop; return the top swatches by pixel share."""
    region = img.crop(tuple(box)).convert("RGB")
    quantized = region.quantize(colors=colors, method=Image.Quantize.MEDIANCUT)
    palette = quantized.getpalette()
    total = region.width * region.height
    # Sort by count desc, then palette index, so ties are deterministic.
    counts = sorted(quantized.getcolors(total), key=lambda t: (-t[0], t[1]))
    swatches = []
    for count, idx in counts[:top]:
        r, g, b = palette[idx * 3 : idx * 3 + 3]
        swatches.append({"hex": f"#{r:02X}{g:02X}{b:02X}", "share": round(count / total, 4)})
    return swatches


def color_range_bbox(img, box, target, tolerance):
    """Bounding box (full-image coords) of pixels within tolerance of target hex."""
    tr, tg, tb = (int(target[i : i + 2], 16) for i in (1, 3, 5))
    region = img.crop(tuple(box)).convert("RGB")
    pixels = region.load()
    min_x = min_y = float("inf")
    max_x = max_y = -1
    for y in range(region.height):
        for x in range(region.width):
            r, g, b = pixels[x, y]
            if abs(r - tr) <= tolerance and abs(g - tg) <= tolerance and abs(b - tb) <= tolerance:
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if max_x < 0:
        return None
    return {
        "x": box[0] + min_x,
        "y": box[1] + min_y,
        "width": max_x - min_x + 1,
        "height": max_y - min_y + 1,
    }


def measure_capture(rel_path, spec):
    path = CAPTURES_DIR / rel_path
    img = Image.open(path)
    entry = {
        "source_capture": rel_path,
        "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "size": [img.width, img.height],
        "regions": {},
        "geometry": {},
    }
    for name, region in spec.get("regions", {}).items():
        entry["regions"][name] = {
            "box": region["box"],
            "palette": dominant_palette(
                img, region["box"], colors=region.get("colors", 8), top=region.get("top", 5)
            ),
        }
    for name, geo in spec.get("geometry", {}).items():
        entry["geometry"][name] = {
            "box": geo["box"],
            "target": geo["target"],
            "tolerance": geo["tolerance"],
            "bbox": color_range_bbox(img, geo["box"], geo["target"], geo["tolerance"]),
        }
    return entry


def load_spec():
    return json.loads(REGIONS_FILE.read_text())


def committed_pngs():
    if not CAPTURES_DIR.is_dir():
        return []
    return sorted(p.relative_to(CAPTURES_DIR).as_posix() for p in CAPTURES_DIR.rglob("*.png"))


def measure_all(spec):
    captures = spec.get("captures", {})
    result = {"_generated_by": "reference/measure.py", "captures": {}}
    for rel_path in sorted(captures):
        result["captures"][rel_path] = measure_capture(rel_path, captures[rel_path])
    return result


def render(result):
    return json.dumps(result, indent=2, sort_keys=True) + "\n"


def cmd_measure():
    spec = load_spec()
    if not spec.get("captures"):
        pngs = committed_pngs()
        if pngs:
            sys.exit(
                "regions.json has no capture entries but captures exist: "
                f"{', '.join(pngs)}. Add their measurement specs (see CAPTURE.md)."
            )
        sys.exit("No captures committed yet — see CAPTURE.md for the capture checklist.")
    OUTPUT_FILE.write_text(render(measure_all(spec)))
    print(f"wrote {OUTPUT_FILE.relative_to(ROOT.parent)}")


def cmd_check():
    """CI gate. Honest in both phases of U1."""
    spec = load_spec()
    pngs = committed_pngs()
    if not spec.get("captures"):
        problems = []
        if pngs:
            problems.append(f"captures committed but not in regions.json: {', '.join(pngs)}")
        if OUTPUT_FILE.exists():
            problems.append("measured-values.json exists but regions.json defines no captures")
        if problems:
            sys.exit("U1 half-state detected:\n  " + "\n  ".join(problems))
        print("check: no captures yet; no measured values claimed. Consistent.")
        return
    missing = [p for p in spec["captures"] if not (CAPTURES_DIR / p).is_file()]
    if missing:
        sys.exit(f"regions.json references missing captures: {', '.join(missing)}")
    if not OUTPUT_FILE.exists():
        sys.exit("captures + regions exist but measured-values.json is not committed. Run measure.py.")
    expected = render(measure_all(spec))
    if OUTPUT_FILE.read_text() != expected:
        sys.exit("measured-values.json does not reproduce from captures. Re-run measure.py and commit.")
    print("check: measured-values.json reproduces from captures.")


def cmd_self_test():
    """Prove the measurement code paths against a synthetic in-memory image."""
    img = Image.new("RGB", (200, 100), "#A4D7CD")
    draw = ImageDraw.Draw(img)
    draw.rectangle([100, 0, 199, 99], fill="#093893")
    draw.rectangle([140, 30, 179, 69], fill="#F45D22")

    left = dominant_palette(img, [0, 0, 100, 100], colors=4, top=2)
    assert left[0]["hex"] == "#A4D7CD" and left[0]["share"] == 1.0, left

    right = dominant_palette(img, [100, 0, 200, 100], colors=4, top=2)
    hexes = {s["hex"] for s in right}
    assert hexes == {"#093893", "#F45D22"}, right
    assert right[0]["hex"] == "#093893", right  # dominant by share

    bbox = color_range_bbox(img, [100, 0, 200, 100], "#F45D22", tolerance=8)
    assert bbox == {"x": 140, "y": 30, "width": 40, "height": 40}, bbox

    assert color_range_bbox(img, [0, 0, 100, 100], "#F45D22", tolerance=8) is None

    print("self-test: ok (palette extraction + color-range bbox)")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        cmd_self_test()
    elif args.check:
        cmd_check()
    else:
        cmd_measure()


if __name__ == "__main__":
    main()
