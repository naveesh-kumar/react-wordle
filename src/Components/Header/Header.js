import {
  faCalculator,
  faInfoCircle,
  faLightbulb,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Header.css";

const Header = ({ onHintClick }) => {

  const reload = () => {
    window.location.href="/";
  };

  return (
    <div className="header-container">
      <Link to="/"><div className="header">My Wordle Game</div></Link>
      <div className="header-nav-buttons">
        <Button buttonName="Play Again" icon={faRefresh} reload={reload} />
        <Button
          buttonName="Hint"
          icon={faLightbulb}
          onHintClick={(btnRef) => onHintClick(btnRef)}
        />
        <Link to="/stats"><Button buttonName="Stats" icon={faCalculator} /></Link>
        <Link to="/about"><Button buttonName="About" icon={faInfoCircle} /></Link>
      </div>
    </div>
  );
};

export default Header;
