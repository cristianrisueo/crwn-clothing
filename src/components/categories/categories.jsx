// Application components
import { Category } from "../category/category";

// Styles
import { CategoriesContainerStyles } from "./categories.styles";

export const Categories = ({ categories }) => {
  return (
    <CategoriesContainerStyles>
      {/* Categories render */}
      {categories.map((category) => {
        return <Category key={category.id} category={category} />;
      })}
    </CategoriesContainerStyles>
  );
};
