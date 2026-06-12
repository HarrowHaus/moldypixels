import { existsSync } from 'node:fs';

const required = [
  'packages/9999css/src/index.css',
  'packages/9999css/package.json',
  'packages/realitycss/src/index.css',
  'packages/realitycss/package.json',
  'packages/internal/build/build.mjs',
  'codexhandoff/Buildmoldypixels.zip'
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) throw new Error(`Missing U0 files: ${missing.join(', ')}`);

console.log('U0 smoke checks passed.');
