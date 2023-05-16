import * as React from "react";

import cn from "classnames";

import { Field, FormValues } from "lib/hooks/use-form/types";

import s from "./select.module.css";

import { useField } from "../form-control/form-control";

export type SelectProps = Field<FormValues, keyof FormValues> &
  React.HTMLProps<HTMLSelectElement>;

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.PropsWithChildren<SelectProps>
>(({ children, ...props }, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setValue, touched, isDirty, error, ...field } = useField();
  const selectClasses = cn("select", s.select, {
    [s.error]: error,
  });

  return (
    <select
      {...props}
      {...field}
      ref={ref}
      className={selectClasses}
      placeholder="Select"
    >
      <option disabled value="">
        Select
      </option>
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;
