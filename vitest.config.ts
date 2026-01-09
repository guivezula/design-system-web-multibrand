import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["src/**/*.stories.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.tsx"],
      exclude: [
        "**/node_modules/**",
        "src/tokens/**",
        "src/utils/test/**",
        "src/components/**/index.ts",
        "src/components/**/styles/**",
        "**/*.stories.*",
      ],
    },
  },
});
