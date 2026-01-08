import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const colorsFilePath = (file) => path.join(__dirname, "globals", file);

function hexToRgbSequence(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `${r} ${g} ${b}`;
}

fs.readFile(colorsFilePath("colors.json"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const colors = JSON.parse(data);

  Object.keys(colors.color).forEach((color) => {
    Object.keys(colors.color[color]).forEach((shade) => {
      const hexValue = colors.color[color][shade].value;
      colors.color[color][`${shade}-rgb`] = {
        value: hexToRgbSequence(hexValue),
        attributes: { category: "colors-rgb" },
      };
      delete colors.color[color][shade];
    });
  });

  fs.writeFile(
    colorsFilePath("colors-rgb.json"),
    JSON.stringify(colors, null, 2),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
});
