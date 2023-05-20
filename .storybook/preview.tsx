import type { Preview } from "@storybook/react";
import * as React from "react";
import "../src/app/styles.css";
import { AlertProvider } from "../src/lib";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [(Story) => <AlertProvider>{Story()}</AlertProvider>],
};

export default preview;
