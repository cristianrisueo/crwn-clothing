// Redux components
import { useSelector } from "react-redux";

// Application components
import { CategoryPreview } from "../../components/category-preview/categoryPreview";
import { Spinner } from "../../components/spinner/spinner";

export const CategoriesPreview = () => {
  // Get the products from the context
  const { products, isLoading } = useSelector((state) => state.products);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(products).map((title) => {
          const product = products[title];
          return (
            <CategoryPreview key={title} title={title} products={product} />
          );
        })
      )}
    </>
  );
};
