// React components
import { Routes, Route } from "react-router-dom";

// Application components
import { NavigationBar } from "../../routes/navigation-bar/navigationBar";
import { Home } from "../../routes/home/home";
import { Shop } from "../../routes/shop/shop";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};
