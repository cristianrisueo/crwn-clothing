// Redux libraries
import { combineReducers } from "redux";

// Reducers
import { userReducer } from "../user/userReducer";
import { productsReducer } from "../products/productsReducer";

// Root reducer
export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});
