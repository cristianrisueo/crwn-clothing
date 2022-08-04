// Firebase components
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

// Imports the products action types
import { PRODUCTS_TYPES_ACTIONS } from "./productsTypes";

/* 
  * Returns the action to be executed into the products reducer
  * Before redux thunk this was the only action, now we have three
  export const setProducts = (products) => ({
    type: PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS,
    payload: products,
  });
*/

// Actions to be executed by the products reducer

export const setProductsStart = () => ({
  type: PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS_START,
});

export const setProductsSucess = (products) => ({
  type: PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS_SUCCESS,
  payload: products,
});

export const setProductsFail = (error) => ({
  type: PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS_FAIL,
  payload: error,
});

// Thunk method that triggers the actions
export const setProductsAsync = () => async (dispatch) => {
  dispatch(setProductsStart());

  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(setProductsSucess(categoriesArray));
  } catch (error) {
    dispatch(setProductsFail(error));
  }
};
