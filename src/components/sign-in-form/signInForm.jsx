// React components
import { useState, useContext } from "react";

// Application contexts
import { UserContext } from "../../context/userContext";

// Firebase components
import {
  googleSignInWithPopup,
  createUserDocument,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";

// Application components
import { FormInput } from "../form-input/formInput";
import { Button } from "../button/button";

// Styles
import "./signInForm.scss";

// Inital values for the variable formFields
const defaultFormFields = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  // Gets the setter hook from the context UserContext
  const { setCurrentUser } = useContext(UserContext);

  // Creates the variable formFields and destructures its values
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Sign in with google popup method
  const signInWithGoogle = async () => {
    const { user } = await googleSignInWithPopup();
    setCurrentUser(user);
    await createUserDocument(user);
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
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);
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
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
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
        <div className="buttons-container">
          <Button text="Sign In" type="submit" />
          <Button
            text="Google sign in"
            type="button"
            buttonType="google"
            onClick={signInWithGoogle}
          />
        </div>
      </form>
    </div>
  );
};
