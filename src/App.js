import React from "react";
import Wordle from "./Components/Wordle/Wordle";
import Message from "./Components/Message/Message";
import { useWordle } from "./Hooks/useWordle";
import "./App.css";

const API_URL = "http://localhost:5000/words";

function App() {
  const [randomWord, setRandomWord] = React.useState("");
  const [currentWordGuess, formattedWordGuesses, isWordGuessed, handleKeyUp] =
    useWordle(randomWord);

  /*
   * fetching random word
   */
  React.useEffect(() => {
    (async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const wordObj = words[Math.floor(Math.random() * words.length)];
      setRandomWord(wordObj.word);
    })();
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
      <h2>My Wordle Game</h2>
      {console.log(randomWord)}
      <Wordle
        formattedWordGuesses={formattedWordGuesses}
        currentWordGuess={currentWordGuess}
      />

      {isWordGuessed!=null && (
        isWordGuessed===true ? <Message message="You won"/> : <Message message="You lost"/>
      )}
    </div>
  );
}

export default App;
