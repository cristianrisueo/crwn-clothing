// React hook to create the context, and useState
import { createContext, useState } from "react";

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

  // Creates the value variable and returns it in the provider
  const userValue = { currentUser, setCurrentUser };
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
