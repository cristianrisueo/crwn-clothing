// Firebase components
import {
  googleSignInWithPopup,
  createUserDocument,
} from "../../utils/firebase/firebase";

export const SignIn = () => {
  // OnClick handler that runs the function from Firebase googleSignInWithPopup
  const signInWithPopup = async () => {
    const response = await googleSignInWithPopup();
    const { user } = response;

    await createUserDocument(user);
  };

  return (
    <div>
      <button onClick={signInWithPopup}>Sign In with Google</button>
    </div>
  );
};
