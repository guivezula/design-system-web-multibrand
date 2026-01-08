import StyleDictionary from "style-dictionary";
import { createGlobalFileObj, createIndexFileObj } from "./create-file-obj.js";
import register from "./register.js";

const dictionary = StyleDictionary.extend({
  source: ["tokens/dictionary/globals/*.json"],
  platforms: {
    global: {
      options: {
        showFileHeader: false,
      },
      buildPath: "tokens/styles/",
      transforms: ["parseNameToKebab", "keepCSSValues"],
      files: [
        createGlobalFileObj("colors"),
        createGlobalFileObj("colors-rgb"),
        createGlobalFileObj("shape"),
        createGlobalFileObj("typography"),
        createGlobalFileObj("motion"),
        createIndexFileObj("globals", "css"),
      ],
    },
  },
});

register(dictionary);

export default dictionary;
