import React from 'react';
import './App.css';

const API_URL = "http://localhost:5000/words";

function App() {

  const [randomWord, setRandomWord] = React.useState("");

  //fetching random word
  React.useEffect(()=>{
    (async ()=>{
      const response = await fetch(API_URL);
      const words = await response.json();
      const wordObj = words[Math.floor(Math.random()*words.length)];
      setRandomWord(wordObj.word);
    })()
  },[setRandomWord])


  return (
    <div className="App">
      <h2>My Wordle Game</h2>
      {randomWord && <div>{randomWord}</div>}
    </div>
  );
}

export default App;
