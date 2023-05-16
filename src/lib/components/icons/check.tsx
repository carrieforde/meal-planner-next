import cn from "classnames";
import { IconProps } from "./typings";

import s from "./icon.module.css";

export const Check: React.FC<IconProps> = ({ className }) => {
  const iconClasses = cn(s.icon, "icon", className);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={iconClasses}
    >
      <path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z" />
    </svg>
  );
};

export default Check;
