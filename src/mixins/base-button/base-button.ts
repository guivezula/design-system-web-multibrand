import { bubbleEvent } from "@utils/bubble-event";
import { Constructor } from "@utils/constructor";
import { html, type LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { BaseSlot } from "../base-slot";
import type { BaseButtonProps } from "./base-button.types";

export const BaseButton = <T extends Constructor<LitElement>>(superClass: T) => {
  class BaseButtonTemplate extends BaseSlot(superClass) {
    @property({ type: Boolean }) disabled: boolean = false;
    @property({ type: Boolean }) loading: boolean = false;
    @property({ type: String }) override ariaLabel: string | null = null;
    @property({ type: String }) type: string = "button";

    protected shouldFormSubmit(event: Event) {
      const formElement = this.closest("form");
      if (formElement && this.type === "submit" && event.type === "click") {
        formElement.requestSubmit();
      }
    }

    protected handleClick(event: Event) {
      bubbleEvent(this, event, this.shadowRoot!.firstElementChild!);
      this.shouldFormSubmit(event);
      this.dispatchEvent(
        new CustomEvent("ds-click", {
          detail: { clicked: true },
          bubbles: true,
          composed: true,
          cancelable: true,
        }),
      );
    }

    protected override componentTemplate(content?: unknown): unknown {
      return html`<button
        class=${this.componentClassMap()}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.ariaLabel)}
        aria-busy=${this.loading}
        @click=${this.handleClick}
      >
        ${content}
      </button>`;
    }
  }

  return BaseButtonTemplate as unknown as Constructor<BaseButtonProps> & T;
};
