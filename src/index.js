// React components
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Redux components
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Application contexts
import { CartProvider } from "./reducers/cartReducer";

// Application components
import { App } from "./components/app/App";

// Styles
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
