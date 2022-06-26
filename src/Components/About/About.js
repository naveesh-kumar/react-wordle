import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <ul>
        <li>Guess the 5 letter hidden word in 6 tries</li>
        <li>
          Start guessing by typing the letters, for example, if the hidden word
          is CRANE and you typed GENRE,
        </li>
        <div className="row">
          <div className="grey flip">g</div>
          <div className="yellow flip">e</div>
          <div className="yellow flip">n</div>
          <div className="yellow flip">r</div>
          <div className="green flip">e</div>
        </div>
        <li>
          The color of the letter changes to show how much close you are to the
          hidden word
        </li>
        <ul>
          <li className="explanation">
            <div className="row">
              <div className="grey flip">g</div>
            </div>
            Gray letter signifies that letter guessed is not present in the
            hidden word
          </li>
          <li>
            <div className="row">
              <div className="yellow flip">e</div>
              <div className="yellow flip">n</div>
              <div className="yellow flip">r</div>
            </div>
            Yellow letter signifies that letter guessed is present in the hidden
            word but in wrong position
          </li>
          <li>
            <div className="row">
              <div className="green flip">g</div>
            </div>
            Green letter signifies that letter guessed is present in the hidden
            word and in the right position
          </li>
        </ul>
        <li>You are allowed to use one hint per game</li>
      </ul>
    </div>
  );
};

export default About;
