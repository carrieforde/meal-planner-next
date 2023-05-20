"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import cn from "classnames";
import { Text } from "../text/text";
import s from "./alert.module.css";

type AlertVariant = "error" | "info" | "warning" | "success";
export type AlertProps = React.PropsWithChildren<{
  isOpen?: boolean;
  icon?: React.ReactNode;
  variant?: AlertVariant;
}>;

type State = AlertProps;

type Action =
  | { type: "open" }
  | { type: "close" }
  | {
      type: AlertVariant;
      payload: AlertProps;
    };

const initialState: State = {
  isOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "close":
      return { ...state, isOpen: false };

    case "open":
      return { ...state, isOpen: true };

    case "error":
    case "info":
    case "success":
    case "warning":
      return {
        ...state,
        ...action.payload,
        variant: action.type,
        isOpen: true,
      };

    default:
      return state;
  }
}

const AlertContext = React.createContext<React.Dispatch<Action> | undefined>(
  undefined
);

const Alert: React.FC<AlertProps> = ({
  variant,
  children,
  icon,
  isOpen = false,
}) => {
  const alertClasses = cn(s.alert, variant && [s[variant]], "alert");

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div role="alert" className={alertClasses}>
      {icon}
      <Text variant="body2" component="span">
        {children}
      </Text>
    </div>,
    document.body
  );
};

export const AlertProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AlertContext.Provider value={dispatch}>
      {children}
      <Alert {...state} />
    </AlertContext.Provider>
  );
};

const DEFAULT_DURATION_IN_MS = 3000;

type AlertOptions = Pick<AlertProps, "icon"> & {
  duration?: number;
};

const defaultAlertOptions: AlertOptions = {
  duration: DEFAULT_DURATION_IN_MS,
  icon: undefined,
};

export const useAlert = () => {
  const dispatch = React.useContext(AlertContext);

  const timeout = React.useRef<any>(null);

  if (!dispatch) {
    throw new Error("`useAlert` must be called within an `AlertProvider`!");
  }

  React.useEffect(() => () => clearTimeout(timeout.current), []);

  const baseAlertDispatch = React.useCallback(
    (
      type: AlertVariant,
      message: React.ReactNode,
      options: AlertOptions = defaultAlertOptions
    ) => {
      const { icon, duration = DEFAULT_DURATION_IN_MS } = options;

      dispatch({
        type,
        payload: {
          children: message,
          icon,
        },
      });

      timeout.current = setTimeout(() => dispatch({ type: "close" }), duration);
    },
    [dispatch]
  );

  return {
    error: React.useCallback(
      (message: React.ReactNode, options?: AlertOptions) =>
        baseAlertDispatch("error", message, options),
      [baseAlertDispatch]
    ),
    info: React.useCallback(
      (message: React.ReactNode, options?: AlertOptions) =>
        baseAlertDispatch("info", message, options),
      [baseAlertDispatch]
    ),
    success: React.useCallback(
      (message: React.ReactNode, options?: AlertOptions) =>
        baseAlertDispatch("success", message, options),
      [baseAlertDispatch]
    ),
    warning: React.useCallback(
      (message: React.ReactNode, options?: AlertOptions) =>
        baseAlertDispatch("warning", message, options),
      [baseAlertDispatch]
    ),
  };
};
