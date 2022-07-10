// Application components
import { SignUpForm } from "../../components/sign-up-form/signUpForm";
import { SignInForm } from "../../components/sign-in-form/signInForm";

// Styles
import "./authentication.scss";

export const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
