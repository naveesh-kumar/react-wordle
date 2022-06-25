import React from "react";
import Wordle from "./Components/Wordle/Wordle";
import Message from "./Components/Message/Message";
import Header from "./Components/Header/Header"
import { useWordle } from "./Hooks/useWordle";
import { useLocalStorage } from "./Hooks/useLocalStorage"
import "./App.css";

const API_URL = "http://localhost:5000/words";

function App() {
  const [randomWord, setRandomWord] = React.useState("");
  const [currentWordGuess, formattedWordGuesses, isWordGuessed, handleKeyUp, onHintClick] =
    useWordle(randomWord);
  const [getLocalStorageData] = useLocalStorage();

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
      <Header onHintClick={onHintClick} onStatsClick={getLocalStorageData}/>
      {console.log(randomWord)}
      <Wordle
        formattedWordGuesses={formattedWordGuesses}
        currentWordGuess={currentWordGuess}
      />

      {isWordGuessed!=null && (
        isWordGuessed===true ? <Message result="won"/> : <Message result="lost"/>
      )}
    </div>
  );
}

export default App;
