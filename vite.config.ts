import fs from "fs";
import path from "path";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// @ts-ignore
import svg from "vite-plugin-svgstring";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexFile = path.resolve(__dirname, "src/index.ts");
const components = fs.readdirSync(path.resolve(__dirname, "src/components/"));

if (fs.existsSync(indexFile)) {
  fs.unlinkSync(indexFile);
}

fs.mkdirSync("./dist/types", { recursive: true });

const exportComponents = components
  .map((component) => `export * from "./components/${component}";`)
  .join("\n");

fs.writeFileSync(indexFile, exportComponents);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svg(),
    dts({
      rollupTypes: true,
      outDir: "./dist/types",
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@tokens/mixins/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
      },
      {
        find: "@utils",
        replacement: fileURLToPath(new URL("./src/utils", import.meta.url)),
      },
      {
        find: "@tokens",
        replacement: fileURLToPath(new URL("./tokens/dist", import.meta.url)),
      },
      {
        find: "@mixins",
        replacement: fileURLToPath(new URL("./src/mixins", import.meta.url)),
      },
    ],
  },
  build: {
    emptyOutDir: false,
    outDir: "dist",
    lib: {
      entry: ["src/index.ts"],
      name: "design-system-web-multibrand",
      formats: ["es", "umd"],
      fileName: (format) => `ds-multibrand.${format}.js`,
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        globals: {
          lit: "Lit",
          "lit/decorators.js": "LitDecorators",
          "lit/directives/if-defined.js": "LitDirectives",
        },
      },
    },
    manifest: true,
    ssrManifest: true,
    copyPublicDir: false,
  },
});
