import StyleDictionary from "style-dictionary";
import { createIndexFileObj, createThemeMixinFileObj } from "./create-file-obj.js";
import register from "./register.js";

const dictionary = StyleDictionary.extend({
  source: [
    "tokens/dictionary/globals/*.json",
    "tokens/dictionary/mixins/*.json",
  ],
  platforms: {
    mixins: {
      options: {
        showFileHeader: false,
      },
      buildPath: "tokens/dist/",
      transforms: ["parseNameToKebab", "keepCSSValues"],
      files: [
        createThemeMixinFileObj("focus", "focus"),
        createThemeMixinFileObj("text-styles"),
        createIndexFileObj("mixins", "scss"),
      ],
    },
  },
});

register(dictionary);

export default dictionary;