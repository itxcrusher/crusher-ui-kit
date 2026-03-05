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
      name: 'CrusherUIStandalone',
      formats: ['es'],
      fileName: () => 'crusher-ui.standalone.esm.js'
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css'))
            return 'crusher-ui.standalone.min.css';
          return assetInfo.name || 'asset-[hash][extname]';
        }
      }
    }
  }
});
