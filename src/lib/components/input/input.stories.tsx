import { Meta, StoryObj } from "@storybook/react";
import { noop } from "lodash";
import { Input } from "./input";
import { Form } from "../form/form";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  decorators: [(Story) => <Form onSubmit={noop}>{Story()}</Form>],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    name: "firstName",
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
    value: "George Bluth",
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    error: true,
  },
};
