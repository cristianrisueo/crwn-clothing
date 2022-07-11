// React components
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

// Application contexts
import { UserContext } from "../../context/userContext";

// Firebase components
import { signOutUser } from "../../utils/firebase/firebase";

// Logo component
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// Styles
import "./navigationBar.scss";

export const NavigationBar = () => {
  // Gets the currentUser value from the user context
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <div className="navigation-bar">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="links-container">
          <Link className="link" to="shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="link" onClick={signOutUser}>
              SIGN-OUT
            </span>
          ) : (
            <Link className="link" to="auth">
              SIGN-IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
