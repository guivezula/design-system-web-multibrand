import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { BaseButton } from "../../mixins";
import { cn } from "../../utils/class-names";
import style from "./button.scss?inline";
import type { ButtonProps, ButtonVariants } from "./button.types";
import { buttonVariants } from "./button.variants";

import "./../loading";

const COMPONENT_NAME = "ds-button";

@customElement(COMPONENT_NAME)
export default class Button extends BaseButton(LitElement) {
  @property({ type: Boolean }) override disabled: boolean = false;
  @property({ type: Boolean }) override loading: boolean = false;
  @property({ type: String }) size: ButtonVariants["size"] = "lg";
  @property({ type: String }) variant: ButtonVariants["variant"] = "primary";
  @property({ type: String }) override ariaLabel: string | null = null;
  @property({ type: String }) override type: string = "button";
  @property({ type: String}) override role: string | null = null;

  @state() child!: Element | null;

  static override readonly styles = [unsafeCSS(style)];

  private componentContent() {
    if (this.loading) {
      return html`<ds-loading />`;
    }

    return this.slotTemplate();
  }

  protected override componentClassMap(): unknown {
    return cn(buttonVariants({ size: this.size, variant: this.variant, loading: this.loading }));
  }

  shouldFormSubmit(event: Event): void {
    super.shouldFormSubmit(event);
  }

  handleClick(event: Event): void {
    super.handleClick(event);
  }

  override render() {
    return this.componentTemplate(this.componentContent());
  }
}

declare global {
  const DS_BUTTON = "ds-button";
  interface HTMLElementTagNameMap {
    [DS_BUTTON]: Button;
  }

  namespace React.JSX {
    interface IntrinsicElements {
      [DS_BUTTON]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > &
        ButtonProps;
    }
  }
}
