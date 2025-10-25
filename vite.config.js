// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(dirname, 'src/js/main.js'),
      name: 'CrusherUI',
      formats: ['es', 'umd'],
      fileName: (format) =>
        format === 'umd' ? 'crusher-ui.min.js' : 'crusher-ui.esm.js'
    },
    outDir: 'dist',
    minify: true,
    sourcemap: true,
    rollupOptions: {
      external: ['lit', /^lit\//],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css'))
            return 'crusher-ui.min.css';
          return assetInfo.name || 'asset-[hash][extname]';
        },
        globals: { lit: 'Lit' }
      }
    }
  }
});
