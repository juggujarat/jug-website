#!/usr/bin/env node
// Validates src/content before every build (npm "prebuild").
// Fails with a non-zero exit code and a readable list on any problem:
// dangling slug references, duplicate / non-kebab slugs, missing required
// fields, bad dates/times, image paths that don't exist in public/.

import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import * as content from '../src/content/index.js';
import { validateContent } from '../src/content/validate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
// Case-sensitive existence check: macOS is case-insensitive but Vercel (Linux)
// is not, so '/Sponsors/codelab.webp' must fail when the file is 'Codelab.webp'.
const dirCache = new Map();
const listDir = (dir) => {
  if (!dirCache.has(dir)) {
    try {
      dirCache.set(dir, new Set(readdirSync(dir)));
    } catch {
      dirCache.set(dir, new Set());
    }
  }
  return dirCache.get(dir);
};
const assetExists = (p) => {
  const segments = decodeURIComponent(p.split(/[?#]/)[0]).split('/').filter(Boolean);
  let dir = publicDir;
  for (const segment of segments) {
    if (!listDir(dir).has(segment)) return false;
    dir = path.join(dir, segment);
  }
  return segments.length > 0;
};

const problems = validateContent(content, { assetExists });

if (problems.length) {
  console.error(`\n✖ Content validation failed (${problems.length} problem${problems.length === 1 ? '' : 's'}):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nFix the records in src/content/ and re-run `npm run build`.\n');
  process.exit(1);
}

const counts = ['events', 'conferences', 'speakers', 'sessions', 'venues', 'sponsors', 'galleries']
  .map((k) => `${content[k].length} ${k}`)
  .join(', ');
console.log(`✓ Content valid: ${counts}`);
