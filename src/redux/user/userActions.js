// Imports the user action types
import { USER_TYPES_ACTIONS } from "./userTypes";

// Returns the action to be executed into the user's reducer
export const setCurrentUser = (user) => ({
  type: USER_TYPES_ACTIONS.SET_CURRENT_USER,
  payload: user,
});
