import React from "react";
import { useKeyboard } from "../../Hooks/useKeyboard";
import KeyboardRow from "./KeyboardRow";
import "./Keyboard.css";

const Keyboard = ({ handleKeyUp, usedCharacters }) => {
  const [firstRowLetters, secondRowLetters, thirdRowLetters] =
    useKeyboard(usedCharacters);

  const clickHandler = (e) => {
    const key = e.target.getAttribute("data-key");
    handleKeyUp({ key });
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard-first-row">
        <KeyboardRow rowLetters={firstRowLetters} clickHandler={clickHandler}/>
      </div>
      <div className="keyboard-second-row">
      <KeyboardRow rowLetters={secondRowLetters} clickHandler={clickHandler}/>
      </div>
      <div className="keyboard-third-row">
        <div className="lg-key key" data-key="Backspace" onClick={clickHandler}>
          Back
        </div>
        <KeyboardRow rowLetters={thirdRowLetters} clickHandler={clickHandler}/>
        <div className="lg-key key" data-key="Enter" onClick={clickHandler}>
          Enter
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
