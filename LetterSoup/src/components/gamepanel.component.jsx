import React from "react";

function GamePanel(props) {
  const { table, diff, gameStarted, dragStart, dragSelect, dragEnd } = props;

  if (diff !== "0") {
    return (
      <div className="panel">
        {table.map((row, i) => (
          <div key={i}>
            {row.map((letter, j) => (
              <button
                disabled={!gameStarted}
                onMouseOver={dragSelect}
                onMouseDown={dragStart}
                onMouseUp={dragEnd}
                className="letter-button"
                key={j}
              >
                {gameStarted ? letter : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default GamePanel;
