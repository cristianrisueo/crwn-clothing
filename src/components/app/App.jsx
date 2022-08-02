// React components
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Firebase components
import {
  signOutUser,
  onAuthStateChangedListener,
  createUserDocument,
} from "../../utils/firebase/firebase";

// Redux components
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user/userActions";

// Application components
import { NavigationBar } from "../navigation-bar/navigationBar";

// Application routes
import { Home } from "../../routes/home/home";
import { Shop } from "../../routes/shop/shop";
import { Authentication } from "../../routes/authentication/authentication";
import { Checkout } from "../../routes/checkout/checkout";

export const App = () => {
  // Instance of dispatch
  const dispatch = useDispatch();

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

      dispatch(setCurrentUser(currentUser));
    });

    return unMount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};
