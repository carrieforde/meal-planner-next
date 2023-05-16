import * as React from "react";
import { createPortal } from "react-dom";

import s from "./alert.module.css";

type AlertProps = {
  icon?: React.ReactNode;
};

export const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  children,
  icon,
}) =>
  createPortal(
    <div role="alert" className={s.alert}>
      {icon}
      <span>{children}</span>
    </div>,
    document.body
  );
