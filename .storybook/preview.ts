import type { Preview } from '@storybook/web-components-vite';
import { setTheme } from '../src/utils/themes';

const preview: Preview = {
  globalTypes: {
    themes: {
      name: "Themes",
      description: "Global theme for components",
      defaultValue: "brand_a|default",
      toolbar: {
        title: "Tema",
        icon: "globe",
        items: [
          {value: "brand_a|default", title: "Brand A", right: "default"},
          {
            value: "brand_b|default",
            title: "Brand B",
            right: "default",
          },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    backgrounds: {
      values: [
        {name: "light"},
        {name: "dark"},
      ],
    },
  },
  decorators: [
    (Story, Context) => {
      const bodyTag: HTMLElement = document.querySelector("body")!;

      // Get the theme parameters in Context to Set Theme
      const [brand, theme] = Context.globals.themes.split("|");
      const {name: mode} = Context.parameters.backgrounds.values.filter((bg: any) => {
        return Context.globals.backgrounds
          ? bg.value === Context.globals.backgrounds.value
          : false;
      })[0] || {name: "light"};

      setTheme(bodyTag, brand, theme, mode);

      return Story({theme, brand, mode});
    },
  ],
  
};

export default preview;