// React components
import { useContext } from "react";
import { Outlet } from "react-router-dom";

// Redux components
import { useSelector } from "react-redux";

// Application contexts
import { CartContext } from "../../reducers/cartReducer";

// Firebase components
import { signOutUser } from "../../utils/firebase/firebase";

// Application components
import { CartIcon } from "../cart-icon/cartIcon";
import { CartDropdown } from "../cart-dropdown/cartDropdown";

// Logo component
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// Styled components
import {
  NavigationBarStyles,
  LogoContainerStyles,
  LinksContainerStyles,
  LinkStyles,
} from "./navigationBar.styles";

export const NavigationBar = () => {
  // Gets the currentUser value from the user state
  const { currentUser } = useSelector((state) => state.user);

  // Get the data from the CartContext
  const { isCartOpened, setIsCartOpened, cartCounter } =
    useContext(CartContext);

  // Updates the state of the cart dropdown
  const updateIsCartOpened = () => {
    setIsCartOpened(!isCartOpened);
  };

  return (
    <>
      <NavigationBarStyles>
        <LogoContainerStyles to="/">
          <CrwnLogo className="logo" />
        </LogoContainerStyles>
        <LinksContainerStyles>
          <LinkStyles to="shop">SHOP</LinkStyles>
          {currentUser ? (
            <LinkStyles as="span" className="link" onClick={signOutUser}>
              SIGN-OUT
            </LinkStyles>
          ) : (
            <LinkStyles to="auth">SIGN-IN</LinkStyles>
          )}
          <CartIcon
            onClickHandler={updateIsCartOpened}
            cartCounter={cartCounter}
          />
        </LinksContainerStyles>
        {isCartOpened && <CartDropdown />}
      </NavigationBarStyles>

      <Outlet />
    </>
  );
};
