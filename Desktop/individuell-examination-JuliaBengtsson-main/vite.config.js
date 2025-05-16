import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /* resolve: {
    alias: {
      'msw/browser': 'msw/browser.js',
    },
  }, */
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.js", // korrekt path
    provider: "v8",
    coverage: {
      reporter: ["text", "json", "lcov", "json-summary"],
      all: true,
      include: ["src/**/*.jsx"],
      exclude: [
        "node_modules",
        "src/app.jsx",
        "src/router.jsx",
        "src/main.jsx",
      ],
    },
  },
});
