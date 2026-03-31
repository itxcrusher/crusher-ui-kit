import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants as fsConstants, existsSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';

const THEMES = ['glass', 'minimal', 'futuristic', 'neobrutal', 'neumorph', 'brutal', 'bento'];
const MODES = ['light', 'dark'];
const VIEWPORTS = ['desktop', 'mobile'];
const SECTION_CONFIG = {
  home: { sizes: { desktop: '1600,1000', mobile: '430,1400' } },
  atoms: { review: 'atoms', hash: '#atoms', sizes: { desktop: '1600,1450', mobile: '430,1700' } },
  overlays: { review: 'overlays', hash: '#overlays', sizes: { desktop: '1600,1080', mobile: '430,1300' } },
  organisms: { review: 'organisms', hash: '#organisms', sizes: { desktop: '1600,1450', mobile: '430,1900' } },
  runtime: { review: 'runtime', hash: '#runtime', sizes: { desktop: '1600,1180', mobile: '430,1700' } }
};
const SECTION_NAMES = Object.keys(SECTION_CONFIG);
const PRESETS = {
  quick: [
    { section: 'home', themes: ['glass', 'minimal', 'neumorph'], modes: ['light', 'dark'] },
    { section: 'atoms', themes: ['minimal', 'neumorph'], modes: ['light'] },
    { section: 'runtime', themes: ['minimal'], modes: ['light', 'dark'] }
  ],
  balanced: [
    { section: 'home', themes: THEMES, modes: MODES },
    { section: 'atoms', themes: ['glass', 'minimal', 'neumorph', 'bento'], modes: MODES },
    { section: 'overlays', themes: ['glass', 'minimal', 'bento'], modes: MODES },
    { section: 'organisms', themes: ['glass', 'minimal', 'bento'], modes: MODES },
    { section: 'runtime', themes: ['glass', 'minimal', 'neumorph', 'bento'], modes: MODES }
  ],
  full: SECTION_NAMES.map((section) => ({ section, themes: THEMES, modes: MODES }))
};

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.CRUSHER_REVIEW_URL || 'http://127.0.0.1:4173/',
    outputDir: process.env.CRUSHER_REVIEW_OUTDIR || path.join(process.cwd(), '.tmp', 'review-matrix'),
    preset: process.env.CRUSHER_REVIEW_PRESET || 'balanced',
    viewport: process.env.CRUSHER_REVIEW_VIEWPORT || 'desktop',
    themes: null,
    modes: null,
    sections: null,
    budget: process.env.CRUSHER_REVIEW_BUDGET || '5500'
  };

  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [key, rawValue = ''] = arg.slice(2).split('=');
    switch (key) {
      case 'base-url':
        options.baseUrl = rawValue;
        break;
      case 'output':
        options.outputDir = rawValue;
        break;
      case 'preset':
        options.preset = rawValue;
        break;
      case 'themes':
        options.themes = rawValue.split(',').filter(Boolean);
        break;
      case 'viewport':
        options.viewport = rawValue;
        break;
      case 'modes':
        options.modes = rawValue.split(',').filter(Boolean);
        break;
      case 'sections':
        options.sections = rawValue.split(',').filter(Boolean);
        break;
      case 'budget':
        options.budget = rawValue;
        break;
      default:
        throw new Error(`Unknown option: --${key}`);
    }
  }

  return options;
}

function validateSubset(values, allowed, label) {
  if (!values) return null;
  const invalid = values.filter((value) => !allowed.includes(value));
  if (invalid.length) {
    throw new Error(`Unsupported ${label}: ${invalid.join(', ')}`);
  }
  return values;
}

function resolveEntries(options) {
  const themes = validateSubset(options.themes, THEMES, 'themes');
  const modes = validateSubset(options.modes, MODES, 'modes');
  const sections = validateSubset(options.sections, SECTION_NAMES, 'sections');

  if (sections) {
    const sectionThemes = themes || THEMES;
    const sectionModes = modes || MODES;
    const entries = [];
    for (const section of sections) {
      for (const theme of sectionThemes) {
        for (const mode of sectionModes) {
          entries.push({ section, theme, mode });
        }
      }
    }
    return entries;
  }

  const presetEntries = PRESETS[options.preset];
  if (!presetEntries) {
    throw new Error(`Unsupported preset: ${options.preset}`);
  }

  const entries = [];
  for (const entry of presetEntries) {
    const sectionThemes = entry.themes.filter((theme) => !themes || themes.includes(theme));
    const sectionModes = entry.modes.filter((mode) => !modes || modes.includes(mode));
    for (const theme of sectionThemes) {
      for (const mode of sectionModes) {
        entries.push({ section: entry.section, theme, mode });
      }
    }
  }
  return entries;
}

function resolveViewport(viewport) {
  if (!VIEWPORTS.includes(viewport)) {
    throw new Error(`Unsupported viewport: ${viewport}`);
  }
  return viewport;
}

function findBrowser() {
  const candidates = [];
  if (process.env.CHROME_BIN) candidates.push(process.env.CHROME_BIN);

  if (process.platform === 'win32') {
    candidates.push(
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    );
    for (const binary of ['chrome', 'msedge']) {
      try {
        const output = execFileSync('where.exe', [binary], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);
        candidates.push(...output);
      } catch {
        // ignore missing binary
      }
    }
  } else {
    candidates.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium'
    );
    for (const binary of ['google-chrome', 'chromium', 'chromium-browser', 'microsoft-edge']) {
      try {
        const output = execFileSync('which', [binary], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
        if (output) candidates.push(output);
      } catch {
        // ignore missing binary
      }
    }
  }

  return candidates.find((candidate) => candidate && existsSync(candidate));
}

function buildUrl(baseUrl, entry) {
  const config = SECTION_CONFIG[entry.section];
  const url = new URL(baseUrl);
  url.searchParams.set('capture', '1');
  url.searchParams.set('theme', entry.theme);
  url.searchParams.set('mode', entry.mode);
  if (config.review) url.searchParams.set('review', config.review);
  else url.searchParams.delete('review');
  url.hash = config.hash || '';
  return url.toString();
}

async function ensureUrlReachable(baseUrl) {
  const url = new URL(baseUrl);
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Review URL is not reachable: ${baseUrl} -> ${response.status}`);
  }
}

async function ensureFileWritten(outputFile) {
  await access(outputFile, fsConstants.R_OK);
}

function runCapture(browser, url, outputFile, size, budget) {
  return new Promise((resolve, reject) => {
    const child = spawn(browser, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--window-size=${size}`,
      `--virtual-time-budget=${budget}`,
      `--screenshot=${outputFile}`,
      url
    ], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', reject);
    child.on('close', async (code) => {
      if (code === 0) {
        try {
          await ensureFileWritten(outputFile);
          resolve({ stderr });
        } catch {
          reject(new Error(`Capture reported success but no screenshot was written for ${url}\nExpected: ${outputFile}\n${stderr}`));
        }
      } else {
        reject(new Error(`Capture failed (${code}) for ${url}\n${stderr}`));
      }
    });
  });
}

function timestampLabel(date = new Date()) {
  const parts = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    '-',
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0')
  ];
  return parts.join('');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const browser = findBrowser();
  if (!browser) {
    throw new Error('Could not find Chrome or Edge. Set CHROME_BIN to a local browser executable.');
  }

  options.outputDir = path.resolve(process.cwd(), options.outputDir);
  options.viewport = resolveViewport(options.viewport);

  await ensureUrlReachable(options.baseUrl);

  const entries = resolveEntries(options);
  if (!entries.length) {
    throw new Error('No captures selected. Check your preset or filters.');
  }

  const runDir = path.join(options.outputDir, timestampLabel());
  await mkdir(runDir, { recursive: true });
  const manifest = [];

  for (const [index, entry] of entries.entries()) {
    const config = SECTION_CONFIG[entry.section];
    const size = config.sizes[options.viewport];
    const fileName = `${String(index + 1).padStart(2, '0')}-${entry.section}-${entry.theme}-${entry.mode}.png`;
    const filePath = path.join(runDir, fileName);
    const url = buildUrl(options.baseUrl, entry);
    process.stdout.write(`[review-matrix] ${index + 1}/${entries.length} ${entry.section} ${entry.theme}/${entry.mode}\n`);
    await runCapture(browser, url, filePath, size, options.budget);
    manifest.push({
      ...entry,
      size,
      viewport: options.viewport,
      url,
      file: path.relative(process.cwd(), filePath)
    });
  }

  const manifestPath = path.join(runDir, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    browser,
    baseUrl: options.baseUrl,
    preset: options.preset,
    viewport: options.viewport,
    captures: manifest
  }, null, 2));

  await access(manifestPath, fsConstants.R_OK);
  process.stdout.write(`[review-matrix] wrote ${manifest.length} screenshots to ${runDir}\n`);
}

main().catch((error) => {
  console.error(`[review-matrix] ${error.message}`);
  process.exitCode = 1;
});
