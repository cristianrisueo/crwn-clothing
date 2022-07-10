// React components
import { Outlet, Link } from "react-router-dom";

// Logo component
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

// Styles
import "./navigationBar.scss";

export const NavigationBar = () => {
  return (
    <>
      <div className="navigation-bar">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="links-container">
          <Link className="link" to="shop">
            SHOP
          </Link>
          <Link className="link" to="auth">
            SIGN-IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
