// Redux components
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../redux/cart/cartSelector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../redux/cart/cartAction";

// Styled components
import {
  CheckoutItemStyles,
  ImageContainerStyles,
  ImgStyles,
  NameStyles,
  QuantityStyles,
  PriceStyles,
  ArrowStyles,
  ValueStyles,
  RemoveButtonStyles,
} from "./checkoutItem.styles";

export const CheckoutItem = ({ item }) => {
  // Destructures the item
  const { name, imageUrl, quantity, price } = item;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Handlers

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, item));
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, item));
  };

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, item));
  };

  return (
    <CheckoutItemStyles>
      <ImageContainerStyles>
        <ImgStyles as="img" src={imageUrl} alt={`${name}`} />
      </ImageContainerStyles>
      <NameStyles as="span"> {name} </NameStyles>
      <QuantityStyles as="span">
        <ArrowStyles onClick={removeItemHandler}>&#10094;</ArrowStyles>
        <ValueStyles as="span">{quantity}</ValueStyles>
        <ArrowStyles onClick={addItemHandler}>&#10095;</ArrowStyles>
      </QuantityStyles>
      <PriceStyles as="span"> {price}</PriceStyles>
      <RemoveButtonStyles onClick={clearItemHandler}>
        &#10005;
      </RemoveButtonStyles>
    </CheckoutItemStyles>
  );
};
