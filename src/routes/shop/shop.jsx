// React components
import { useContext } from "react";

// Products context
import { ProductsContext } from "../../context/productsContext";

// Application components
import { ProductCard } from "../../components/product-card/productCard";

// styles
import "./shop.scss";

export const Shop = () => {
  // Get the products from the context
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};
