// React components
import { createContext, useState } from "react";

// Cart context
export const CartContext = createContext({
  isCartOpened: false,
  setIsCartOpened: () => {},
});

// Cart provider
export const CartProvider = ({ children }) => {
  // Variable and setter that holds the user data
  const [isCartOpened, setIsCartOpened] = useState(false);

  // Creates the value variable and returns it in the provider
  const cartValue = { isCartOpened, setIsCartOpened };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};

