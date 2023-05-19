import * as React from "react";
import { createPortal } from "react-dom";

import cn from "classnames";
import { Text } from "../text/text";
import s from "./alert.module.css";

export type AlertProps = React.PropsWithChildren<{
  icon?: React.ReactNode;
  variant?: "error" | "info" | "warning" | "success";
}>;

export const Alert: React.FC<AlertProps> = ({ variant, children, icon }) => {
  const alertClasses = cn(s.alert, variant && [s[variant]], "alert");

  return createPortal(
    <div role="alert" className={alertClasses}>
      {icon}
      <Text variant="body2" component="span">
        {children}
      </Text>
    </div>,
    document.body
  );
};
