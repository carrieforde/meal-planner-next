import { Meta, StoryFn } from "@storybook/react";
import { Button } from "../button/button";
import { AlertProps, AlertProvider, useAlert } from "./alert";

const meta: Meta<AlertProps> = {
  title: "Alert",
};

export default meta;

const Trigger = ({ variant, children, ...args }: AlertProps) => {
  const alert = useAlert();

  const handleClick = () => {
    alert[variant ?? "error"](children ?? "This is an alert", args);
  };

  return (
    <Button type="button" onClick={handleClick}>
      Show Alert
    </Button>
  );
};

export const Error: StoryFn<AlertProps> = ({ variant = "error", ...args }) => (
  <AlertProvider>
    <Trigger {...args} variant={variant} />
  </AlertProvider>
);

export const Info: StoryFn<AlertProps> = ({ variant = "info", ...args }) => (
  <AlertProvider>
    <Trigger {...args} variant={variant} />
  </AlertProvider>
);

export const Success: StoryFn<AlertProps> = ({
  variant = "success",
  ...args
}) => (
  <AlertProvider>
    <Trigger {...args} variant={variant} />
  </AlertProvider>
);

export const Warning: StoryFn<AlertProps> = ({
  variant = "warning",
  ...args
}) => (
  <AlertProvider>
    <Trigger {...args} variant={variant} />
  </AlertProvider>
);

export const Icon: StoryFn<AlertProps> = ({
  variant = "info",
  icon = "👋",
  ...args
}) => (
  <AlertProvider>
    <Trigger {...args} variant={variant} icon={icon} />
  </AlertProvider>
);
