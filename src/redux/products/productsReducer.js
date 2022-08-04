// Imports the products action types
import { PRODUCTS_TYPES_ACTIONS } from "./productsTypes";

// Initial state of the reducer
const INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: null,
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  // Because now is asynchronous we need the three cases
  switch (type) {
    case PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS_START:
      return { ...state, isLoading: true };
    case PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS_SUCCESS:
      return { ...state, products: payload, isLoading: false };
    case PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS_FAIL:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
