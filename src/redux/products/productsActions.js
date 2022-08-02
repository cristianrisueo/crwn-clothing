// Imports the products action types
import { PRODUCTS_TYPES_ACTIONS } from "./productsTypes";

// Returns the action to be executed into the products reducer
export const setProducts = (products) => ({
  type: PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS,
  payload: products,
});
