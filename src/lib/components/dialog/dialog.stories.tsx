import { Meta, StoryObj } from "@storybook/react";
import { useOpenClose } from "lib/hooks/use-open-close/use-open-close";
import { Button } from "lib/components/button/button";
import { Text } from "lib/components/text/text";
import * as React from "react";
import { Dialog } from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "Surfaces/Dialog",
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  render: (args) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const { isOpen, open, close } = useOpenClose();

    const handleClose = () => {
      args.onClose?.();
      close();
    };

    return (
      <>
        <Button type="button" onClick={open} ref={buttonRef}>
          Open Dialog
        </Button>
        <Dialog
          {...args}
          isOpen={isOpen}
          onClose={handleClose}
          buttonRef={buttonRef}
        />
      </>
    );
  },
  args: {
    children: (
      <>
        <Dialog.Title component="h2">Dialog Title</Dialog.Title>
        <Dialog.Content>
          <Text variant="body2">This is the dialog content.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button type="button" variant="filled" color="primary">
            Confirm
          </Button>
        </Dialog.Actions>
      </>
    ),
    id: "primary-dialog",
    ariaLabelledby: "primary-dialog_title",
    ariaDescribedby: "primary-dialog_content",
  },
};

export const IsLoading: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    id: "is-loading-dialog",
    isLoading: true,
  },
};
