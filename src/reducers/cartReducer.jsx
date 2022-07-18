// React components
import { createContext, useReducer } from "react";

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

// * Reducer's actions
export const CART_ACTIONS = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  UPDATE_IS_CART_OPENED: "UPDATE_IS_CART_OPENED",
};

// * Reduce's initial state
const INITIAL_STATE = {
  isCartOpened: false,
  cartItems: [],
  cartCounter: 0,
  checkoutTotalPrice: 0,
};

// * Cart reducer
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTIONS.UPDATE_IS_CART_OPENED:
      return {
        ...state,
        isCartOpened: payload.isCartOpened,
      };
    default:
      throw new Error(`Invalid action ${type}`);
  }
};

// Cart provider
export const CartProvider = ({ children }) => {
  // * Reducer and destructure
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpened, cartItems, cartCounter, checkoutTotalPrice } = state;

  // * Helper functions for updateCartItems

  const addItemToCart = (productToAdd) => {
    const newCartItems = addItemLogic(cartItems, productToAdd);
    updateCartItems(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeItemLogic(cartItems, productToRemove);
    updateCartItems(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearItemLogic(cartItems, productToClear);
    updateCartItems(newCartItems);
  };

  // * Function that updates the cart items, count and total
  const updateCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (totalPrice, item) => totalPrice + item.quantity * item.price,
      0
    );

    dispatch({
      type: CART_ACTIONS.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCounter: newCartCount,
        checkoutTotalPrice: newCartTotal,
      },
    });
  };

  // * Function that updates the cart toggle
  const setIsCartOpened = () => {
    dispatch({
      type: CART_ACTIONS.UPDATE_IS_CART_OPENED,
      payload: {
        isCartOpened: !isCartOpened,
      },
    });
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
