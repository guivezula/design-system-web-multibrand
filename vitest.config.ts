import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          alias: viteConfig.resolve?.alias,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./vitest.storybook.setup.ts"],
        },
      },
      {
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          alias: viteConfig.resolve?.alias,
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/**/*.stories.{ts,tsx}"],
          setupFiles: ["./vitest.unit.setup.ts"],
        },
      },
    ],
  },
});
