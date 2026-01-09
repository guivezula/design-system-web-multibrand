import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import { BaseLoading } from "../../mixins";
import { cn } from "../../utils/class-names";
import style from "./loading.scss?inline";
import type { LoadingProps } from "./loading.types";

const COMPONENT_NAME = "ds-loading";

@customElement(COMPONENT_NAME)
export default class Loading extends BaseLoading(LitElement) {
  static override readonly styles = [unsafeCSS(style)];

  protected override componentClassMap(subClass?: string): unknown {
    return cn(`${COMPONENT_NAME}${subClass ?? ""}`);
  }

  override render() {
    return this.componentTemplate(
      html`${this.dotTemplate()} ${this.dotTemplate()} ${this.dotTemplate()}`
    );
  }
}

declare global {
  const DS_LOADING = "ds-loading";
  interface HTMLElementTagNameMap {
    [DS_LOADING]: Loading;
  }

  namespace React.JSX {
    interface IntrinsicElements {
      [DS_LOADING]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > &
        LoadingProps;
    }
  }
}
