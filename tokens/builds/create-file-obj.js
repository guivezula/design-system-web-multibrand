const createGlobalFileObj = (fileName) => ({
  destination: `globals/${fileName}.css`,
  format: "css/variables",
  filter: {
    attributes: {
      category: fileName,
    },
  },
});

const createThemeFileObj = (fileName, destination, brand, theme, mode) => ({
  destination: `${destination}/${fileName}.css`,
  format: "createCSSThemeAlias",
  options: {
    outputReferences: true,
    selector: `[data-brand="${brand}"][data-theme="${theme}"][data-mode="${mode}"]`,
  },
  filter: {
    attributes: {
      category: "alias",
      type: fileName,
    },
  },
});

const createThemeMixinFileObj = (fileName, elementState) => ({
  destination: `mixins/${fileName}.scss`,
  format: "createSASSMixins",
  options: {
    outputReferences: true,
    elementState,
  },
  filter: {
    attributes: {
      category: "alias",
      type: `mixin-${fileName}`,
    },
  },
});

const createIndexFileObj = (destination, format) => ({
  destination: `${destination}/index.${format}`,
  format: "createIndex",
  options: {
    destination,
    format,
  },
  filter: {
    attributes: {
      category: "index",
    },
  },
});

export {
  createGlobalFileObj, createIndexFileObj, createThemeFileObj,
  createThemeMixinFileObj
};

