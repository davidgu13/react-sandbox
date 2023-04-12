/* eslint-disable @typescript-eslint/no-non-null-assertion */
// This project was initialized with the instructions in https://dev.to/alekseiberezkin/setting-up-react-typescript-app-without-create-react-app-oph
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(<App />);
