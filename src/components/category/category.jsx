// React components
import { useNavigate } from "react-router-dom";

// Styles
import "./category.scss";

export const Category = ({ category }) => {
  // useNavigate Hook
  const navigate = useNavigate();

  // Implementation of the hook
  const goToCategory = () => navigate(category.route);
  
  return (
    <div className="category-item-container" onClick={goToCategory}>
      <div
        className="category-image"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <div className="category-body">
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};
