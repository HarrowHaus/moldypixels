import { mkdirSync, readFileSync, writeFileSync, existsSync, watch } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle, transform, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import * as esbuild from 'esbuild';

const repoRoot = fileURLToPath(new URL('../../..', import.meta.url));

// Blueprint §4 browser floor: last 2 evergreen versions + Safari >= 16.4.
const targets = browserslistToTargets(
  browserslist('last 2 chrome versions, last 2 firefox versions, last 2 edge versions, safari >= 16.4')
);

const packages = [
  { name: '9999css', feature: 'vmu', modes: ['pal.css'] },
  { name: 'realitycss', feature: 'expansion-pak', modes: ['hardware.css'] }
];

async function buildPackage(pkg) {
  const root = join(repoRoot, 'packages', pkg.name);
  const dist = join(root, 'dist');
  mkdirSync(join(dist, 'js'), { recursive: true });
  mkdirSync(join(dist, 'modes'), { recursive: true });

  const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
  const header = `/*! ${pkg.name} v${version} | MIT */\n`;
  const entry = join(root, 'src', 'index.css');

  const readable = bundle({ filename: entry, targets, minify: false });
  writeFileSync(join(dist, `${pkg.name}.css`), header + readable.code.toString());

  const min = bundle({ filename: entry, targets, minify: true, sourceMap: true, projectRoot: root });
  writeFileSync(
    join(dist, `${pkg.name}.min.css`),
    header + min.code.toString() + `\n/*# sourceMappingURL=${pkg.name}.min.css.map */\n`
  );
  writeFileSync(join(dist, `${pkg.name}.min.css.map`), min.map.toString());

  for (const mode of pkg.modes) {
    const src = join(root, 'src', 'modes', mode);
    if (!existsSync(src)) continue;
    const out = transform({ filename: src, code: readFileSync(src), targets, minify: false });
    writeFileSync(join(dist, 'modes', mode), header + out.code.toString());
  }

  const jsEntry = join(root, 'js', `${pkg.feature}.js`);
  if (existsSync(jsEntry)) {
    const shared = { entryPoints: [jsEntry], bundle: true, target: 'es2020', logLevel: 'silent' };
    await esbuild.build({ ...shared, format: 'esm', outfile: join(dist, 'js', `${pkg.feature}.js`) });
    await esbuild.build({
      ...shared,
      format: 'iife',
      globalName: pkg.feature.replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
      outfile: join(dist, 'js', `${pkg.feature}.iife.js`)
    });
  }
}

async function buildAll() {
  for (const pkg of packages) await buildPackage(pkg);
  console.log('build: ok');
}

await buildAll();

if (process.argv.includes('--watch')) {
  console.log('build: watching packages/*/{src,js}');
  let pending = null;
  for (const pkg of packages) {
    for (const dir of ['src', 'js']) {
      const path = join(repoRoot, 'packages', pkg.name, dir);
      if (!existsSync(path)) continue;
      watch(path, { recursive: true }, () => {
        clearTimeout(pending);
        pending = setTimeout(() => buildAll().catch((err) => console.error(err)), 50);
      });
    }
  }
}
