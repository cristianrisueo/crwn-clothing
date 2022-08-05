// Imports the user action types
import { USER_TYPES_ACTIONS } from "./userTypes";

// Initial state of the reducer. Needed to implement it
const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

/*
  User reducer. Receives State which is the previous state
  and action which is the action to be performed.
  Type is what to do, Payload is the new value.
*/
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_TYPES_ACTIONS.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_TYPES_ACTIONS.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_TYPES_ACTIONS.SIGN_UP_FAIL:
    case USER_TYPES_ACTIONS.SIGN_IN_FAIL:
    case USER_TYPES_ACTIONS.SIGN_OUT_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};
