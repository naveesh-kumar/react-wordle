import React from 'react';
import "./Row.css";

const Row = ({ guess, currentWordGuess }) => {
  if (guess) {
    return (
      <div className="row">
        {guess.map((obj, index) => {
          return (
            <div key={index} className={`${obj.color} flip flip${index}`}>
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
          return (
            <div key={index} className="pop">
              {ch}
            </div>
          );
        })}
        {[...Array(5 - currentWordGuessArray.length)].map((val, index) => {
          return <div key={index}></div>;
        })}
      </div>
    );
  }

  return (
    <div className="row">
      {[...Array(5)].map((val, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
};

export default Row;