import * as React from "react";

import s from "./form.module.css";

export type FormProps = React.PropsWithChildren<{
  onSubmit: (e: React.FormEvent) => void;
  onReset?: () => void;
}>;

type FormFieldsProps = React.PropsWithChildren;
type FormActionsProps = React.PropsWithChildren;

interface FormComposition {
  Fields: React.FC<FormFieldsProps>;
  Actions: React.FC<FormActionsProps>;
}

export const Form: React.FC<FormProps> & FormComposition = ({
  children,
  onSubmit,
  onReset,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(e);
  };

  return (
    <form className={s.form} onReset={onReset} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

const Fields: React.FC<FormFieldsProps> = ({ children }) => (
  <div className={s.fields}>{children}</div>
);

const Actions: React.FC<FormActionsProps> = ({ children }) => (
  <div className={s.actions}>{children}</div>
);

export default Form;

Form.Fields = Fields;
Form.Actions = Actions;
