import * as React from "react";
import cn from "classnames";
import { IconProps } from "./typings";

import s from "./icon.module.css";

export const Plus: React.FC<IconProps> = ({ fill, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={cn("icon", s.icon)}
    fill={fill}
    width={size}
  >
    <path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z" />
  </svg>
);

export default Plus;
