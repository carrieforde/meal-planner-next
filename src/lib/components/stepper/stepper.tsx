import cn from "classnames";
import { useExpandCollapse } from "lib/hooks";
import expandCollapse from "lib/styles/expand-collapse.module.css";
import * as React from "react";
import { Button } from "../button/button";
import { Text } from "../text/text";
import s from "./stepper.module.css";

export type StepperProps = React.PropsWithChildren<{
  currentStep?: string;
  setCurrentStep?: React.Dispatch<React.SetStateAction<string>>;
}>;

type StepProps = React.PropsWithChildren<{
  title: string;
}>;

type StepNavigationProps = React.PropsWithChildren<{
  nextStep?: string;
  previousStep?: string;
}>;

interface StepperComposition {
  Step: React.FC<StepProps>;
  Navigation: React.FC<StepNavigationProps>;
}

const StepperContext = React.createContext<
  StepperProps & { totalSteps: number }
>({
  currentStep: undefined,
  setCurrentStep: undefined,
  totalSteps: 0,
});

const useSteps = () => {
  const { currentStep, setCurrentStep } = React.useContext(StepperContext);

  if (!currentStep) {
    throw new Error("`setCurrentStep` is required to use Steps!");
  }

  if (!setCurrentStep) {
    throw new Error("`setCurrentStep` is required to use Steps!");
  }

  return { currentStep, setCurrentStep };
};

export const Stepper: React.FC<StepperProps> & StepperComposition = ({
  children,
  currentStep,
  setCurrentStep,
}) => {
  const totalSteps = React.Children.count(children);

  const memoizedContext = React.useMemo(
    () => ({ currentStep, setCurrentStep, totalSteps }),
    [currentStep, setCurrentStep, totalSteps]
  );

  return (
    <StepperContext.Provider value={memoizedContext}>
      <ol className={s.steps}>{children}</ol>
    </StepperContext.Provider>
  );
};

const Step: React.FC<StepProps> = ({ children, title }) => {
  const stepRef = React.useRef<HTMLDivElement>(null);
  const { currentStep } = useSteps();
  const { expand, collapse } = useExpandCollapse();

  if (currentStep === title) {
    expand(stepRef);
  } else {
    collapse(stepRef);
  }

  return (
    <li>
      <Text variant="subtitle">{title}</Text>
      <div
        ref={stepRef}
        className={cn(expandCollapse.collapsed, {
          [expandCollapse.expanded]: currentStep === title,
        })}
      >
        {children}
      </div>
    </li>
  );
};

const Navigation: React.FC<StepNavigationProps> = ({
  children,
  nextStep,
  previousStep,
}) => {
  const { setCurrentStep } = useSteps();

  const setNextStep = React.useCallback(
    () => nextStep && setCurrentStep(nextStep),
    [nextStep, setCurrentStep]
  );

  const setPreviousStep = React.useCallback(
    () => previousStep && setCurrentStep(previousStep),
    [previousStep, setCurrentStep]
  );

  return (
    <div className={s.navigation}>
      {!children && nextStep && (
        <Button
          type="button"
          onClick={setNextStep}
          variant="filled"
          color="primary"
        >
          Next
        </Button>
      )}

      {children}

      {previousStep && (
        <Button type="button" onClick={setPreviousStep}>
          Go Back
        </Button>
      )}
    </div>
  );
};

Stepper.Step = Step;
Stepper.Navigation = Navigation;

export default Stepper;
