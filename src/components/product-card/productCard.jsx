// Redux components
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux/cart/cartSelector";
import { addItemToCart } from "../../redux/cart/cartAction";

// Application components
import { Button, BUTTON_TYPE_CLASS } from "../button/button";

// Styles
import "./productCard.scss";

export const ProductCard = ({ product }) => {
  // Destructured product
  const { name, imageUrl, price } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // onClick handler that adds the product to cart
  const onClickHandler = () => dispatch(addItemToCart(cartItems, product));

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
