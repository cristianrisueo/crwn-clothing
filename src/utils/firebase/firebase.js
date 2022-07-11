// Neccesary to create an app instance of Firebase
import { initializeApp } from "firebase/app";

/* 
  Libraries needed for authentication
  getAuth is the instance of our Auth application in Firebase.
  GoogleAuthProvider is the provider needed to get the authtoken from Google
  server and to check that token once it's sent back.
  signInWithPopup is the function that will be executed in the frontend to auth.
  createUserWithEmailAndPassword is the method to create an authenticated user 
  from email and password in firebase.
  signInWithEmailAndPassword is the method that sign in a user if exists with
  email and password.
  signOut is the function that will sign out the user in the firebase server.
*/
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/*
  Libraries needed to store in the DB  
  getFirestore is the instance of our Firestore application in Firebase.
  doc retrieves documents from the Firestore collection.
  getDoc gets the document data once we used doc.
  setDoc sets the document data once we used doc.
*/
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Configuration of Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB65FeXuErPihMpCqEx1LMKOGP2cckeqN8",
  authDomain: "crown-clothing-c5238.firebaseapp.com",
  projectId: "crown-clothing-c5238",
  storageBucket: "crown-clothing-c5238.appspot.com",
  messagingSenderId: "876038920985",
  appId: "1:876038920985:web:86de953b0c91ad1b7e8388",
};

// Intanciates the Firebase project based on the configuration
// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

// Instance of the google provider needed for authentication
const googleProvider = new GoogleAuthProvider();

/* 
  Custom config for the google provider: Every time someone interacts
  with the authentication we force him to select an account
*/
googleProvider.setCustomParameters({ prompt: "select_account" });

/* 
  Exports the Firebase libraries needed in the frontend of the app
  getAuth are the rules for getting the authtoken 
*/
export const auth = getAuth();
export const googleSignInWithPopup = () =>
  signInWithPopup(auth, googleProvider);

// Instance of the Firestore collection
const firestoreDB = getFirestore();

// Function to create a new document in the collection users
export const createUserDocument = async (
  user,
  aditionalInformation = { displayName: "empty" }
) => {
  if (!user) return;

  // Points to the collection users (doesn't matter if exists)
  const userDocument = doc(firestoreDB, "users", user.uid);

  // Get the data of the user from that collection
  const userData = await getDoc(userDocument);

  // If data of the user or collection not exists create it
  if (!userData.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      setDoc(userDocument, {
        displayName,
        email,
        createdAt,
        ...aditionalInformation,
      });
    } catch (e) {
      console.error(`Error creating the user ${e.message}`);
    }
  }
};

// Creates an authenticated user in firebase
export const createUserWithEmailPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Calls the method signInWithEmailAndPassword
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Calls the method signOut
export const signOutUser = () => signOut(auth);