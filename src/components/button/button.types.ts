import { BaseButton } from "@mixins/base-button";
import type { VariantProps } from "class-variance-authority";
import { LitElement } from "lit";
import type { buttonVariants } from "./button.variants";

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = Partial<HTMLButtonElement> &
  ButtonVariants & {
    disabled?: boolean;
  };

export const ButtonMixin = BaseButton(LitElement);
