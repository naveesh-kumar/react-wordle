import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "my-wordle-game.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: "my-wordle-game",
  storageBucket: "my-wordle-game.appspot.com",
  messagingSenderId: process.env.REACT_APP_MSGSENDERID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
