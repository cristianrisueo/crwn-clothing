// Neccesary to create an app instance of Firebase
import { initializeApp } from "firebase/app";

/* 
  Libraries needed for authentication
  - getAuth is the instance of our Auth application in Firebase.
  - GoogleAuthProvider is the provider needed to get the authtoken from Google
  server and to check that token once it's sent back.
  - signInWithPopup is the function that will be executed in the frontend to auth.
  - createUserWithEmailAndPassword is the method to create an authenticated user 
  from email and password in firebase.
  - signInWithEmailAndPassword is the method that sign in a user if exists with
  email and password.
  - signOut is the function that will sign out the user in the firebase server.
  - onAuthStateChanged is a listener that is called when the state of the 
  authorizationis changed.
*/
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/*
  Libraries needed to store in the DB  
  - getFirestore is the instance of our Firestore application in Firebase.
  - doc retrieves documents from the Firestore collection.
  - getDoc gets the document data once we used doc.
  - setDoc sets the document data once we used doc.
  - collection allow us to get a colletion from Firebase.
  - query allow us to use queries that interact with the collection.
  - getDocs allow us to retrieve all the documents of collection using query.
*/
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

// Instance of Firestore
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

  /*
    Always returns the user document: if exists returns it
    otherwise returns the just created
  */
  return userDocument;
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

// Calls the method signOut to sign out from firebase
export const signOutUser = () => signOut(auth);

/*
  Calls the method onAuthStateChanged from Firebase passing auth
  which is the state that changes and callback which is the callback
  function that will be executed when it changes.
*/
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

/*
  This function creates updates a collection with the documents passed
  If the collection doesn't exist then creates a new one.
*/
export const addCollectionAndDocuments = async (
  collectionName,
  documentsToAdd
) => {
  // Gets the collection reference even if doesn't exist'
  const collectionReference = collection(firestoreDB, collectionName);

  // Loads the batch to work with the collections of Firestore
  const batchScript = writeBatch(firestoreDB);

  /*
    Foreach document to add in the file get the reference of that document
    which is the title and write that document with it's data in the collec.
  */
  documentsToAdd.forEach((document) => {
    const documentReference = doc(
      collectionReference,
      document.title.toLowerCase()
    );

    batchScript.set(documentReference, document);
  });

  // Await until finishe
  await batchScript.commit();
};

// Function that retrieves the documents from a collection of Firestore
export const getCategoriesAndDocuments = async () => {
  // Gets the collection reference
  const collectionReference = collection(firestoreDB, "categories");

  // Generates the query to return and documents
  const myQuery = query(collectionReference);
  const documentsArray = await getDocs(myQuery);

  // Object with the documents
  const categoriesObject = documentsArray.docs.reduce(
    (categoriesArray, documentsArray) => {
      // Destructures the documents array
      const { title, items } = documentsArray.data();

      // Sets the new array of categories and returns it
      categoriesArray[title.toLowerCase()] = items;
      return categoriesArray;
    },
    {}
  );

  return categoriesObject;
};
