import React from "react";

const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const thirdRow = ["z", "x", "c", "v", "b", "n", "m"];

export const useKeyboard = (usedCharacters) => {
  const [firstRowLetters, setFirstRowLetters] = React.useState([]);
  const [secondRowLetters, setSecondRowLetters] = React.useState([]);
  const [thirdRowLetters, setThirdRowLetters] = React.useState([]);

  const refactorRowLetters = React.useCallback(
    (letters) => {
      let refactoredLetters = letters.map((letter) => {
        if (Object.keys(usedCharacters).includes(letter))
          return {
            ch: letter,
            color: usedCharacters[letter],
          };
        return letter;
      });
      return refactoredLetters;
    },
    [usedCharacters]
  );

  const checkIfUsedCharactersExist = React.useCallback(
    (letters) => {
      let isPresent = false;
      for (var i = 0; i < letters.length; i++) {
        if (Object.keys(usedCharacters).includes(letters[i]) && !isPresent) {
          isPresent = true;
        }
        if (isPresent) break;
      }
      return isPresent;
    },
    [usedCharacters]
  );

  React.useEffect(() => {
    let firstRowRefactoredLetters = checkIfUsedCharactersExist(firstRow)
      ? refactorRowLetters(firstRow)
      : firstRow;
    let secondRowRefactoredLetters = checkIfUsedCharactersExist(secondRow)
      ? refactorRowLetters(secondRow)
      : secondRow;
    let thirdRowRefactoredLetters = checkIfUsedCharactersExist(thirdRow)
      ? refactorRowLetters(thirdRow)
      : thirdRow;
    setFirstRowLetters(firstRowRefactoredLetters);
    setSecondRowLetters(secondRowRefactoredLetters);
    setThirdRowLetters(thirdRowRefactoredLetters);
  }, [refactorRowLetters, checkIfUsedCharactersExist]);

  return [firstRowLetters, secondRowLetters, thirdRowLetters];
};
