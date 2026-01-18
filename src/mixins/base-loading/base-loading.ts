import { Constructor } from "@utils/constructor";
import { html, type LitElement } from "lit";
import { BaseComponent } from "../base-component";
import type { BaseLoadingProps } from "./base-loading.types";

export const BaseLoading = <T extends Constructor<LitElement>>(superClass: T) => {
  class BaseLoadingTemplate extends BaseComponent(superClass) {
    protected override componentTemplate(content?: unknown): unknown {
      return html`<div class=${this.componentClassMap()}>${content}</div>`;
    }

    protected dotTemplate(content?: unknown): unknown {
      return html`<span
        aria-hidden="true"
        class=${this.componentClassMap("dot")}
      >
        ${content}
      </span>`;
    }
  }

  return BaseLoadingTemplate as unknown as Constructor<BaseLoadingProps> & T;
};
