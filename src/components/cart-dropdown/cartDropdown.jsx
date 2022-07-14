// React component
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Application components
import { Button } from "../button/button";
import { CartItem } from "../cart-item/cartItem";

// Application contexts
import { CartContext } from "../../context/cartContext";

// Styled components
import { CartDropdownStyles, CartItemsStyles } from "./cartDropdown.styles";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
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
