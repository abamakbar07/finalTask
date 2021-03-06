import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./context/globalContext";
import { CartContextProvider } from "./context/cartContext";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <CartContextProvider>
          <App />
      </CartContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
