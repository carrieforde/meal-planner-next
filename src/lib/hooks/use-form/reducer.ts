/* eslint-disable */

import { useCallback, useReducer } from "react";
import { Dirty, Errors, FormValues, Touched } from "./types";

type FormReducerState<TValues extends FormValues> = {
  values: TValues;
  touched: Touched<TValues>;
  dirty: Dirty<TValues>;
  errors: Errors<TValues>;
};

enum FormActionTypes {
  SET_VALUE = "SET_VALUE",
  SET_TOUCHED = "SET_TOUCHED",
  SET_DIRTY = "SET_DIRTY",
  SET_ERRORS = "SET_ERRORS",
  RESET = "RESET",
}

type FormActions<TValues extends FormValues, TKey extends keyof TValues> = {
  type: FormActionTypes;
  payload: {
    name: [TKey];
    value: any;
  };
};

function initializeForm<TValues extends FormValues>(
  initialValues: TValues
): FormReducerState<TValues> {
  const booleanObject = Object.keys(initialValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: false,
    }),
    {}
  );

  return {
    values: initialValues,
    touched: { ...booleanObject } as Touched<TValues>,
    dirty: { ...booleanObject } as Dirty<TValues>,
    errors: { ...booleanObject } as Errors<TValues>,
  };
}

function formReducer<TValues extends FormValues>(
  state: FormReducerState<TValues>,
  action: FormActions<TValues, keyof TValues>
): FormReducerState<TValues> {
  const { name, value } = action.payload;

  switch (action.type) {
    case FormActionTypes.SET_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [name as unknown as string]: action.payload.value,
        },
      };

    default:
      return state;
  }
}

const useFormReducer = <TValues extends FormValues = FormValues>(
  initialValues: TValues
) => {
  const [values, dispatch] = useReducer(
    formReducer,
    initializeForm(initialValues)
  );

  const setValue = useCallback((name: keyof TValues, value: any) => {
    dispatch({
      type: FormActionTypes.SET_VALUE,
      payload: {
        name: name as string,
        value,
      },
    });
  }, []);

  return {
    values,
  };
};
