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

export const CheckoutItem = ({ item, addItem, removeItem, clearItem }) => {
  // Destructures the item
  const { name, imageUrl, quantity, price } = item;

  // Handler for the actions: Increase, decrement and remove
  const clearItemHandler = () => clearItem(item);
  const addItemHandler = () => addItem(item);
  const removeItemHandler = () => removeItem(item);

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
