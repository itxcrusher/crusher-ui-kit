#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const expectedRootError =
  "crusher-ui-kit root import is browser-only. In Node/SSR, import 'crusher-ui-kit/runtime' and CSS/theme exports; load 'crusher-ui-kit' only on the client.";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, '../package.json'), 'utf8')
);

assert.equal(
  packageJson.dependencies?.lit,
  '^3.3.1',
  'Expected "lit" to be a runtime dependency for bundler consumers.'
);

const runtime = await import('crusher-ui-kit/runtime');

for (const key of [
  'closePalette',
  'getMode',
  'getTheme',
  'openPalette',
  'setDensity',
  'setMode',
  'setTheme',
  'showToast',
  'toggleMode',
  'togglePalette'
]) {
  assert.equal(typeof runtime[key], 'function', `Expected runtime export "${key}"`);
}

try {
  await import('crusher-ui-kit');
  assert.fail('Expected crusher-ui-kit root import to fail in Node.');
} catch (error) {
  assert.equal(error.message, expectedRootError);
}

const require = createRequire(import.meta.url);

try {
  require('crusher-ui-kit');
  assert.fail('Expected crusher-ui-kit root require to fail in Node.');
} catch (error) {
  assert.equal(error.message, expectedRootError);
}

const standalonePath = import.meta.resolve('crusher-ui-kit/standalone');
const themePath = import.meta.resolve('crusher-ui-kit/themes/glass.css');

assert.match(standalonePath, /crusher-ui\.standalone\.esm\.js$/);
assert.match(themePath, /themes[\\/]+glass\.css$/);

console.log('[package-contract] runtime exports, root guard, and package subpaths verified');
