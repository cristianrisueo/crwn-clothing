// React components
import { createContext, useState, useEffect } from "react";

/*
  Function that does the logic of adding an item to cart
  It's called by addItemToCart
*/
const addItemLogic = (cartItems, productToAdd) => {
  // Finds if the product exists
  const product = cartItems.find((item) => item.id === productToAdd.id);

  // If exists, increments it's quantity and returns the array of products
  if (product) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // If not adds it to the array of products and returns it
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Cart context
export const CartContext = createContext({
  isCartOpened: false,
  setIsCartOpened: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCounter: 0,
});

// Cart provider
export const CartProvider = ({ children }) => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  // Listener for cartCounter
  useEffect(() => {
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCounter(cartCount);
  }, [cartItems]);

  // Function to add an item to the cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addItemLogic(cartItems, productToAdd));
  };

  // Creates the value variable and returns it in the provider
  const cartValue = {
    isCartOpened,
    setIsCartOpened,
    cartItems,
    addItemToCart,
    cartCounter,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};
