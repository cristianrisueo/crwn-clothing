// React components
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Application contexts
import { ProductsContext } from "../../context/productsContext";

// Application components
import { ProductCard } from "../../components/product-card/productCard";

// Styled components
import {
  CategoryContainerStyles,
  CategoryTitleStyles,
} from "./category.styles";

export const Category = () => {
  // Title of the category
  const { category } = useParams();

  // All the products from all the categories
  const { products } = useContext(ProductsContext);

  // Only the products that we want
  const [categoryProducts, setCategoryProducts] = useState([]);

  // Loads the products from the title of the category
  useEffect(() => {
    setCategoryProducts(products[category]);
  }, [category, products]);

  return (
    <>
      <CategoryTitleStyles as="h2">
        {category.toUpperCase()}
      </CategoryTitleStyles>
      <CategoryContainerStyles>
        {categoryProducts &&
          categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainerStyles>
    </>
  );
};
