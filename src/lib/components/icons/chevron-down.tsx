import * as React from "react";
import cn from "classnames";
import { IconProps } from "./typings";

import s from "./icon.module.css";

export const ChevronDown: React.FC<IconProps> = ({ fill, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={cn("icon", s.icon)}
    fill={fill}
    width={size}
  >
    <path d="M199 401c9.4 9.4 24.6 9.4 33.9 0L425 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L41 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L199 401z" />
  </svg>
);

export default ChevronDown;
