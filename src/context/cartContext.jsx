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
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  // If not adds it to the array of products and returns it
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

/*
  Function that does the logic of removing an item from cart
  It's called by removeItemToCart
*/
const removeItemLogic = (cartItems, productToRemove) => {
  // Finds if the product exists
  const product = cartItems.find((item) => item.id === productToRemove.id);

  // If the quantity is one then removes the item from the array
  if (product.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  // If is greater than one decrements the quantity
  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

/*
  Function that does the logic of cleaning an item from cart
  It's called by clearItemFromCart
*/
const clearItemLogic = (cartItems, productToClear) => {
  // Finds if the product exists
  const product = cartItems.find((item) => item.id === productToClear.id);

  // If the product exists remove it from the cart
  if (product) {
    return cartItems.filter((item) => item.id !== productToClear.id);
  }
};

// Cart context
export const CartContext = createContext({
  isCartOpened: false,
  setIsCartOpened: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCounter: 0,
  checkoutTotalPrice: 0,
  setCheckoutTotalPrice: () => {},
});

// Cart provider
export const CartProvider = ({ children }) => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [checkoutTotalPrice, setCheckoutTotalPrice] = useState(0);

  // Listener for cartCounter
  useEffect(() => {
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const cartTotalPrice = cartItems.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.price,
      0
    );

    setCartCounter(cartCount);
    setCheckoutTotalPrice(cartTotalPrice);
  }, [cartItems]);

  // Function to add an item to the cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addItemLogic(cartItems, productToAdd));
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeItemLogic(cartItems, productToRemove));
  };

  // Function that clears an item from the cart
  const clearItemFromCart = (productToClear) => {
    setCartItems(clearItemLogic(cartItems, productToClear));
  };

  // Creates the value variable and returns it in the provider
  const cartValue = {
    isCartOpened,
    setIsCartOpened,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCounter,
    checkoutTotalPrice,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};
