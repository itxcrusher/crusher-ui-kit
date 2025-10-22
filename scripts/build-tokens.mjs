// scripts/build-tokens.mjs
import StyleDictionary from 'style-dictionary';
import { themes, baseSource } from '../sd.themes.config.mjs';

console.log('[crusher-ui-kit] Building base tokens (ESM API)…');
const sd = new StyleDictionary('sd.config.js');
await sd.buildAllPlatforms();

console.log('[crusher-ui-kit] Building theme overlays…');
await Promise.all(
  themes.map(async (t) => {
    const sdTheme = new StyleDictionary({
      source: [baseSource, t.file],
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: 'src/css/themes/',
          files: [
            {
              destination: `${t.name}.css`,
              format: 'css/variables',
              options: { selector: `html[data-theme="${t.name}"]`, outputReferences: true }
            }
          ]
        }
      }
    });
    await sdTheme.buildAllPlatforms();
  })
);

console.log('[crusher-ui-kit] tokens + themes built ✓');
