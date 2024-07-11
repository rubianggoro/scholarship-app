import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "uploadfile-b83a9.firebaseapp.com",
  projectId: "uploadfile-b83a9",
  storageBucket: "uploadfile-b83a9.appspot.com",
  messagingSenderId: "1028360289897",
  appId: "1:1028360289897:web:3c51a525b98c278eedecf8",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
