import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

const Button = ({ buttonName, icon, clickHandler }) => {
  
  return (
    <button onClick={clickHandler} >
      {buttonName} <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default Button;
