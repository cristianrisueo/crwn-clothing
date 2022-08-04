/*
  Redux-Saga effects
  - all: acts as a breakpoint. Until everything inside is completed doesn't 
  allow to continue the interaction (makes it synchronous)
  - takeLatest: From a stack of actions choose the latest one
  - call: Turns a function into an effect
  - put: Does the same than dispatch
*/
import { takeLatest, all, call, put } from "redux-saga/effects";

// Firebase components
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

// Products types and actions
import { PRODUCTS_TYPES_ACTIONS } from "./productsTypes";
import { setProductsSucess, setProductsFail } from "./productsActions";

// * Generator functions for the products saga

// Fetches the products and updates the reducer
export function* setProductsAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    yield put(setProductsSucess(categoriesArray));
  } catch (error) {
    yield put(setProductsFail(error));
  }
}

// Event listener, when the type action start is called executes setProductsAsync
export function* onSetProducts() {
  yield takeLatest(PRODUCTS_TYPES_ACTIONS.SET_PRODUCTS_START, setProductsAsync);
}

// Creates the products Saga which calls the event listener
export function* productsSaga() {
  yield all([call(onSetProducts)]);
}
