import { SpinnerThird } from "lib/components/icons";
import * as React from "react";

import cn from "classnames";
import s from "./spinner.module.css";

type SpinnerSize = "small" | "medium" | "large";
type SpinnerColor = "default" | "primary" | "secondary";

type SpinnerProps = {
  size?: SpinnerSize;
  color?: SpinnerColor;
};

export const Spinner: React.FC<SpinnerProps> = ({ color, size }) => {
  const className = cn("spinner", s.spinner, {
    ...(color && { [s[color]]: color }),
    ...(size && { [s[size]]: size }),
  });

  return (
    <span className={className}>
      <SpinnerThird fill="currentColor" />
    </span>
  );
};

export default Spinner;
