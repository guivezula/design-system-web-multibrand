import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import { cn } from "@utils/class-names";
import style from "./loading.scss?inline";
import { LoadingMixin, type LoadingProps } from "./loading.types";

const COMPONENT_NAME = "ds-loading";

@customElement(COMPONENT_NAME)
export default class Loading extends LoadingMixin {
  static override readonly styles = [unsafeCSS(style)];

  protected override componentClassMap(subClass?: unknown): unknown {
    return cn(`${COMPONENT_NAME}${subClass ? `__${String(subClass)}` : ""}`);
  }

  override render() {
    return this.componentTemplate(
      html`${this.dotTemplate()} ${this.dotTemplate()} ${this.dotTemplate()}`,
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-loading": Loading;
  }

  namespace React.JSX {
    interface IntrinsicElements {
      "ds-loading": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > &
        LoadingProps;
    }
  }
}
