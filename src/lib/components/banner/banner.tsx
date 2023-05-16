import cn from "classnames";

import * as React from "react";

import { Text } from "lib/components/text/text";
import s from "./banner.module.css";

type BannerVariant = "default" | "error" | "info" | "success" | "warning";

type BannerProps = React.PropsWithChildren<{
  variant?: BannerVariant;
  icon?: React.ReactNode;
}>;

type BannerIconProps = Pick<BannerProps, "variant">;

const BannerIcon: React.FC<React.PropsWithChildren<BannerIconProps>> = ({
  children,
  variant,
}) => {
  if (children) {
    return <Text component="span">{children}</Text>;
  }

  if (variant === "error") {
    return <Text component="span">🛑</Text>;
  }

  if (variant === "info") {
    return <Text component="span">ℹ️</Text>;
  }

  if (variant === "success") {
    return <Text component="span">✅</Text>;
  }

  if (variant === "warning") {
    return <Text component="span">⚠️</Text>;
  }

  return null;
};

export const Banner: React.FC<BannerProps> = ({ children, icon, variant }) => {
  const classes = cn("banner", s.banner, {
    ...(variant && { [s[variant]]: variant }),
  });

  return (
    <section className={classes}>
      <BannerIcon variant={variant}>{icon}</BannerIcon>
      {children}
    </section>
  );
};

export default Banner;
