import fs from "fs";
import path from "path";

const createDirectories = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createIndexFile = (dir, content) => {
  const filePath = path.join(dir, "index.css");
  fs.writeFileSync(filePath, content);
};

const generateContent = (modes) => {
  return `
${modes.map((mode) => `@import './${mode}/index.css';`).join("\n")}
@import '../../../../globals/index.css';
  `.trim();
};

const createFolderIndexes = (brands) => {
  Object.keys(brands).forEach((brandKey) => {
    const brand = brands[brandKey];
    Object.keys(brand.themes).forEach((themeKey) => {
      const theme = brand.themes[themeKey];
      const baseDir = path.join(
        "tokens",
        "styles",
        "brands",
        brandKey,
        "themes",
        themeKey
      );
      createDirectories(baseDir);
      const content = generateContent(theme.modes);
      createIndexFile(baseDir, content);
    });
  });
};

export {
  createFolderIndexes
};

