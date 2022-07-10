import React from "react";

const KeyboardRow = ({ rowLetters, clickHandler }) => {
  return (
    <>
      {rowLetters.map((letter, index) => {
        const isLetterObj = typeof letter === "object";
        return (
          <div
            key={index}
            className={
              isLetterObj ? "sm-key key " + letter.color : "sm-key key"
            }
            data-key={isLetterObj ? letter.ch : letter}
            onClick={clickHandler}
          >
            {isLetterObj ? letter.ch : letter}
          </div>
        );
      })}
    </>
  );
};

export default KeyboardRow;
