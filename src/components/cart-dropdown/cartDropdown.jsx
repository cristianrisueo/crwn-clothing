// React component
import { useContext } from "react";

// Application components
import { Button } from "../button/button";
import { CartItem } from "../cart-item/cartItem";

// Application contexts
import { CartContext } from "../../context/cartContext";

// Styles
import "./cartDropdown.scss";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>

      <Button text="Checkout" />
    </div>
  );
};
