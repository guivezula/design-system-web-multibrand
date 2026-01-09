import type { BaseSlotProps } from "../base-slot";

export declare class BaseButtonProps extends BaseSlotProps {
  protected disabled: boolean;
  protected loading: boolean;
  protected ariaLabel: string | null;
  protected type: string;

  protected shouldFormSubmit(event: Event): void;
  protected handleClick(event: Event): void;
}
