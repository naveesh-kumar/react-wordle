import React from "react";

export const useLocalStorage = () => {
  const [data, setData] = React.useState(getLocalStorageData);

  function getLocalStorageData() {
    let wordle_data = JSON.parse(localStorage.getItem("my-wordle-game")) || {
      gamesPlayed: 0,
      gamesWon: 0,
    };
    return wordle_data;
  }

  function setLocalstorageData(result) {
    let newData = { ...data, gamesPlayed: data.gamesPlayed + 1 };

    if (result === "won") {
      newData = { ...newData, gamesWon: newData.gamesWon + 1 };
    }
    localStorage.setItem("my-wordle-game", JSON.stringify(newData));
    setData(newData);
  }

  return [getLocalStorageData, setLocalstorageData];
};
