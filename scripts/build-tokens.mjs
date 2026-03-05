// scripts/build-tokens.mjs
import StyleDictionary from 'style-dictionary';
import baseConfig from '../sd.config.js';
import { themes, baseSource } from '../sd.themes.config.mjs';

console.log('[crusher-ui-kit] Building base tokens (ESM API)…');

// main base tokens build (sd.config.js handles root + modes)
const sd = new StyleDictionary({
  ...baseConfig,
  log: { ...(baseConfig.log ?? {}), warnings: 'error' }
});
await sd.buildAllPlatforms();

console.log('[crusher-ui-kit] Building theme overlays…');

// build each theme overlay separately
await Promise.all(
  themes.map(async (t) => {
    const sdTheme = new StyleDictionary({
      // Keep base tokens as include, theme as source to avoid collision warnings on intentional overrides.
      include: [baseSource],
      source: [t.file],
      log: { warnings: 'error' },
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: 'src/css/themes/',
          prefix: 'crusher', // keep all vars consistent
          files: [
            {
              destination: `${t.name}.css`,
              format: 'css/variables',
              options: {
                selector: `html[data-theme="${t.name}"]`,
                outputReferences: false // <== changed here
              }
            }
          ]
        }
      }
    });
    await sdTheme.buildAllPlatforms();
  })
);

console.log('[crusher-ui-kit] tokens + themes built ✓');
