import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import wordExists from "word-exists";

export const useWordle = (randomWord) => {
  const [currentWordGuess, setCurrentWordGuess] = React.useState("");
  const [formattedWordGuesses, setFormattedWordGuesses] = React.useState([]);
  const [unformattedWordGuesses, setUnformattedGuesses] = React.useState([]);
  const [isWordGuessed, setIsWordGuessed] = React.useState(null);
  const [, setLocalstorageData] = useLocalStorage();
  const [usedCharacters, setUsedCharacters] = React.useState({});

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

    setUnformattedGuesses((prevGuesses) => {
      return [...prevGuesses, currentWordGuess];
    });

    if (randomWord === currentWordGuess.toLowerCase()) {
      setIsWordGuessed(true);
      setLocalstorageData("won");
    }
    setCurrentWordGuess("");
  };

  /*
   * add used characters
   */
  const addUsedCharacters = (formattedGuess) => {
    const newCharObj = formattedGuess.reduce((charObj, obj) => {
        charObj[obj.guess] = obj.color;
      return charObj;
    }, {});

    const newUsedCharactersobj = Object.assign({},usedCharacters, newCharObj);
    setUsedCharacters(newUsedCharactersobj);
  };
  /**
   * handling keyup event
   */

  const handleKeyUp = ({ key }) => {
    if (isWordGuessed) {
      return;
    }

    //not to update guesses if user guesses 6 times
    if (formattedWordGuesses.length > 5) {
      setIsWordGuessed(false);
      setLocalstorageData("lost");
      return;
    }
    //if entered key is Enter
    if (key === "Enter") {
      //If entered key is not a valid word
      if (!wordExists(currentWordGuess)) {
        alert("Not a valid word");
        return;
      }

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
      addUsedCharacters(formattedGuess);
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
        key = key.toLowerCase();
        return prevGuess + key;
      });
    }
  };

  /**
   * on hint button pressed in the header
   */

  const onHintClick = (btn) => {
    if (formattedWordGuesses.length > 0 && !isWordGuessed) {
      //find index which has gray color
      let firstUnknownLetterIndex = formattedWordGuesses[
        formattedWordGuesses.length - 1
      ].findIndex((charObj) => {
        return charObj.color === "grey";
      });
      //matching letter for the unknown index from random word
      let matchingLetter = randomWord[firstUnknownLetterIndex];

      setCurrentWordGuess(() => {
        let newGuess =
          unformattedWordGuesses[unformattedWordGuesses.length - 1].slice(
            0,
            firstUnknownLetterIndex
          ) + matchingLetter;
        return newGuess;
      });
      //disable button after one hint
      btn.target.disabled = true;
    }
  };

  return [
    currentWordGuess,
    formattedWordGuesses,
    isWordGuessed,
    handleKeyUp,
    onHintClick,
    usedCharacters,
  ];
};
