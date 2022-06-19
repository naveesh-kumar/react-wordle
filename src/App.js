import React from "react";
import "./App.css";

const API_URL = "http://localhost:5000/words";

function App() {
  const [randomWord, setRandomWord] = React.useState("");
  const [currentWordGuess, setCurrentWordGuess] = React.useState("");
  const [wordGuesses, setWordGuesses] = React.useState([]);
  const [isWordGuessed, setIsWordGuessed] = React.useState(false);

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
  }, [setRandomWord]);

  /*
   * formatting guesses to include color
   */

  const formatGuess = () => {
    const randomWordArray = [...randomWord];
    const currentWordGuessArray = [...currentWordGuess];

    //creating general object and add gray
    const formattedGuess = currentWordGuessArray.map((ch) => {
      return { guess: ch, color: "grey" };
    });

    //finding green letters
    formattedGuess.forEach((obj, index) => {
      if (randomWordArray[index] === currentWordGuessArray[index]) {
        obj.color = "green";
        randomWordArray[index] = null;
      }
    });

    //finding yellow letters
    formattedGuess.forEach((obj, index) => {
      if (
        randomWordArray.includes(currentWordGuessArray[index]) &&
        obj.color !== "green"
      ) {
        obj.color = "yellow";
        randomWordArray[randomWordArray.indexOf(obj.guess)] = null;
      }
    });

    return formattedGuess;
  };

  /*
   * adding formatted guesses to array
   */
  const addGuesses = (formattedGuess) => {
    setWordGuesses((prevGuesses) => {
      return [...prevGuesses, formattedGuess];
    });

    if (randomWord === currentWordGuess.toLowerCase()) {
      setIsWordGuessed(true);
    }
    setCurrentWordGuess("");
  };

  /*
   * handling keyup event
   */

  const handleKeyUp = ({ key }) => {
    if(isWordGuessed){
      return;
    }
    //if entered key is Enter
    if (key === "Enter") {
      //not to update guesses if current guess  length is less than 5
      if (currentWordGuess.length < 5) {
        alert("Please enter 5 character word");
        return;
      }

      //not to update guesses if the guess already exists
      // if (
      //   wordGuesses.findIndex(
      //     (guessObj) => guessObj.guess === currentWordGuess
      //   ) > -1
      // ) {
      //   alert("Guess already exists");
      //   return;
      // }

      //not to update guesses if user guesses 6 times
      if (wordGuesses.length > 5) {
        alert("Sorry, guess limit exceeded");
        return;
      }
      const formattedGuess = formatGuess();
      addGuesses(formattedGuess);
    }

    //if entered key is Backspace
    if (key === "Backspace") {
      setCurrentWordGuess((prevGuess) => {
        return prevGuess.slice(0, -1);
      });
      return;
    }

    //if entered key is letter
    let regex = new RegExp("^[A-Za-z]$");
    if (regex.test(key) && currentWordGuess.length < 5) {
      setCurrentWordGuess((prevGuess) => {
        return prevGuess + key;
      });
    }
  };

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
     
      <div className="wordle">
        {wordGuesses.map((guessArray, index) => {
          return <Row key={index} guess={guessArray} />;
        })}
        {[...Array(6 - wordGuesses.length)].map((val, index) => {
          return  <Row
          key={index}
          guess={val}
          currentWordGuess={index===0 ? currentWordGuess:null}
        />
        })}
      </div>

      {isWordGuessed && <div>Congratulations, you have guessed the word correctly.</div>}
    </div>
  );
}

const Row = ({ guess, currentWordGuess }) => {
  if (guess) {
    return (
      <div className="row">
        {guess.map((obj, index) => {
          return (
            <div key={index} className={obj.color}>
              {obj.guess}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentWordGuess) {
    const currentWordGuessArray = [...currentWordGuess];
    return (
      <div className="row">
        {currentWordGuessArray.map((ch, index) => {
          return <div key={index} className="pop">{ch}</div>;
        })}
        {[...Array(5 - currentWordGuessArray.length)].map((val, index) => {
          return <div key={index}></div>;
        })}
      </div>
    );
  }

    return (
      <div className="row">
        {[...Array(5)].map((val,index)=>{
          return <div key={index}></div>
        })}
      </div>
    )
  
};

export default App;
