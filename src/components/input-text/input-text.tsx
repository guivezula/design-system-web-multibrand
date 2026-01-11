import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { BaseInputText } from "../../mixins";
import { cn } from "../../utils/class-names";
import style from "./input-text.scss?inline";
import type { InputTextProps } from "./input-text.types";
import { inputTextVariants } from "./input-text.variants";

const COMPONENT_NAME = "ds-input-text";

@customElement(COMPONENT_NAME)
export default class InputText extends BaseInputText(LitElement) {
  @property({ type: Boolean }) override disabled: boolean = false;
  @property({ type: String }) override id: string = "";
  @property({ type: String }) override value: string = "";
  @property({ type: Boolean }) override error: boolean = false;
  @property({ type: String }) placeholder: string = "";
  @property({ type: String }) label: string = "";
  @property({ type: String }) supportText: string = "";

  static override readonly styles = [unsafeCSS(style)];

  protected override componentClassMap(subClass?: unknown): unknown {
    if (subClass) {
      return cn(`${COMPONENT_NAME}__${String(subClass)}`);
    }

    return cn(
      inputTextVariants({
        disabled: this.disabled,
        error: this.error,
      })
    );
  }

  protected componentTestId(subClass?: unknown): unknown {
    return `${COMPONENT_NAME}${subClass ? `__${String(subClass)}` : ""}`;
  }

  protected override componentTemplate(): unknown {
    return super.componentTemplate(html`
      ${this.wrapperTemplate(
        html` ${this.labelTemplate(this.label)} ${this.inputTemplate()} `
      )}
      ${this.supportTextTemplate(this.supportText)}
    `);
  }

  override render() {
    return this.componentTemplate();
  }
}

declare global {
  const DS_INPUT_TEXT = "ds-input-text";
  interface HTMLElementTagNameMap {
    [DS_INPUT_TEXT]: InputText;
  }

  namespace React.JSX {
    interface IntrinsicElements {
      [DS_INPUT_TEXT]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      > &
        InputTextProps;
    }
  }
}
