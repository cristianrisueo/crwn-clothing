// React components
import { createContext, useState, useEffect } from "react";

// Firebase components
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";

// Values we want to store: Here we define the values
export const ProductsContext = createContext({
  products: {},
});

/*
    Functional component that contains the context: 
    Here we interact with the values of context and return them
*/
export const ProductsProvider = ({ children }) => {
  // Variable and setter that holds the user data
  const [products, setProducts] = useState({});

  // Returns the categories and products
  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      setProducts(categoriesArray);
    };

    getCategories();
  }, []);

  // Creates the value variable and returns it in the provider
  const productsValue = { products };

  return (
    <ProductsContext.Provider value={productsValue}>
      {children}
    </ProductsContext.Provider>
  );
};
