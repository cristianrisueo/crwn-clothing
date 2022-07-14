// Styles
import {
  CartIconStyles,
  ShoppingIconStyles,
  ItemsCountStyles,
} from "./cartIcon.styles";

export const CartIcon = ({ onClickHandler, cartCounter }) => {
  return (
    <CartIconStyles onClick={onClickHandler}>
      <ShoppingIconStyles />
      <ItemsCountStyles as="span">{cartCounter}</ItemsCountStyles>
    </CartIconStyles>
  );
};
