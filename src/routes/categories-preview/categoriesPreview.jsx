// Redux components
import { useSelector } from "react-redux";

// Application components
import { CategoryPreview } from "../../components/category-preview/categoryPreview";

export const CategoriesPreview = () => {
  // Gets the products value from the store
  const products = useSelector((state) => state.products.products);

  return (
    <>
      {Object.keys(products).map((title) => {
        const product = products[title];
        return <CategoryPreview key={title} title={title} products={product} />;
      })}
    </>
  );
};
