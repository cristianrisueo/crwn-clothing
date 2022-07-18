// React components
import { createContext, useReducer, useEffect } from "react";

// Firebase components
import {
  signOutUser,
  onAuthStateChangedListener,
  createUserDocument,
} from "../utils/firebase/firebase";

// User context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Object with the actions to perform by the reducer
export const USER_ACTIONS = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// Initial state of the reducer. Needed to implement it
const INITIAL_STATE = {
  currentUser: null,
};

/*
    User reducer. Receives State which is the previous state
    and action which is the action to be performed.
    Type is what to do, Payload is the new value.
*/
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Invalid type recevived: ${type}`);
  }
};

// Contains the context and the reducucer
export const UserProvider = ({ children }) => {
  // Creates the reducer and destructures the currentUser
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;

  // Calls dispatch which is to execute an action on the reducer
  const setCurrentUser = (user) => {
    dispatch({
      type: USER_ACTIONS.SET_CURRENT_USER,
      payload: user,
    });
  };

  /*
    First signs out the user, even if there's no user.
    Runs the listener from Firebase, passing the callback function that
    creates a new document for the user in the collection and updates.
    the state of the user. By doing the return of the listener when 
    the componen is unmounted, unmounts the hook as well.
  */
  useEffect(() => {
    signOutUser();

    const unMount = onAuthStateChangedListener(async (currentUser) => {
      if (currentUser) {
        await createUserDocument(currentUser);
      }

      setCurrentUser(currentUser);
    });

    return unMount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Creates the user value and returns it in the user context
  const userValue = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
