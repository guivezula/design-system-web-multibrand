import { createIndexFileObj, createThemeFileObj } from "./create-file-obj.js";

const getDestination = (brand, theme, mode) => {
  if (!!mode) {
    return `brands/${brand}/themes/${theme}/${mode}`;
  }

  return `brands/${brand}/themes/${theme}`;
};

const getSource = (brand, theme, mode) => {
  return [
    "tokens/dictionary/globals/*.json",
    `tokens/dictionary/brands/${brand}/themes/${theme}/${mode}/*.json`,
  ];
};

const getPlatforms = (brand, theme, mode) => {
  return {
    [`${brand}-${theme}-${mode}`]: {
      options: {
        showFileHeader: false,
      },
      buildPath: "tokens/dist/",
      transforms: ["parseNameToKebab", "keepCSSValues"],
      files: [
        createThemeFileObj(
          "text-color",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "primary",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "secondary",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "active",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "hover",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "disabled",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "negative",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "border",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "focus",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "text-styles",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createThemeFileObj(
          "font-family",
          getDestination(brand, theme, mode),
          brand,
          theme,
          mode
        ),
        createIndexFileObj(getDestination(brand, theme, mode), "css"),
      ],
    },
  };
};

export {
  getPlatforms, getSource
};

