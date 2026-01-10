import { cva } from "class-variance-authority";
import "./input-text.scss";

const inputTextVariants = 
  cva('ds-input-text', {
    variants: {
      disabled: {
        true: 'ds-input-text--disabled',
      },
      error: {
        true: 'ds-input-text--error',
      }
    },
  });

export { inputTextVariants };

