// React components
import { Link } from "react-router-dom";

// Application components
import { ProductCard } from "../../components/product-card/productCard";

// Styles
import "./categoryPreview.scss";

export const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview">
      <Link to={title}>
        <h2 className="title">
          <span>{title.toUpperCase()}</span>
        </h2>
      </Link>
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
