// React components
import { useEffect } from "react";

// Redux components
import { useSelector, useDispatch } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cartSelector";

import {
  setIsCartOpen,
} from "../../redux/cart/cartAction";

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
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
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
        return <CheckoutItem key={item.id} item={item} />;
      })}

      <TotalStyles as="span">Total: {cartTotal}</TotalStyles>
    </CheckoutContainerStyles>
  );
};
