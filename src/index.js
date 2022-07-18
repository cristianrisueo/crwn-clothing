// React components
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Redux components
import { Provider } from "react-redux";

// Redux store
import { store } from "./redux/store";

// Application contexts
import { ProductsProvider } from "./context/productsContext";
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
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
