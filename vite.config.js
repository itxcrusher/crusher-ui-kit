/// <reference types="vitest/config" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  build: {
    lib: {
      // The entry point files for your library
      entry: resolve(__dirname, 'src/js/main.js'),
      name: 'CrusherUI',
      // The output formats. 'umd' is good for browser compatibility
      formats: ['es', 'umd'],
      fileName: (format) => format === 'umd' ? 'crusher-ui.min' : 'crusher-ui.esm'
    },
    // The output directory
    outDir: 'dist',
    // Minify the output for production
    minify: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Force the emitted CSS to a deterministic name
          if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'crusher-ui.min.css';
          return assetInfo.name || 'asset-[hash][extname]';
        },
        globals: {}
      }
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.js']
      }
    }]
  }
});