// Application components
import { SignUpForm } from "../../components/sign-up-form/signUpForm";
import { SignInForm } from "../../components/sign-in-form/signInForm";

// Styles
import { AuthenticationContainerStyles } from "./authentication.styles";

export const Authentication = () => {
  return (
    <AuthenticationContainerStyles>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainerStyles>
  );
};
