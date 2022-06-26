import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaApT4WRhvGuWALn0rmNMRW1gc82oMp1g",
  authDomain: "my-wordle-game.firebaseapp.com",
  databaseURL: "https://my-wordle-game-default-rtdb.firebaseio.com",
  projectId: "my-wordle-game",
  storageBucket: "my-wordle-game.appspot.com",
  messagingSenderId: "842345318858",
  appId: "1:842345318858:web:844bf021490ca78457a733",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
