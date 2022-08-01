// React components
import { useContext } from "react";

// Products context
import { ProductsContext } from "../../context/productsContext";

// Application components
import { CategoryPreview } from "../../components/category-preview/categoryPreview";

export const CategoriesPreview = () => {
  // Get the products from the context
  const { products } = useContext(ProductsContext);

  return (
    <>
      {Object.keys(products).map((title) => {
        const product = products[title];
        return <CategoryPreview key={title} title={title} products={product} />;
      })}
    </>
  );
};
