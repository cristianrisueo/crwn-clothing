// React components
import { useContext } from "react";

// Products context
import { ProductsContext } from "../../context/productsContext";

// Application components
import { CategoryPreview } from "../../components/category-preview/categoryPreview";

// styles
import "./shop.scss";

export const Shop = () => {
  // Get the products from the context
  const { products } = useContext(ProductsContext);

  return (
    <div className="shop-container">
      {Object.keys(products).map((title) => {
        const product = products[title];
        return <CategoryPreview key={title} title={title} products={product} />;
      })}
    </div>
  );
};
