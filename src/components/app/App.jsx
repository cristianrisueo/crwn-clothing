// React components
import { Routes, Route } from "react-router-dom";

// Application components
import { NavigationBar } from "../navigation-bar/navigationBar";

// Application routes
import { Home } from "../../routes/home/home";
import { Shop } from "../../routes/shop/shop";
import { Authentication } from "../../routes/authentication/authentication";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};
