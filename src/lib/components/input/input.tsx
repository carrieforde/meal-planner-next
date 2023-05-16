import * as React from "react";
import cn from "classnames";

import { Field, FormValues } from "lib/hooks/use-form/types";

import s from "./input.module.css";
import { useField } from "../form-control/form-control";

export type InputProps = Field<FormValues, keyof FormValues> &
  React.HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { setValue, touched, isDirty, error, ...field } = useField();
    const inputClasses = cn("input", s.input, {
      [s.error]: error,
    });

    return (
      <input
        {...props}
        {...field}
        className={inputClasses}
        ref={ref}
        id={props.id ?? props.name}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
