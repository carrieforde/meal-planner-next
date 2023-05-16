import { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Stepper } from "./stepper";

const meta: Meta<typeof Stepper> = {
  title: "Content/Stepper",
  component: Stepper,
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Primary: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = React.useState("Gather Ingredients");

    return (
      <Stepper
        {...args}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    );
  },
  args: {
    children: [
      <Stepper.Step key="1" title="Gather Ingredients">
        Do the thing.
        <Stepper.Navigation nextStep="Spread 'em" />
      </Stepper.Step>,
      <Stepper.Step key="2" title="Spread 'em">
        add pb&j to sandwich
        <Stepper.Navigation previousStep="Gather Ingredients" />
      </Stepper.Step>,
    ],
  },
};
