import { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {
    children: "This is an alert",
  },
};

export const Icon: Story = {
  ...Primary,
  args: {
    icon: "⚠️",
  },
};
