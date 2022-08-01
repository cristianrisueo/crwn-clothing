// Redux libraries
import { combineReducers } from "redux";

// Reducers
import { userReducer } from "../user/userReducer";

// Root reducer
export const rootReducer = combineReducers({
  user: userReducer,
});
