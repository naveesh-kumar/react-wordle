import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Button from "../Button/Button";
import "./Stats.css";

const Stats = ({ getLocalStorageData, clearLocalStorageData }) => {
  const { gamesPlayed, gamesWon } = getLocalStorageData();
  return (
    <>
      <div className="stats-container">
        <div className="item">
          <div className="value">{gamesPlayed}</div>
          <div className="desc">games played</div>
        </div>
        <div className="item">
          <div className="value">{gamesWon}</div>
          <div className="desc">games won</div>
        </div>
        <div className="item">
          <div className="value">
            {gamesPlayed !== 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0}
          </div>
          <div className="desc">% of wins</div>
        </div>
      </div>
      <Button
        buttonName="Clear Stats"
        icon={faTrash}
        clickHandler={clearLocalStorageData}
      />
    </>
  );
};

export default Stats;
