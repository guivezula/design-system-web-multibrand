import styleDictionary from "style-dictionary";
import { createFolderIndexes } from "./create-folder-indexes.js";
import { getPlatforms, getSource } from "./create-themes.js";
import register from "./register.js";

const brands = {
  brand_a: {
    themes: {
      default: {
        modes: ["light", "dark"],
      },
    },
  },
  brand_b: {
    themes: {
      default: {
        modes: ["light", "dark"],
      },
    },
  },
};

const generateBuilds = () => {
  const builds = [];

  Object.keys(brands).forEach((brandKey) => {
    const brand = brands[brandKey];
    Object.keys(brand.themes).forEach((themeKey) => {
      const theme = brand.themes[themeKey];
      theme.modes.forEach((mode) => {
        builds.push(
          styleDictionary.extend({
            source: getSource(brandKey, themeKey, mode),
            platforms: getPlatforms(brandKey, themeKey, mode),
          })
        );
      });
    });
  });

  return builds;
};

const buildAllPlatforms = () => {
  const builds = generateBuilds();
  builds.forEach((build) => {
    register(build);
    build.buildAllPlatforms();
  });

  createFolderIndexes(brands);
};

export {
  buildAllPlatforms
};

