import { html, type LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Constructor } from "../../utils/constructor";
import { BaseInput } from "../base-input/base-input";
import type { BaseInputTextProps } from "./base-input-text.types";

export const BaseInputText = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class BaseInputTextTemplate extends BaseInput(superClass) {
    @property({ type: Boolean }) override disabled: boolean = false;
    @property({ type: String }) override id: string = "";
    @property({ type: String }) override value: string = "";
    @property({ type: String }) label: string = "";
    @property({ type: String }) placeholder: string = "";
    @property({ type: String }) supportText: string = "";
    @property({ type: Boolean }) error: boolean = false;

    protected wrapperTemplate(content?: unknown) {
      return html` <div
        data-testid=${this.componentTestId("__wrapper")}
        class="${this.componentClassMap("__wrapper")}"
        data-expanded=${this.value?.length > 0 || this.isFocused}
      >
        ${content}
      </div>`;
    }

    protected labelTemplate(content?: unknown) {
      return html` <label
        data-testid=${this.componentTestId("__label")}
        class="${this.componentClassMap("__label")}"
        for=${this.id}
        >${content}</label
      >`;
    }

    protected supportTextTemplate(content?: unknown) {
      return html` <div
        id=${`${this.id}-support-text`}
        data-testid=${this.componentTestId("__support-text")}
        class="${this.componentClassMap("__support-text")}"
        aria-live="polite"
      >
        ${content}
      </div>`;
    }

    protected componentTemplate(content?: unknown) {
      return html` <div
        class=${this.componentClassMap()}
        aria-disabled=${this.disabled}
      >
        ${content}
      </div>`;
    }

    protected inputTemplate() {
      return html` <input
        type="text"
        data-testid=${this.componentTestId("__input")}
        class="${this.componentClassMap("__input")}"
        .value=${this.value}
        id=${this.id}
        ?disabled=${this.disabled}
        aria-invalid=${this.error}
        placeholder=${this.placeholder}
        aria-describedby=${ifDefined(`${this.id}-support-text`)}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />`;
    }
  }

  return BaseInputTextTemplate as unknown as Constructor<BaseInputTextProps> &
    T;
};
