// React component
import { useNavigate } from "react-router-dom";

// Application components
import { Button } from "../button/button";
import { CartItem } from "../cart-item/cartItem";

// Redux components
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/cart/cartSelector";

// Styled components
import { CartDropdownStyles, CartItemsStyles } from "./cartDropdown.styles";

export const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("checkout");
  };

  return (
    <CartDropdownStyles>
      <CartItemsStyles>
        {cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </CartItemsStyles>

      <Button text="Checkout" onClick={goToCheckout} />
    </CartDropdownStyles>
  );
};
