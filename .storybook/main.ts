import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from "vite";


const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/web-components-vite",
  viteFinal: async config => {
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "../../tokens/styles/mixins/index.scss";`,
            quietDeps: true,
          },
        },
      },
    });
  },
};
export default config;