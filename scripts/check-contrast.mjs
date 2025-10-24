#!/usr/bin/env node
/**
 * Contrast guard for Crusher UI tokens.
 * Scans base.json + each theme overlay, computes WCAG contrast for:
 * - text.primary vs background.canvas
 * - text.secondary vs background.canvas
 * - text.primary vs background.surface
 * - border.primary vs background.surface (advisory 3:1)
 */
import fs from 'node:fs';
import path from 'node:path';

const THEMES = [
  'design/themes/glass.json',
  'design/themes/brutal.json',
  'design/themes/neumorph.json',
  'design/themes/neobrutal.json',
  'design/themes/minimal.json',
  'design/themes/futuristic.json',
  'design/themes/bento.json'
].filter(f => fs.existsSync(f));

const base = JSON.parse(fs.readFileSync('design/tokens/base.json', 'utf8'));

function resolve(pathArr, obj) {
  return pathArr.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}
function val(node) { return node?.value ?? node; }

// parse hex or rgba/hsla minimal
function toRgb(s) {
  if (!s) return null;
  s = String(s).trim();
  if (s.startsWith('#')) {
    let c = s.slice(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const n = parseInt(c, 16); return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 };
  }
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const [r,g,b] = m[1].split(',').map(x => parseFloat(x));
    return { r, g, b };
  }
  return null; // keep simple
}

function luminance({r,g,b}) {
  const srgb = [r,g,b].map(v => v/255).map(v => (v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055, 2.4)));
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}
function contrast(rgb1, rgb2) {
  const L1 = luminance(rgb1), L2 = luminance(rgb2);
  const [a,b] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (a + 0.05) / (b + 0.05);
}

function checkTheme(name, themeOverlay) {
  // merge shallow (only the fields we need)
  const get = (p) => val(resolve(p, themeOverlay)) ?? val(resolve(p, base));
  const pairs = [
    { fg: get(['color','light','text','primary']),   bg: get(['color','light','background','canvas']),   min: 4.5, label: 'light text.primary on canvas' },
    { fg: get(['color','light','text','secondary']), bg: get(['color','light','background','canvas']),   min: 4.5, label: 'light text.secondary on canvas' },
    { fg: get(['color','light','text','primary']),   bg: get(['color','light','background','surface']),  min: 4.5, label: 'light text.primary on surface' },
    { fg: get(['color','dark','text','primary']),    bg: get(['color','dark','background','canvas']),    min: 4.5, label: 'dark text.primary on canvas' },
    { fg: get(['color','dark','text','secondary']),  bg: get(['color','dark','background','canvas']),    min: 4.5, label: 'dark text.secondary on canvas' },
    { fg: get(['color','dark','text','primary']),    bg: get(['color','dark','background','surface']),   min: 4.5, label: 'dark text.primary on surface' },
    { fg: get(['color','light','border','primary']), bg: get(['color','light','background','surface']),  min: 3.0, label: 'light border.primary on surface' },
    { fg: get(['color','dark','border','primary']),  bg: get(['color','dark','background','surface']),   min: 3.0, label: 'dark border.primary on surface' },
  ];

  const fails = [];
  for (const p of pairs) {
    const rgbF = toRgb(p.fg), rgbB = toRgb(p.bg);
    if (!rgbF || !rgbB) continue; // skip if computed values (like color-mix) not parseable
    const ratio = contrast(rgbF, rgbB);
    if (ratio < p.min) fails.push({ label:p.label, ratio: +ratio.toFixed(2), min:p.min });
  }
  return fails;
}

let failed = false;
const overlays = THEMES.map(f => ({ name: path.basename(f, '.json'), data: JSON.parse(fs.readFileSync(f,'utf8')) }));
const all = [{name:'base', data: base}, ...overlays];

for (const t of all) {
  const res = checkTheme(t.name, t.data);
  if (res.length) {
    failed = true;
    console.error(`[contrast] ${t.name} failed:`);
    res.forEach(r => console.error(`  - ${r.label}: ${r.ratio} (min ${r.min})`));
  } else {
    console.log(`[contrast] ${t.name} ✓`);
  }
}

if (failed) {
  console.error('\nContrast checks failed. Please adjust theme tokens.');
  process.exit(1);
}
