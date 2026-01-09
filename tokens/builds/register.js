export default (StyleDictionary) => {
  StyleDictionary.registerTransform({
    type: "name",
    name: "parseNameToKebab",
    matcher: () => true,
    transformer: (token) => token.path.join("-"),
  });

  StyleDictionary.registerTransform({
    type: "value",
    name: "keepCSSValues",
    matcher: () => true,
    transformer: (token) => token.value,
  });

  const aliasToCSSVar = (token, dictionary) => {
    const { usesReference } = dictionary;
    let value = token;

    if (usesReference(token)) {
      value = value.replace(
        /({[^{]+(?=})})/g,
        (match) =>
          `var(--${match.substring(1, match.length - 1).replace(/\./g, "-")})`
      );
    }

    return value;
  };

  StyleDictionary.registerFormat({
    name: "createCSSThemeAlias",
    formatter: (dictionary, file, config) => {
      const { options } = config;
      const selector = options.selector ? ` ${options.selector}` : "";

      return (
        `:root${selector} {\n` +
        dictionary.allTokens
          .map(
            (token) =>
              `\t--${token.name}: ${aliasToCSSVar(
                token.original.value,
                dictionary
              )};`
          )
          .join("\n") +
        "\n}"
      );
    },
  });

  StyleDictionary.registerFormat({
    name: "createSASSMixins",
    formatter: (dictionary, file, config) => {
      return dictionary.allTokens
        .map((token) => {
          const aliasToCSSVar = (token, dictionary) => {
            const { usesReference } = dictionary;
            let value = token;

            if (usesReference(token)) {
              value = value.replace(
                /({[^{]+(?=})})/g,
                (match) =>
                  `var(--${match
                    .substring(1, match.length - 1)
                    .replace(/\./g, "-")})`
              );
            }

            return value;
          };

          const objValue = token.original.value;
          const tokenArgs = token.original.attributes.args;

          const replaceArg = (value) => {
            if (!tokenArgs) {
              return value;
            }

            let newValue = value;

            Object.keys(tokenArgs).forEach((arg) => {
              if (newValue.indexOf(`[:${arg}:]`) !== -1) {
                newValue = newValue.replace(
                  new RegExp(`(\\[:${arg}:\\])`, "g"),
                  `#{$${arg}}`
                );
              }
            });

            return newValue;
          };

          const createArgs = () => {
            if (!tokenArgs) {
              return;
            }

            let argsArray = [];

            for (const arg in tokenArgs) {
              const argDefault = tokenArgs[arg].default;
              const argType = tokenArgs[arg].type;

              let argString = `$${arg}`;
              if (argDefault) {
                argString = `${argString}: ${argDefault}`;
              }

              argsArray.push(argString);
            }

            return argsArray.join(", ");
          };

          let header = `@mixin ${token.name}`;
          if (tokenArgs) {
            header = header + ` (${createArgs()})`;
          }

          const stringValue = Object.keys(objValue).map(
            (attr) =>
              `\t${attr}: ${replaceArg(
                aliasToCSSVar(objValue[attr], dictionary)
              )};`
          );

          return header + ` {\n` + stringValue.join("\n") + "\n}";
        })
        .join("\n");
    },
  });

  StyleDictionary.registerFormat({
    name: "createIndex",
    formatter: (_, file, config) => {
      const { files } = file;
      const { options } = config;
      const isScss = options.format === "scss";
      const importKeyword = isScss ? "@forward" : "@import";

      const filesString = files
        .map((file) => {
          if (file.destination.indexOf("index") !== -1) {
            return undefined;
          }

          const fileDestination = file.destination;
          const optionsDestination = options.destination + "/";
          const optionsFormat = "." + options.format;

          const matchDestination = fileDestination.indexOf(optionsDestination);
          const matchFormat = fileDestination.indexOf(optionsFormat);

          if (matchDestination !== -1 && matchFormat !== -1) {
            const fileToImport = fileDestination.slice(
              matchDestination + optionsDestination.length
            );

            return `${importKeyword} "${fileToImport}";`;
          }
        })
        .filter((file) => file)
        .join("\n");

      return filesString;
    },
  });
};
