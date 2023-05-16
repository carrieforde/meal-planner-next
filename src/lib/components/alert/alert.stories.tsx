import { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  render: ({ icon }) => <Alert icon={icon}>This is an alert</Alert>,
};

export const Icon: Story = {
  ...Primary,
  args: {
    icon: "⚠️",
  },
};
