import React from "react";
import Row from "../Row/Row"

const Wordle = ({formattedWordGuesses, currentWordGuess})=>{
  return (
    <div className="wordle">
        {formattedWordGuesses.map((guessArray, index) => {
          return <Row key={index} guess={guessArray} />;
        })}
        {[...Array(6 - formattedWordGuesses.length)].map((val, index) => {
          return (
            <Row
              key={index}
              guess={val}
              currentWordGuess={index === 0 ? currentWordGuess : null}
            />
          );
        })}
      </div>
  )
}

export default Wordle;