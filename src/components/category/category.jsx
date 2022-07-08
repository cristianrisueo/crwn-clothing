// Styles
import "./category.scss";

export const Category = ({ category }) => {
  return (
    <div className="category-container">
      <div
        className="category-image"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <div className="category-body">
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};
