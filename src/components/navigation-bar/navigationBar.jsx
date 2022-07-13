// React components
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

// Application contexts
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";

// Firebase components
import { signOutUser } from "../../utils/firebase/firebase";

// Application components
import { CartIcon } from "../cart-icon/cartIcon";
import { CartDropdown } from "../cart-dropdown/cartDropdown";

// Logo component
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// Styles
import "./navigationBar.scss";

export const NavigationBar = () => {
  // Gets the currentUser value from the user context
  const { currentUser } = useContext(UserContext);

  // Get the data from the CartContext
  const { isCartOpened, setIsCartOpened, cartCounter } =
    useContext(CartContext);

  // Updates the state of the cart dropdown
  const updateIsCartOpened = () => {
    setIsCartOpened(!isCartOpened);
  };

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
          <CartIcon
            onClickHandler={updateIsCartOpened}
            cartCounter={cartCounter}
          />
        </div>
        {isCartOpened && <CartDropdown />}
      </div>

      <Outlet />
    </>
  );
};
