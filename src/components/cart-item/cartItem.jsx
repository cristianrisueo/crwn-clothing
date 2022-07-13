// Styles
import "./cartItem.scss";

export const CartItem = ({ product }) => {
  const { name, imageUrl, price, quantity } = product;

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} - {price}
        </span>
      </div>
    </div>
  );
};
