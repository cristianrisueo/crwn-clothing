// React components
import { Link } from "react-router-dom";

// Application components
import { ProductCard } from "../../components/product-card/productCard";

// Styled components
import {
  CategoryPreviewStyles,
  TitleStyles,
  PreviewStyles,
} from "./categoryPreview.styles.jsx";

export const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewStyles>
      <Link to={title}>
        <TitleStyles as="h2">
          <span>{title.toUpperCase()}</span>
        </TitleStyles>
      </Link>
      <PreviewStyles>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </PreviewStyles>
    </CategoryPreviewStyles>
  );
};
