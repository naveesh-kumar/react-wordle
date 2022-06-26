import React from "react";
import './Stats.css'

const Stats = ({getLocalStorageData}) =>{

  const {gamesPlayed, gamesWon} = getLocalStorageData();
  return <div className="stats-container">
    <div className="item">
      <div className="value">{gamesPlayed}</div>
      <div className="desc">games played</div>
    </div>
    <div className="item">
      <div className="value">{gamesWon}</div>
      <div className="desc">games won</div>
    </div>
    <div className="item">
      <div className="value">{gamesPlayed!==0 ? (Math.round((gamesWon/gamesPlayed)*100)) : 0}</div>
      <div className="desc">% of wins</div>
    </div>
  </div>
}

export default Stats;