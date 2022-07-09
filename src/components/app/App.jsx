// React components
import { Routes, Route } from "react-router-dom";

// Application components
import { NavigationBar } from "../navigation-bar/navigationBar";

// Application routes
import { Home } from "../../routes/home/home";
import { Shop } from "../../routes/shop/shop";
import { SignIn } from "../../routes/sign-in/signIn";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};
