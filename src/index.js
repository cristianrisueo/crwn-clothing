// React components
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Application contexts
import { UserProvider } from "./reducers/userReducer";
import { ProductsProvider } from "./context/productsContext";
import { CartProvider } from "./context/cartContext";

// Application components
import { App } from "./components/app/App";

// Styles
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
