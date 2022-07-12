// Logo component
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

// Styles
import "./cartIcon.scss";

export const CartIcon = ({ onClickHandler }) => {
  return (
    <div className="cart-icon" onClick={onClickHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="items-count">0</span>
    </div>
  );
};
