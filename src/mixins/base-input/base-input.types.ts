import type { BaseComponentProps } from "../base-component";

export declare class BaseInputProps extends BaseComponentProps {
  protected disabled: boolean;
  protected id: string;
  protected value: string;

  protected isFocused: boolean;

  protected handleInput(event: Event): void;
  protected handleChange(event: Event): void;
  protected handleFocus(event: Event): void;
  protected handleBlur(event: Event): void;

  protected inputTemplate(): unknown;
}
