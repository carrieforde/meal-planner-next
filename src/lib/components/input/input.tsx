import cn from "classnames";
import * as React from "react";

import s from "./input.module.css";

export type InputProps = {
  error?: boolean;
} & React.HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, disabled, ...props }, ref) => {
    const inputClasses = cn(
      s.input,
      {
        [s.error]: error,
        [s.disabled]: disabled,
      },
      "input"
    );

    return (
      <input
        {...props}
        className={inputClasses}
        disabled={disabled}
        ref={ref}
        id={props.id ?? props.name}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
