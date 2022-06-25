import React from 'react';

export const useWordle = (randomWord)=>{

  const [currentWordGuess, setCurrentWordGuess] = React.useState("");
  const [formattedWordGuesses, setFormattedWordGuesses] = React.useState([]);
  const [unformattedWordGuesses, setUnformattedGuesses] = React.useState([]);
  const [isWordGuessed, setIsWordGuessed] = React.useState(null);

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
   * adding formatted and unformatted guesses to array
   */
  const addGuesses = (formattedGuess) => {
    setFormattedWordGuesses((prevGuesses) => {
      return [...prevGuesses, formattedGuess];
    });

    setUnformattedGuesses(prevGuesses=>{
      return [...prevGuesses, currentWordGuess]
    })

    if (randomWord === currentWordGuess.toLowerCase()) {
      setIsWordGuessed(true);
    }
    setCurrentWordGuess("");
  };

  /*
   * handling keyup event
   */

  const handleKeyUp = ({ key }) => {
    if (isWordGuessed) {
      return;
    }

    //not to update guesses if user guesses 6 times 
    if (formattedWordGuesses.length >5) {
      setIsWordGuessed(false)
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
      if (unformattedWordGuesses.includes(currentWordGuess)) {
        alert("Guess already exists");
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

  return [currentWordGuess, formattedWordGuesses, isWordGuessed, handleKeyUp];

}
