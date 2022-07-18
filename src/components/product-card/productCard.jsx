// React components
import { useContext } from "react";

// Application components
import { Button, BUTTON_TYPE_CLASS } from "../button/button";

// Application context
import { CartContext } from "../../reducers/cartReducer";

// Styles
import "./productCard.scss";

export const ProductCard = ({ product }) => {
  // Destructured product
  const { name, imageUrl, price } = product;

  // Method from the context that adds the product to cart
  const { addItemToCart } = useContext(CartContext);

  // onClick handler that adds the product to cart
  const onClickHandler = () => addItemToCart(product);

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />

      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button
        text="Add to cart"
        buttonType={BUTTON_TYPE_CLASS.inverted}
        onClick={onClickHandler}
      />
    </div>
  );
};
