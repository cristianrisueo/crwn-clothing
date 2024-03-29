// React components
import { useState } from "react";

// Redux components
import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/userActions";

// Application components
import { FormInput } from "../form-input/formInput";
import { Button, BUTTON_TYPE_CLASS } from "../button/button";

// Styles
import {
  SignUpContainerStyles,
  H2Styles,
  ButtonsContainerStyles,
} from "./signInForm.styles";

// Inital values for the variable formFields
const defaultFormFields = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  // Instance of dispatch
  const dispatch = useDispatch();

  // Creates the variable formFields and destructures its values
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Sign in with google popup method
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  /*
    Event handler for the onSubmit event of the form
    Calls the methods of Firebase to log-in an auth user,
    updates the user's context, reset the form values 
    and checks for the errors associated with log-in
  */
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  /*
    Event handler for the inputs of the form. Triggered when they change.
    Updates the variable of defaultFormFields with the value of the inputs.
  */
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainerStyles>
      <H2Styles as="h2">Already have an account?</H2Styles>
      <span>Sign in with your email and password</span>

      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onChangeHandler}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={onChangeHandler}
          name="password"
          value={password}
          autoComplete="Password"
        />
        <ButtonsContainerStyles>
          <Button text="Sign In" type="submit" />
          <Button
            text="Google sign in"
            type="button"
            buttonType={BUTTON_TYPE_CLASS.google}
            onClick={signInWithGoogle}
          />
        </ButtonsContainerStyles>
      </form>
    </SignUpContainerStyles>
  );
};
