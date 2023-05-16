"use client";

import * as React from "react";
import { Dirty, Fields, FormValues, Touched } from "./types";

export type FormConfig<
  TValues extends FormValues,
  TKey extends keyof TValues
> = {
  initialValues: TValues;
  onSubmit: (values: TValues) => Promise<void>;
  onReset?: () => void;
  validators: Partial<Record<TKey, any>>;
};

export const useForm = <TValues extends FormValues = FormValues>({
  initialValues,
  onSubmit,
  onReset,
  validators,
}: FormConfig<TValues, keyof TValues>) => {
  const initialTouched = Object.keys(initialValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: false,
    }),
    {} as Touched<TValues>
  );
  const initialIsDirty = React.useMemo(
    () => ({ ...initialTouched }),
    [initialTouched]
  );
  const initialErrors = React.useMemo(
    () => ({ ...initialTouched }),
    [initialTouched]
  );

  // Consider switching to useReducer.
  const [values, setValues] = React.useState<TValues>(initialValues);

  // Move to reducer, & fire useEffect to initialize?
  const [touched, setTouched] = React.useState<Dirty<TValues>>(initialTouched);

  const [dirty, setDirty] = React.useState(initialIsDirty);

  const [errors, setErrors] = React.useState(initialErrors);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formError, setFormError] = React.useState<string | undefined>(
    undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setValues((prevValue) => ({
        ...prevValue,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const key = e.target.name;
    setTouched((prevValue) => ({
      ...prevValue,
      [key]: true,
    }));

    // Determine whether new value matches the initialValue.
    if (initialValues[key] !== values[key]) {
      setDirty((prevValue) => ({ ...prevValue, [key]: true }));
    }

    // Determine whether there are errors after the field changes.
    if (dirty[key] && validators?.[key]?.(values[key])) {
      setErrors((prevValue) => ({ ...prevValue, [key]: true }));
    }

    // Reset error if field is corrected.
    if (errors[key] && !validators?.[key]?.(values[key])) {
      setErrors((prevValue) => ({ ...prevValue, [key]: false }));
    }
  };

  const fields = Object.keys(initialValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        name: key,
        setValue: (value: string) =>
          setValues((prevValue) => ({ ...prevValue, [key]: value })),
        onChange: handleChange,
        onBlur: handleBlur,
        onReset: () => {
          setValues((prevValue) => ({
            ...prevValue,
            [key]: initialValues[key],
          }));
        },
        value: values[key],
        touched: touched[key],
        isDirty: dirty[key],
        error: errors[key],
      },
    }),
    {} as Fields<TValues>
  );

  return React.useMemo(
    () => ({
      fields,
      values,
      setValues,
      touched,
      onReset: () => {
        onReset?.();

        setValues(initialValues);
        setErrors(initialErrors);
        setTouched(initialTouched);
        setDirty(initialIsDirty);
        setFormError(undefined);
      },
      onSubmit: async (e: React.FormEvent) => {
        setFormError(undefined);
        setIsSubmitting(true);
        e.preventDefault();

        // We need to check for errors before submitting!
        Object.keys(validators).forEach((key) => {
          if (validators?.[key]?.(values[key])) {
            setErrors((prevValue) => ({ ...prevValue, [key]: true }));
          }
        });

        if (Object.values(errors).some((value) => value === true)) {
          setFormError("There are errors that need to be addressed!");
          setIsSubmitting(false);
          return;
          // throw new Error("There are errors that need to be addressed!");
        }

        await onSubmit(values);
        setIsSubmitting(false);
      },
      isSubmitting,
      formError,
    }),
    [
      fields,
      values,
      touched,
      isSubmitting,
      formError,
      onReset,
      initialValues,
      initialErrors,
      initialTouched,
      initialIsDirty,
      validators,
      errors,
      onSubmit,
    ]
  );
};

export default useForm;
