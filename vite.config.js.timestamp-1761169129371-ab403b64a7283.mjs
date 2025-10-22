// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///X:/personal/crusher-ui-kit/node_modules/vite/dist/node/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "file:///X:/personal/crusher-ui-kit/node_modules/@storybook/addon-vitest/dist/vitest-plugin/index.mjs";
var __vite_injected_original_dirname = "X:\\personal\\crusher-ui-kit";
var __vite_injected_original_import_meta_url = "file:///X:/personal/crusher-ui-kit/vite.config.js";
var dirname = typeof __vite_injected_original_dirname !== "undefined" ? __vite_injected_original_dirname : path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  build: {
    lib: {
      // The entry point files for your library
      entry: resolve(__vite_injected_original_dirname, "src/js/main.js"),
      name: "CrusherUI",
      // The output formats. 'umd' is good for browser compatibility
      formats: ["es", "umd"],
      fileName: (format) => format === "umd" ? "crusher-ui.min" : "crusher-ui.esm"
    },
    // The output directory
    outDir: "dist",
    // Minify the output for production
    minify: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) return "crusher-ui.min.css";
          return assetInfo.name || "asset-[hash][extname]";
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
          configDir: path.join(dirname, ".storybook")
        })
      ],
      test: {
        name: "storybook",
        browser: {
          enabled: true,
          headless: true,
          provider: "playwright",
          instances: [{
            browser: "chromium"
          }]
        },
        setupFiles: [".storybook/vitest.setup.js"]
      }
    }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJYOlxcXFxwZXJzb25hbFxcXFxjcnVzaGVyLXVpLWtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiWDpcXFxccGVyc29uYWxcXFxcY3J1c2hlci11aS1raXRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1g6L3BlcnNvbmFsL2NydXNoZXItdWkta2l0L3ZpdGUuY29uZmlnLmpzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3QvY29uZmlnXCIgLz5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBzdG9yeWJvb2tUZXN0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi12aXRlc3Qvdml0ZXN0LXBsdWdpbic7XG5jb25zdCBkaXJuYW1lID0gdHlwZW9mIF9fZGlybmFtZSAhPT0gJ3VuZGVmaW5lZCcgPyBfX2Rpcm5hbWUgOiBwYXRoLmRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcblxuLy8gTW9yZSBpbmZvIGF0OiBodHRwczovL3N0b3J5Ym9vay5qcy5vcmcvZG9jcy9uZXh0L3dyaXRpbmctdGVzdHMvaW50ZWdyYXRpb25zL3ZpdGVzdC1hZGRvblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIC8vIFRoZSBlbnRyeSBwb2ludCBmaWxlcyBmb3IgeW91ciBsaWJyYXJ5XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvanMvbWFpbi5qcycpLFxuICAgICAgbmFtZTogJ0NydXNoZXJVSScsXG4gICAgICAvLyBUaGUgb3V0cHV0IGZvcm1hdHMuICd1bWQnIGlzIGdvb2QgZm9yIGJyb3dzZXIgY29tcGF0aWJpbGl0eVxuICAgICAgZm9ybWF0czogWydlcycsICd1bWQnXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBmb3JtYXQgPT09ICd1bWQnID8gJ2NydXNoZXItdWkubWluJyA6ICdjcnVzaGVyLXVpLmVzbSdcbiAgICB9LFxuICAgIC8vIFRoZSBvdXRwdXQgZGlyZWN0b3J5XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgLy8gTWluaWZ5IHRoZSBvdXRwdXQgZm9yIHByb2R1Y3Rpb25cbiAgICBtaW5pZnk6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgLy8gRm9yY2UgdGhlIGVtaXR0ZWQgQ1NTIHRvIGEgZGV0ZXJtaW5pc3RpYyBuYW1lXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lICYmIGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcuY3NzJykpIHJldHVybiAnY3J1c2hlci11aS5taW4uY3NzJztcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWUgfHwgJ2Fzc2V0LVtoYXNoXVtleHRuYW1lXSc7XG4gICAgICAgIH0sXG4gICAgICAgIGdsb2JhbHM6IHt9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0ZXN0OiB7XG4gICAgcHJvamVjdHM6IFt7XG4gICAgICBleHRlbmRzOiB0cnVlLFxuICAgICAgcGx1Z2luczogW1xuICAgICAgLy8gVGhlIHBsdWdpbiB3aWxsIHJ1biB0ZXN0cyBmb3IgdGhlIHN0b3JpZXMgZGVmaW5lZCBpbiB5b3VyIFN0b3J5Ym9vayBjb25maWdcbiAgICAgIC8vIFNlZSBvcHRpb25zIGF0OiBodHRwczovL3N0b3J5Ym9vay5qcy5vcmcvZG9jcy9uZXh0L3dyaXRpbmctdGVzdHMvaW50ZWdyYXRpb25zL3ZpdGVzdC1hZGRvbiNzdG9yeWJvb2t0ZXN0XG4gICAgICBzdG9yeWJvb2tUZXN0KHtcbiAgICAgICAgY29uZmlnRGlyOiBwYXRoLmpvaW4oZGlybmFtZSwgJy5zdG9yeWJvb2snKVxuICAgICAgfSldLFxuICAgICAgdGVzdDoge1xuICAgICAgICBuYW1lOiAnc3Rvcnlib29rJyxcbiAgICAgICAgYnJvd3Nlcjoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgaGVhZGxlc3M6IHRydWUsXG4gICAgICAgICAgcHJvdmlkZXI6ICdwbGF5d3JpZ2h0JyxcbiAgICAgICAgICBpbnN0YW5jZXM6IFt7XG4gICAgICAgICAgICBicm93c2VyOiAnY2hyb21pdW0nXG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0dXBGaWxlczogWycuc3Rvcnlib29rL3ZpdGVzdC5zZXR1cC5qcyddXG4gICAgICB9XG4gICAgfV1cbiAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxxQkFBcUI7QUFMOUIsSUFBTSxtQ0FBbUM7QUFBd0gsSUFBTSwyQ0FBMkM7QUFNbE4sSUFBTSxVQUFVLE9BQU8scUNBQWMsY0FBYyxtQ0FBWSxLQUFLLFFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBRzFHLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQzFDLE1BQU07QUFBQTtBQUFBLE1BRU4sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLFdBQVcsUUFBUSxtQkFBbUI7QUFBQSxJQUM5RDtBQUFBO0FBQUEsSUFFQSxRQUFRO0FBQUE7QUFBQSxJQUVSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLGNBQWM7QUFFN0IsY0FBSSxVQUFVLFFBQVEsVUFBVSxLQUFLLFNBQVMsTUFBTSxFQUFHLFFBQU87QUFDOUQsaUJBQU8sVUFBVSxRQUFRO0FBQUEsUUFDM0I7QUFBQSxRQUNBLFNBQVMsQ0FBQztBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osVUFBVSxDQUFDO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUE7QUFBQTtBQUFBLFFBR1QsY0FBYztBQUFBLFVBQ1osV0FBVyxLQUFLLEtBQUssU0FBUyxZQUFZO0FBQUEsUUFDNUMsQ0FBQztBQUFBLE1BQUM7QUFBQSxNQUNGLE1BQU07QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFVBQVU7QUFBQSxVQUNWLFVBQVU7QUFBQSxVQUNWLFdBQVcsQ0FBQztBQUFBLFlBQ1YsU0FBUztBQUFBLFVBQ1gsQ0FBQztBQUFBLFFBQ0g7QUFBQSxRQUNBLFlBQVksQ0FBQyw0QkFBNEI7QUFBQSxNQUMzQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
