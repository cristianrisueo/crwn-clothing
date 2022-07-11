// React hook to create the context, useState and UseEffect
import { createContext, useState, useEffect } from "react";

// Firebase components
import {
  signOutUser,
  onAuthStateChangedListener,
  createUserDocument,
} from "../utils/firebase/firebase";

// Values we want to store: Here we define the values
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

/*
    Functional component that contains the context: 
    Here we interact with the values of context and return them
*/
export const UserProvider = ({ children }) => {
  // Variable and setter that holds the user data
  const [currentUser, setCurrentUser] = useState(null);

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
  }, []);

  // Creates the value variable and returns it in the provider
  const userValue = { currentUser, setCurrentUser };
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
