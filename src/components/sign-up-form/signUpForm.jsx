// React components
import { useState } from "react";

// Firebase components
import {
  createUserWithEmailPassword,
  createUserDocument,
} from "../../utils/firebase/firebase";

// Application components
import { FormInput } from "../form-input/formInput";
import { Button } from "../button/button";

// Styles
import "./signUpForm.scss";

// Inital values for the variable formFields
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
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
      const response = await createUserWithEmailPassword(email, password);
      const { user } = response;

      createUserDocument(user, { displayname: displayName });
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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
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

        <Button text="Sign Up" buttonType="default" type="submit" />
      </form>
    </div>
  );
};
