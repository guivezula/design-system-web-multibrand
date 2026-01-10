import type { VariantProps } from "class-variance-authority";
import type { inputTextVariants } from "./input-text.variants";

export type InputTextVariants = Omit<VariantProps<typeof inputTextVariants>, "focused">;

export type InputTextProps = Partial<HTMLInputElement> & InputTextVariants & {
    label?: string;
    supportText?: string;
    placeholder?: string;
};
