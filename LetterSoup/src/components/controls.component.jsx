import React from "react";

function Controls(props) {
  const {
    diff,
    onDiffChange,
    gameStarted,
    onGameStart,
    timer,
    score,
    inputName,
  } = props;
  return (
    <div className="panel">
      <form autoComplete="off">
        <label htmlFor="nome">Name: </label>
        <input
          disabled={gameStarted}
          placeholder="Name..."
          id="nome"
          type="text"
          ref={inputName}
        ></input>
        <label htmlFor="dificuldade">Dificulty: </label>
        <select
          id="dificuldade"
          value={diff}
          onChange={onDiffChange}
          disabled={gameStarted}
        >
          <option value="0">Select a Dificulty</option>
          <option value="1">Easy</option>
          <option value="2">Normal</option>
          <option value="3">Hard</option>
        </select>
        <button
          type="button"
          id="inicio"
          className={gameStarted ? "gameStarted" : ""}
          disabled={diff === "0"}
          onClick={onGameStart}
        >
          {gameStarted ? "Stop Game" : "Start Game"}
        </button>
        <div className="timerscore-container">
          <div
            className={`timer ${timer <= 10 ? "end" : ""} ${
              diff === "0" ? "" : "diff"
            }`}
          >
            {diff === "0" ? "" : "Time: "}
            <span>{diff === "0" ? "" : timer}</span>
          </div>
          <div className={`score ${diff === "0" ? "" : "diff"}`}>
            {diff === "0" ? "" : "Points: "}
            <span>{diff === "0" ? "" : score}</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Controls;
