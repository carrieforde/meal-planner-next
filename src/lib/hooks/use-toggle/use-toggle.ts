"use client";

import { useCallback, useState } from "react";

export const useToggle = (initialState = false) => {
  const [toggled, setToggledState] = useState(initialState);

  const toggleState = useCallback(() => {
    setToggledState((s) => !s);
  }, []);

  return [toggled, toggleState];
};
