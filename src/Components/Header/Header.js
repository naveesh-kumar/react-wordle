import {
  faCalculator,
  faInfoCircle,
  faLightbulb,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Button from "../Button/Button";
import "./Header.css";

const Header = ({ onHintClick, onStatsClick }) => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="header-container">
      <div>My Wordle Game</div>
      <div className="header-nav-buttons">
        <Button buttonName="Play Again" icon={faRefresh} reload={reload} />
        <Button
          buttonName="Hint"
          icon={faLightbulb}
          onHintClick={(btnRef) => onHintClick(btnRef)}
        />
        <Button buttonName="Stats" icon={faCalculator} onStatsClick={onStatsClick}/>
        <Button buttonName="About" icon={faInfoCircle} />
      </div>
    </div>
  );
};

export default Header;
