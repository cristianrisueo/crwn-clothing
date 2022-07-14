// Styles
import {
  CartItemStyles,
  ImgStyles,
  ItemDetailsStyles,
  NameStyles,
} from "./cartItem.styles";

export const CartItem = ({ product }) => {
  const { name, imageUrl, price, quantity } = product;

  return (
    <CartItemStyles>
      <ImgStyles as="img" src={imageUrl} alt={name} />
      <ItemDetailsStyles>
        <NameStyles as="span">{name}</NameStyles>
        <span className="price">
          {quantity} - {price}
        </span>
      </ItemDetailsStyles>
    </CartItemStyles>
  );
};
