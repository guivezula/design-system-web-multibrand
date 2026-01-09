
import BrandADefaultTheme from "../../tokens/styles/brands/brand_a/themes/default/index.css?inline";
import BrandBDefaultTheme from "../../tokens/styles/brands/brand_b/themes/default/index.css?inline";

const allThemes = {
  brand_a_default: BrandADefaultTheme,
  brand_b_default: BrandBDefaultTheme,
};

export function setTheme(
  elementRoot: HTMLElement,
  brand = "brand_a",
  theme = "default",
  mode = "light",
) {
  if (
    elementRoot.getAttribute("data-brand") === brand &&
    elementRoot.getAttribute("data-theme") === theme &&
    elementRoot.getAttribute("data-mode") === mode
  ) {
    return;
  }

  elementRoot.setAttribute("data-brand", brand);
  elementRoot.setAttribute("data-theme", theme);
  elementRoot.setAttribute("data-mode", mode);

  const headTag = document.querySelector("head");
  let dsTokensTag = document.querySelector("style#ds-tokens");
  if (!dsTokensTag) {
    dsTokensTag = document.createElement("style");
    dsTokensTag.setAttribute("id", "ds-tokens");
    headTag?.append(dsTokensTag);
  }

  dsTokensTag.innerHTML =
    allThemes[`${brand}_${theme}` as keyof typeof allThemes];
}
