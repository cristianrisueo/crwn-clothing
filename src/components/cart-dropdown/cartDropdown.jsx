// Application components
import { Button } from "../button/button";

// Styles
import "./cartDropdown.scss";

export const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <Button text="Checkout" />
    </div>
  );
};
