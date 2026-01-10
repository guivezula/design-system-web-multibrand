import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./button.variants";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = Partial<HTMLButtonElement> &
  ButtonVariants & {
    disabled?: boolean;
  };
