import { html, type LitElement } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Constructor } from "../../utils/constructor";
import { BaseComponent } from "../base-component";
import type { BaseSlotProps } from "./base-slot.types";

export const BaseSlot = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class BaseSlotTemplate extends BaseComponent(superClass) {

    protected slotTemplate(name?: string): unknown {
      return html` <slot name="${ifDefined(name)}"></slot> `;
    }

  }

  return BaseSlotTemplate as unknown as Constructor<BaseSlotProps> & T;
};
