// React components
import { useContext, useEffect } from "react";

// Application contexts
import { CartContext } from "../../context/cartContext";

// Application components
import { CheckoutItem } from "../../components/checkout-item/checkoutItem";

// Styles
import "./checkout.scss";

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
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

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

      <span className="total">Total: {checkoutTotalPrice}</span>
    </div>
  );
};
