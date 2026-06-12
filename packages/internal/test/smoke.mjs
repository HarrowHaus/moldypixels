import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../..', import.meta.url));
const failures = [];
const LAYER_ORDER = '@layer reset, tokens, base, primitives, components, utilities;';

for (const name of ['9999css', 'realitycss']) {
  const root = join(repoRoot, 'packages', name);

  const indexCss = join(root, 'src', 'index.css');
  if (!existsSync(indexCss)) {
    failures.push(`${name}: missing src/index.css`);
  } else {
    const firstLine = readFileSync(indexCss, 'utf8').trimStart().split('\n')[0].trim();
    if (firstLine !== LAYER_ORDER) {
      failures.push(`${name}: src/index.css must open with the locked layer order "${LAYER_ORDER}"`);
    }
  }

  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

  // Blueprint §7 gate: core packages have zero runtime dependencies.
  if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
    failures.push(`${name}: core package must have zero dependencies, found ${Object.keys(pkg.dependencies).join(', ')}`);
  }

  // Every exports path must exist after a build.
  for (const [key, value] of Object.entries(pkg.exports)) {
    const paths = typeof value === 'string' ? [value] : Object.values(value);
    for (const rel of paths) {
      if (!existsSync(join(root, rel))) {
        failures.push(`${name}: exports["${key}"] -> ${rel} does not exist (run pnpm build first)`);
      }
    }
  }

  // Every files entry ships with the tarball and must exist.
  for (const entry of pkg.files ?? []) {
    if (!existsSync(join(root, entry))) {
      failures.push(`${name}: files entry "${entry}" does not exist`);
    }
  }
}

if (failures.length) {
  console.error('U0 smoke checks failed:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log('U0 smoke checks passed.');
