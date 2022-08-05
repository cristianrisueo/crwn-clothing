// Imports
import { takeLatest, all, call, put } from "redux-saga/effects";
import { USER_TYPES_ACTIONS } from "./userTypes";
import {
  signInSuccess,
  signInFail,
  signUpSucess,
  signUpFail,
  signOutSuccess,
  signOutFail,
} from "./userActions";
import {
  getCurrentUser,
  createUserDocument,
  googleSignInWithPopup,
  signInAuthUserWithEmailAndPassword,
  createUserWithEmailPassword,
  signOutUser,
} from "../../utils/firebase/firebase";

// Generator functions and Saga

export function* getDataFromUserAuth(userAuth, additionalInfo) {
  try {
    const userData = yield call(createUserDocument, userAuth, additionalInfo);
    yield put(signInSuccess({ id: userData.id, ...userData.data }));
  } catch (error) {
    yield put(signInFail(error));
  }
}

// Check user session

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;
    yield call(getDataFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFail(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_TYPES_ACTIONS.CHECK_USER_SESSION, isUserAuthenticated);
}

// Sign In with Google

export function* signInWithGoogle() {
  try {
    const { user } = yield call(googleSignInWithPopup());
    yield call(getDataFromUserAuth, user);
  } catch (error) {
    yield put(signInFail(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_TYPES_ACTIONS.GOOGLE_SIGNIN_START, signInWithGoogle);
}

// SignIn with Email

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield call(getDataFromUserAuth, user);
  } catch (error) {
    yield put(signInFail(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_TYPES_ACTIONS.EMAIL_SIGNIN_START, signInWithEmail);
}

// Sign Up

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createUserWithEmailPassword, email, password);
    yield put(signUpSucess(user, { displayName }));
  } catch (error) {
    yield put(signUpFail(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_TYPES_ACTIONS.SIGN_UP_START, signUp);
}

export function* signInAfterSuccess({ payload: { user, additionalInfo } }) {
  yield call(getDataFromUserAuth, user, additionalInfo);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_TYPES_ACTIONS.SIGN_UP_SUCCESS, signInAfterSuccess);
}

// Sign Out

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(USER_TYPES_ACTIONS.SIGN_OUT_START, signOut);
}

// Saga
export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
