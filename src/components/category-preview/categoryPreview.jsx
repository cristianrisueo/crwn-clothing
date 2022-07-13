// Application components
import { ProductCard } from "../../components/product-card/productCard";

// Styles
import "./categoryPreview.scss";

export const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview">
      <h2>
        <span className="title">{title.toUpperCase()}</span>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
