import { type LitElement } from "lit";

import { Constructor } from "@utils/constructor";
import type { BaseComponentProps } from "./base-component.types";

export const BaseComponent = <T extends Constructor<LitElement>>(superClass: T) => {
  class BaseComponentTemplate extends superClass {
    static readonly styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
    ];
  }

  return BaseComponentTemplate as unknown as Constructor<BaseComponentProps> &
    T;
};
