// Imports the user action types
import { USER_TYPES_ACTIONS } from "./userTypes";

// Initial state of the reducer. Needed to implement it
const INITIAL_STATE = {
  currentUser: null,
};

/*
  User reducer. Receives State which is the previous state
  and action which is the action to be performed.
  Type is what to do, Payload is the new value.
*/
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_TYPES_ACTIONS.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
