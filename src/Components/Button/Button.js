import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

const Button = ({ buttonName, icon, reload, onHintClick, onStatsClick }) => {
  
  return (
    <button onClick={reload || onHintClick || onStatsClick} >
      {buttonName} <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default Button;
