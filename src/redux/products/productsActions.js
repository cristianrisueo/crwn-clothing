import { PRODUCTS_TYPES_ACTIONS } from "./productsTypes";

import { createAction } from "../../utils/others/reducersUtils";

export const setProducts = (products) =>
  createAction(PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS, products);
