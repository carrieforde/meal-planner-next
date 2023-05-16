"use client";

import { Button } from "lib/components/button/button";
import { XMark } from "lib/components/icons/x-mark";
import { Text, TextProps } from "lib/components/text/text";
import * as React from "react";
import { createPortal } from "react-dom";
import s from "lib/styles/utilities.module.css";
import cn from "classnames";
import { Spinner } from "lib/components/spinner/spinner";
import styles from "./dialog.module.css";

type DialogContextProps = {
  isLoading?: boolean;
  ariaLabelledby: string;
  ariaDescribedby: string;
};

const DialogContext = React.createContext<DialogContextProps>({
  isLoading: false,
  ariaLabelledby: "",
  ariaDescribedby: "",
});

const useDialog = () => React.useContext(DialogContext);

export type DialogProps = DialogContextProps & {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
} & React.HTMLProps<HTMLDivElement>;

type DialogTitleProps = React.PropsWithChildren<
  Pick<TextProps, "className" | "component">
>;

type DialogContentProps = React.PropsWithChildren;

type DialogActionsProps = React.PropsWithChildren;

interface DialogComposition {
  Title: React.FC<DialogTitleProps>;
  Content: React.FC<DialogContentProps>;
  Actions: React.FC<DialogActionsProps>;
}

export const Dialog: React.FC<React.PropsWithChildren<DialogProps>> &
  DialogComposition = ({
  ariaDescribedby,
  ariaLabelledby,
  buttonRef,
  children,
  isOpen,
  onClose,
  isLoading,
  ...props
}) => {
  const className = cn("dialog", styles.dialog);

  const memoizedContextValues = React.useMemo(
    () => ({
      ariaDescribedby,
      ariaLabelledby,
      isLoading,
    }),
    [ariaDescribedby, ariaLabelledby, isLoading]
  );

  React.useEffect(() => {
    document.body.addEventListener(
      "click",
      (e: React.MouseEvent<HTMLElement>) => {
        if (e.target.classList.contains(styles.body)) {
          onClose();
          buttonRef.current?.focus();
        }
      }
    );

    document.body.addEventListener("keyup", (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        buttonRef.current?.focus();
      }
    });

    return () => {
      document.body.removeEventListener("click", onClose);
      document.body.removeEventListener("keyup", onClose);
    };
  }, [buttonRef, onClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.body);
    }

    if (!isOpen && document.body.classList.contains(styles.body)) {
      document.body.classList.remove(styles.body);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <DialogContext.Provider value={memoizedContextValues}>
      {createPortal(
        <div
          {...props}
          className={className}
          role="dialog"
          aria-modal="true"
          aria-describedby={ariaDescribedby}
          aria-labelledby={ariaLabelledby}
        >
          <Button
            className={styles.closeButton}
            variant="icon"
            type="button"
            onClick={onClose}
          >
            <Text className={s.srOnly}>Close</Text>
            <XMark />
          </Button>
          {children}
        </div>,
        document.body
      )}
    </DialogContext.Provider>
  );
};

export default Dialog;

const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  component,
  className,
}) => {
  const { ariaLabelledby } = useDialog();

  return (
    <Text
      variant="subtitle"
      className={cn(styles.title, className)}
      component={component}
      id={ariaLabelledby}
    >
      {children}
    </Text>
  );
};

const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  const { isLoading, ariaDescribedby } = useDialog();
  const className = cn(styles.content, {
    [styles.isLoading]: isLoading,
  });

  return (
    <div className={className} id={ariaDescribedby}>
      {isLoading ? <Spinner size="medium" color="primary" /> : children}
    </div>
  );
};

const DialogActions: React.FC<DialogActionsProps> = ({ children }) => {
  const { isLoading } = useDialog();

  if (isLoading) {
    return null;
  }

  return <div className={cn(styles.actions)}>{children}</div>;
};

Dialog.Title = DialogTitle;
Dialog.Content = DialogContent;
Dialog.Actions = DialogActions;
