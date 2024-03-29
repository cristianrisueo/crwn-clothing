// React components
import { useState } from "react";

// Redux components
import { useDispatch } from "react-redux";
import { signUpStart } from "../../redux/user/userActions";

// Application components
import { FormInput } from "../form-input/formInput";
import { Button } from "../button/button";

// Styles
import { SignUpFormStyles, H2Styles } from "./signUpForm.styles";

// Inital values for the variable formFields
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  // Dispatch instance
  const dispatch = useDispatch();

  // Creates the variable formFields and destructures its values
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  /*
    Event handler for the onSubmit event of the form.
    Calls the methods of Firebase to create a new auth user and new 
    record in the collection and updates the state of UserContext 
    once finished clears the inputs.
  */
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) return;

    try {
      dispatch(signUpStart(email, password, displayName));
    } catch (e) {
      console.log(`Error in user creation ${e.message}`);
    }

    setFormFields(defaultFormFields);
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
    <SignUpFormStyles>
      <H2Styles as="h2">Don't have an account?</H2Styles>
      <span>Sign Up with email and password</span>

      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          value={displayName}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={onChangeHandler}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
          required
          autoComplete="Password"
        />

        <FormInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChangeHandler}
          required
          autoComplete="Confirm password"
        />

        <Button text="Sign Up" type="submit" />
      </form>
    </SignUpFormStyles>
  );
};
