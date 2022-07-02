import React from "react";
import "./Keyboard.css";


const Keyboard = React.memo(({ handleKeyUp }) => {
  const firstRowLetters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const secondRowLetters = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const thirdRowLetters = ["z", "x", "c", "v", "b", "n", "m"];

  const clickHandler = (e) => {
    handleKeyUp({ key: e.target.getAttribute("data-key") });
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard-first-row">
        {firstRowLetters.map((letter, index) => {
          return (
            <div
              key={index}
              className="sm-key key"
              data-key={letter}
              onClick={clickHandler}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="keyboard-second-row">
        {secondRowLetters.map((letter, index) => {
          return (
            <div
              key={index}
              className="key sm-key"
              data-key={letter}
              onClick={clickHandler}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="keyboard-third-row">
        <div className="lg-key key" data-key="Backspace" onClick={clickHandler}>
          Back
        </div>
        {thirdRowLetters.map((letter, index) => {
          return (
            <div
              key={index}
              className="sm-key key"
              data-key={letter}
              onClick={clickHandler}
            >
              {letter}
            </div>
          );
        })}
        <div className="lg-key key" data-key="Enter" onClick={clickHandler}>
          Enter
        </div>
      </div>
    </div>
  );
})

export default Keyboard;
