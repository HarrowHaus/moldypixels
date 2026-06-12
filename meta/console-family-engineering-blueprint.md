# CONSOLE FAMILY — ENGINEERING BLUEPRINT
## 9999.css + reality.css · publishable frameworks · execution graph

This is the build-system and execution blueprint. Aesthetic law lives in the per-framework dossiers (9999css-dossier.md, realitycss-dossier.md); this document governs how the frameworks become real, publishable, testable software. No unit in this document is "done" until its acceptance check passes. Nothing here is decorative.

---

## 1. VERDICT ON THE PROPOSED COURSE

The proposed anatomy (tokens, reset, layout primitives, utilities, component-agnostic patterns, docs, templates; framework-agnostic CSS; boring tooling; acceptance gates; agent units) is correct. Corrections and additions encoded below:

1. **Monorepo from the start.** Two frameworks + shared tooling is the canonical pnpm-workspaces case.
2. **Cascade layers are the spine.** All source CSS is authored inside a fixed `@layer` order. This is what makes the framework override-friendly and conflict-free in any host app.
3. **Visual regression is the primary quality gate.** Agent-built CSS regresses silently without screenshot diffs.
4. **The class names are the public API.** They get a frozen contract, semver rules, and a deprecation path.
5. **Reference fidelity is a CI gate**, not a vibe: the measurement pipeline lives in-repo.

---

## 2. REPOSITORY ARCHITECTURE

```txt
console-css/                          (single monorepo, pnpm workspaces)
├── packages/
│   ├── 9999css/
│   ├── realitycss/
│   └── internal/
├── docs/
├── examples/
├── integrations/
├── reference/
├── .changeset/
└── .github/workflows/ci.yml
```

This copy is a repo-local working copy of the uploaded blueprint. The full source archive remains in `codexhandoff/Buildmoldypixels.zip`; extracted dossiers and visual targets live in `meta/` and `design-targets/` as Phase 1 artifacts.
