// React components
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Redux components
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/products/productsActions";

// Firebase components
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

// Application components
import { CategoriesPreview } from "../categories-preview/categoriesPreview";
import { Category } from "../category/category";

export const Shop = () => {
  // Instance of useDispatch
  const dispatch = useDispatch();

  // Returns the categories and products
  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setProducts(categoriesArray));
    };

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
