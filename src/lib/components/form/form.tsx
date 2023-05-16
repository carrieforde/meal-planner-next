import * as React from "react";

import s from "./form.module.css";

export type FormProps = React.PropsWithChildren<{
  onSubmit: (e: React.FormEvent) => void;
  onReset?: () => void;
}>;

type FormActionsProps = React.PropsWithChildren;

interface FormComposition {
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

const Actions: React.FC<FormActionsProps> = ({ children }) => (
  <div className={s.actions}>{children}</div>
);

export default Form;

Form.Actions = Actions;
