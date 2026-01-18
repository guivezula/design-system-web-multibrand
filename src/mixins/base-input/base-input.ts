import { bubbleEvent } from "@utils/bubble-event";
import { Constructor } from "@utils/constructor";
import { type LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { BaseComponent } from "../base-component";
import type { BaseInputProps } from "./base-input.types";

export const BaseInput = <T extends Constructor<LitElement>>(superClass: T) => {
  class BaseInputTemplate extends BaseComponent(superClass) {
    @property({ type: Boolean }) disabled: boolean = false;
    @property({ type: String }) id: string = "";
    @property({ type: String }) value: string = "";

    @state() protected isFocused: boolean = false;

    protected handleInput(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.value = target?.value;

      bubbleEvent(this, event, target as Element);
      this.dispatchEvent(
        new CustomEvent("ds-input", {
          detail: { value: this.value },
          bubbles: true,
          cancelable: true,
        }),
      );
    }

    protected handleChange(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.value = target?.value;

      bubbleEvent(this, event, target as Element);
      this.dispatchEvent(
        new CustomEvent("ds-change", {
          detail: { value: this.value },
          bubbles: true,
          cancelable: true,
        }),
      );
    }

    protected handleFocus(event: Event): void {
      this.isFocused = true;
      const target = event.target as HTMLInputElement;
      this.value = target?.value;

      bubbleEvent(this, event, target as Element);
      this.dispatchEvent(
        new CustomEvent("ds-focus", {
          detail: { focused: this.isFocused },
          bubbles: true,
          cancelable: true,
        }),
      );
    }

    protected handleBlur(event: Event): void {
      this.isFocused = false;
      const target = event.target as HTMLInputElement;
      this.value = target?.value;

      bubbleEvent(this, event, target as Element);
      this.dispatchEvent(
        new CustomEvent("ds-blur", {
          detail: { focused: this.isFocused },
          bubbles: true,
          cancelable: true,
        }),
      );
    }
  }

  return BaseInputTemplate as unknown as Constructor<BaseInputProps> & T;
};
