import { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  ChevronToggle as ToggleChevron,
  PlusMinusToggle as PlusMinus,
} from "lib/components";
import { useToggle } from "lib/hooks";
import { ToggleProps } from "./typings";

const meta: Meta = {
  title: "Toggles",
};

export default meta;

type Story = StoryObj<ToggleProps>;

export const ChevronToggle: Story = {
  render: () => {
    const [toggled, setToggled] = useToggle();

    return (
      <Button type="button" onClick={setToggled} variant="icon">
        <ToggleChevron toggled={toggled} />
      </Button>
    );
  },
};

export const PlusMinusToggle: Story = {
  render: () => {
    const [toggled, setToggled] = useToggle();

    return (
      <Button type="button" onClick={setToggled} variant="icon">
        <PlusMinus toggled={toggled} />
      </Button>
    );
  },
};
