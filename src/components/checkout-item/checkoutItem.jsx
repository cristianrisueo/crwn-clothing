// Styles
import "./checkoutItem.scss";

export const CheckoutItem = ({ item, addItem, removeItem, clearItem }) => {
  // Destructures the item
  const { name, imageUrl, quantity, price } = item;

  // Handler for the actions: Increase, decrement and remove
  const clearItemHandler = () => clearItem(item);
  const addItemHandler = () => addItem(item);
  const removeItemHandler = () => removeItem(item);

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};
