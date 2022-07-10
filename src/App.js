import React, { Suspense } from "react";
import Header from "./Components/Header/Header";
import Message from "./Components/Message/Message";
import { useWordle } from "./Hooks/useWordle";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Keyboard from "./Components/Keyboard/Keyboard";

import { ref, child, get } from "firebase/database";
import db from "./Firebase/firebaseConfig";

const Wordle = React.lazy(() => import("./Components/Wordle/Wordle"));
const Stats = React.lazy(() => import("./Components/Stats/Stats"));
const About = React.lazy(() => import("./Components/About/About"));
const DidNotMatch = React.lazy(() =>
  import("./Components/DidNotMatch/DidNotMatch")
);

function App() {
  const [randomWord, setRandomWord] = React.useState("");
  const [
    currentWordGuess,
    formattedWordGuesses,
    isWordGuessed,
    handleKeyUp,
    onHintClick,
    usedCharacters
  ] = useWordle(randomWord);
  const [getLocalStorageData] = useLocalStorage();

  /*
   * fetching random word
   */
  React.useEffect(() => {
    get(child(ref(db), `words`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const words = snapshot.val();
          const wordObj = words[Math.floor(Math.random() * words.length)];
          setRandomWord(wordObj.word);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /*
   * capturing keyboard events
   */
  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className="App">
      <Header onHintClick={onHintClick} />
      <div className="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Wordle
                    formattedWordGuesses={formattedWordGuesses}
                    currentWordGuess={currentWordGuess}
                  />
                    <div class="message-container">{isWordGuessed != null &&
                    (isWordGuessed === true ? (
                      <Message result="won" />
                    ) : (
                      <Message result="lost" word={randomWord} />
                    ))}</div>
                    <Keyboard handleKeyUp={handleKeyUp} usedCharacters={usedCharacters}/>
                </>
              }
            />
            <Route
              path="/stats"
              element={<Stats getLocalStorageData={getLocalStorageData} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<DidNotMatch />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
