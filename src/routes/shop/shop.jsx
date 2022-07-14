// React components
import { Routes, Route } from "react-router-dom";

// Application components
import { CategoriesPreview } from "../categories-preview/categoriesPreview";
import { Category } from "../category/category";

export const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
