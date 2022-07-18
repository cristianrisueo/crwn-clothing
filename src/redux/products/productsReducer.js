import { PRODUCTS_TYPES_ACTIONS } from "./productsTypes";

const INITIAL_STATE = {
  products: {},
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return { ...state };
  }
};
