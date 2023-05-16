export type FormValues = Record<string, any>;

export type Field<TValues extends FormValues, TKey extends keyof TValues> = {
  name: TKey;
  setValue: (value: TValues[TKey]) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent) => void;
  onReset: () => void;
  value: TValues[TKey];
  touched: boolean;
  isDirty: boolean;
  error: boolean;
};

export type Fields<TValues extends FormValues> = {
  [TKey in keyof TValues]: Field<TValues, TKey>;
};

export type Touched<TValues extends FormValues> = {
  [TKey in keyof TValues]: boolean;
};

export type Dirty<TValues extends FormValues> = {
  [TKey in keyof TValues]: boolean;
};

export type Errors<TValues extends FormValues> = {
  [TKey in keyof TValues]: boolean;
};
