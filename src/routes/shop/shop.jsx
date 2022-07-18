// React components
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Application contexts
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

// Application components
import { CategoriesPreview } from "../categories-preview/categoriesPreview";
import { Category } from "../category/category";

// Redux components
import { useDispatch } from "react-redux";
import { setProducts } from "../../redux/products/productsActions";

export const Shop = () => {
  const dispatch = useDispatch();

  // Returns the categories and products
  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setProducts(categoriesArray));
    };

    getCategories();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
