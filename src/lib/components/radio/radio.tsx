/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FieldContext,
  useField,
} from "lib/components/form-control/form-control";
import { Field, FormValues } from "lib/hooks/use-form/types";
import * as React from "react";
import cn from "classnames";

import s from "./radio.module.css";

export type RadioGroupProps = {
  label?: string;
  optional?: boolean;
  orientation?: "vertical" | "horizontal";
} & Field<FormValues, keyof FormValues>;

export const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
  label,
  optional,
  children,
  orientation = "vertical",
  ...field
}) => {
  const { error } = field;

  const wrapperClasses = cn("radio-group", s.fieldset, {
    [s.error]: error,
    [s.horizontal]: orientation === "horizontal",
  });

  return (
    <FieldContext.Provider value={field}>
      <fieldset className={wrapperClasses}>
        <legend className={s.legend}>
          {label}
          {optional && <span className={s.optional}>(optional)</span>}
        </legend>

        {children}

        {error && <p>This field is required.</p>}
      </fieldset>
    </FieldContext.Provider>
  );
};

export const Radio = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<RadioGroupProps & React.HTMLProps<HTMLInputElement>>
>(({ label, ...props }, ref) => {
  const {
    setValue,
    touched,
    isDirty,
    error,
    value: fieldValue,
    ...field
  } = useField();

  const inputClasses = cn("radio-input", s.input, {
    [s.checked]: fieldValue === props.value,
  });

  return (
    <label htmlFor={props.id ?? props.value} className={s.radio}>
      <input
        {...props}
        {...field}
        className={inputClasses}
        id={props.id ?? props.value}
        type="radio"
        ref={ref}
        checked={fieldValue === props.value}
      />
      <span className={s.labelInner}>{label}</span>
    </label>
  );
});

Radio.displayName = "Radio";
