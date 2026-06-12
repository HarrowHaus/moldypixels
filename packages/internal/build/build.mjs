import { mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const packages = [
  { name: '9999css', feature: 'vmu', modes: ['pal.css'] },
  { name: 'realitycss', feature: 'expansion-pak', modes: ['hardware.css'] }
];

function inlineImports(file, seen = new Set()) {
  if (seen.has(file)) return '';
  seen.add(file);
  const dir = dirname(file);
  const input = readFileSync(file, 'utf8');
  return input.replace(/@import\s+["'](.+?)["'];/g, (_, rel) => inlineImports(join(dir, rel), seen));
}

function minify(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').trim() + '\n';
}

for (const pkg of packages) {
  const root = join('packages', pkg.name);
  const dist = join(root, 'dist');
  mkdirSync(join(dist, 'js'), { recursive: true });
  mkdirSync(join(dist, 'modes'), { recursive: true });

  const css = inlineImports(join(root, 'src', 'index.css'));
  const header = `/*! ${pkg.name} | MIT | U0 scaffold */\n`;
  writeFileSync(join(dist, `${pkg.name}.css`), header + css);
  writeFileSync(join(dist, `${pkg.name}.min.css`), header + minify(css));

  for (const mode of pkg.modes) {
    const src = join(root, 'src', 'modes', mode);
    if (existsSync(src)) copyFileSync(src, join(dist, 'modes', mode));
  }

  const jsPath = join(root, 'js', `${pkg.feature}.js`);
  if (existsSync(jsPath)) {
    const source = readFileSync(jsPath, 'utf8');
    writeFileSync(join(dist, 'js', `${pkg.feature}.js`), source);
    writeFileSync(join(dist, 'js', `${pkg.feature}.iife.js`), `(() => {\n${source}\n})();\n`);
  }
}

console.log('U0 build scaffold complete.');
