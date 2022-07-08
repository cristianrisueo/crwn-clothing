// Application components
import { Category } from "../category/category";

// Styles
import "./categories.scss";

export const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {/* Categories render */}
      {categories.map((category) => {
        return <Category key={category.id} category={category} />;
      })}
    </div>
  );
};
