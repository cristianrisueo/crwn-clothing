// Redux components
import { combineReducers } from "redux";

// Reducers
import { userReducer } from "../user/userReducer";
import { productsReducer } from "../products/productsReducer";
import { cartReducer } from "../cart/cartReducer";

// Root reducer
export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
});
