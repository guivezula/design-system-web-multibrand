import { cva } from "class-variance-authority";
import "./button.scss";

const buttonVariants = 
  cva('ds-button', {
    variants: {
      loading: {
        true: 'ds-button--loading',
      },
      size: {
        sm: 'ds-button--sm',
        lg: 'ds-button--lg',
      },
      variant: {
        primary: 'ds-button--primary',
        secondary: 'ds-button--secondary',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  });

export { buttonVariants };

