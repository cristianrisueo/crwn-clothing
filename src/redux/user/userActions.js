// Imports the user action types
import { USER_TYPES_ACTIONS } from "./userTypes";

// Returns the actions to be executed into the user's Saga

export const setCurrentUser = (user) => ({
  type: USER_TYPES_ACTIONS.SET_CURRENT_USER,
  payload: user,
});

export const checkUserSession = () => ({
  type: USER_TYPES_ACTIONS.CHECK_USER_SESSION,
});

export const googleSignInStart = () => ({
  type: USER_TYPES_ACTIONS.GOOGLE_SIGNIN_START,
});

export const emailSignInStart = (email, password) => ({
  type: USER_TYPES_ACTIONS.EMAIL_SIGNIN_START,
  payload: { email, password },
});

export const signInSuccess = (user) => ({
  type: USER_TYPES_ACTIONS.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFail = (error) => ({
  type: USER_TYPES_ACTIONS.SIGN_IN_FAIL,
  payload: error,
});

export const signUpStart = (email, password, displayName) => ({
  type: USER_TYPES_ACTIONS.SIGN_UP_START,
  payload: { email, password, displayName },
});

export const signUpSucess = (user, otherData) => ({
  type: USER_TYPES_ACTIONS.SIGN_UP_SUCCESS,
  payload: { user, otherData },
});

export const signUpFail = (error) => ({
  type: USER_TYPES_ACTIONS.SIGN_UP_FAIL,
  payload: error,
});

export const signOutStart = () => ({
  type: USER_TYPES_ACTIONS.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: USER_TYPES_ACTIONS.SIGN_OUT_SUCCESS,
});

export const signOutFail = (error) => ({
  type: USER_TYPES_ACTIONS.SIGN_OUT_FAIL,
  payload: error,
});
