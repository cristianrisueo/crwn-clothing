// Application components
import { Button } from "../button/button";

// Styles
import "./productCard.scss";

export const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />

      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button text="Add to cart" buttonType="inverted" />
    </div>
  );
};
