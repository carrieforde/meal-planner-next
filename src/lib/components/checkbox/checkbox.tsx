/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";

import cn from "classnames";

import { useField } from "lib/components/form-control/form-control";

import { Field, FormValues } from "lib/hooks/use-form/types";
import s from "./checkbox.module.css";

export type CheckboxProps = {
  label?: string;
} & Field<FormValues, keyof FormValues>;

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<CheckboxProps & React.HTMLProps<HTMLInputElement>>
>(({ label, ...props }, ref) => {
  const {
    setValue,
    touched,
    isDirty,
    error,
    value: fieldValue,
    ...field
  } = useField();

  const inputClasses = cn("checkbox-input", s.input, {
    [s.checked]: fieldValue,
  });

  return (
    <label htmlFor={props.id ?? props.value} className={s.checkbox}>
      <input
        {...props}
        {...field}
        id={props.id ?? props.value}
        type="checkbox"
        ref={ref}
        className={inputClasses}
      />
      <span>{label}</span>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
