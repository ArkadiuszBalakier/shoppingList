import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ShoppingListProvider } from "./context/ShoppingListContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ShoppingListProvider>
      <App />
    </ShoppingListProvider>
  </React.StrictMode>
);
