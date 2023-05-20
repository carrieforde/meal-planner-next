import { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { useOpenClose } from "lib/hooks/use-open-close/use-open-close";
import { Button } from "lib/components/button/button";
import { Drawer } from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "Surfaces/Drawer",
  component: Drawer,
} as Meta;

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {
  render: (args) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const { isOpen, open, close } = useOpenClose();

    return (
      <div>
        <Button type="button" onClick={open} ref={buttonRef}>
          Open Drawer
        </Button>
        <Drawer
          {...args}
          buttonRef={buttonRef}
          isOpen={isOpen}
          onClose={close}
        />
      </div>
    );
  },
  args: {
    children: "Drawer Contents",
  },
};
