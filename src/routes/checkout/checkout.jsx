// React components
import { useContext, useEffect } from "react";

// Application contexts
import { CartContext } from "../../context/cartContext";

// Application components
import { CheckoutItem } from "../../components/checkout-item/checkoutItem";

// Styles
import {
  CheckoutContainerStyles,
  CheckoutHeaderStyles,
  HeaderBlockStyles,
  TotalStyles,
} from "./checkout.styles";

export const Checkout = () => {
  const {
    setIsCartOpened,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    checkoutTotalPrice,
  } = useContext(CartContext);

  useEffect(() => {
    setIsCartOpened(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CheckoutContainerStyles>
      <CheckoutHeaderStyles>
        <HeaderBlockStyles>
          <span>Product</span>
        </HeaderBlockStyles>
        <HeaderBlockStyles>
          <span>Description</span>
        </HeaderBlockStyles>
        <HeaderBlockStyles>
          <span>Quantity</span>
        </HeaderBlockStyles>
        <HeaderBlockStyles>
          <span>Price</span>
        </HeaderBlockStyles>
        <HeaderBlockStyles>
          <span>Remove</span>
        </HeaderBlockStyles>
      </CheckoutHeaderStyles>

      {cartItems.map((item) => {
        return (
          <CheckoutItem
            key={item.id}
            item={item}
            addItem={addItemToCart}
            removeItem={removeItemFromCart}
            clearItem={clearItemFromCart}
          />
        );
      })}

      <TotalStyles as="span">Total: {checkoutTotalPrice}</TotalStyles>
    </CheckoutContainerStyles>
  );
};
