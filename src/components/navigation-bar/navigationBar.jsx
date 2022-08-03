// React components
import { Outlet } from "react-router-dom";

// Redux components
import { useSelector, useDispatch } from "react-redux";
import { selectIsCartOpen } from "../../redux/cart/cartSelector";
import { setIsCartOpen } from "../../redux/cart/cartAction";

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
  // Instance of dispatch
  const dispatch = useDispatch();

  // Gets the currentUser value from the user state
  const { currentUser } = useSelector((state) => state.user);

  // Gets the current value of the cart toogle
  const isCartOpen = useSelector(selectIsCartOpen);

  // Updates the state of the cart dropdown
  const updateIsCartOpened = () => {
    dispatch(setIsCartOpen(!isCartOpen));
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
          <CartIcon onClickHandler={updateIsCartOpened} />
        </LinksContainerStyles>
        {isCartOpen && <CartDropdown />}
      </NavigationBarStyles>

      <Outlet />
    </>
  );
};
