// React component
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Application components
import { Button } from "../button/button";
import { CartItem } from "../cart-item/cartItem";

// Application contexts
import { CartContext } from "../../context/cartContext";

// Styles
import "./cartDropdown.scss";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("checkout");
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>

      <Button text="Checkout" onClick={goToCheckout} />
    </div>
  );
};
