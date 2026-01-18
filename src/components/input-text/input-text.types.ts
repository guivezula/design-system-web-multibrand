import { BaseInputText } from "@mixins/base-input-text";
import type { VariantProps } from "class-variance-authority";
import { LitElement } from "lit";
import type { inputTextVariants } from "./input-text.variants";

export type InputTextVariants = VariantProps<typeof inputTextVariants>;

export type InputTextProps = Partial<HTMLInputElement> &
  InputTextVariants & {
    label?: string;
    supportText?: string;
    placeholder?: string;
  };

export const InputTextMixin = BaseInputText(LitElement);
