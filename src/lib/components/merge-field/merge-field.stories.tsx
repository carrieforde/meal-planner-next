import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { MergeField, MergeFieldProvider } from "./merge-field";

const meta: Meta<typeof MergeField> = {
  title: "Utilities/Merge Field",
  component: MergeField,
  decorators: [
    (Story: StoryFn) => (
      <MergeFieldProvider
        data={{
          animal: "turtle",
        }}
      >
        <Story />
      </MergeFieldProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MergeField>;

export const Basic: Story = {
  args: {
    text: "I like {{animal}}s",
  },
};

export const NoDefault: Story = {
  args: {
    text: "I make {{adjective}} websites",
  },
};
export const WithDefault: Story = {
  args: {
    text: "I make {{adjective|React}} websites",
  },
};
