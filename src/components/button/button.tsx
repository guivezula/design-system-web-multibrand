import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import style from "./button.scss?inline";
import {
  ButtonMixin,
  type ButtonProps,
  type ButtonVariants,
} from "./button.types";
import { buttonVariants } from "./button.variants";

import "@components/loading";
import { cn } from "@utils/class-names";

const COMPONENT_NAME = "ds-button";

@customElement(COMPONENT_NAME)
export default class Button extends ButtonMixin {
  @property({ type: Boolean }) override disabled: boolean = false;
  @property({ type: Boolean }) override loading: boolean = false;
  @property({ type: String }) size: ButtonVariants["size"] = "lg";
  @property({ type: String }) variant: ButtonVariants["variant"] = "primary";
  @property({ type: String }) override ariaLabel: string | null = null;
  @property({ type: String }) override type: string = "button";
  @property({ type: String }) override role: string | null = null;

  static override readonly styles = [unsafeCSS(style)];

  private componentContent() {
    if (this.loading) {
      return html`<ds-loading />`;
    }

    return this.slotTemplate();
  }

  protected override componentClassMap(): unknown {
    return cn(
      buttonVariants({
        size: this.size,
        variant: this.variant,
        loading: this.loading,
      }),
    );
  }

  override render() {
    return this.componentTemplate(this.componentContent());
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-button": Button;
  }

  namespace React.JSX {
    interface IntrinsicElements {
      "ds-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > &
        ButtonProps;
    }
  }
}
