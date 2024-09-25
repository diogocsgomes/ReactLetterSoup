import React from "react";

function WordPanel(props) {
  const {
    words,
    wordStatus,
    diff,
    inputWord,
    addWord,
    btnaddWord,
    handleChangeAddWord,
    palavra,
    contAddWords,
  } = props;

  if (diff !== "0") {
    return (
      <div className="wordPanel">
        <ul>
          {words.map((word, i) => (
            <li key={i} className={wordStatus[i]}>
              {word}
            </li>
          ))}
        </ul>
        <label>
          <input
            type="text"
            id="addWord"
            className={contAddWords === 3 ? "gameStarted" : ""}
            placeholder="Adicionar palavra..."
            maxLength="10"
            ref={inputWord}
            onChange={handleChangeAddWord}
            value={palavra}
          ></input>
          <button
            className={`addWordBtn ${contAddWords === 3 ? "gameStarted" : ""}`}
            onClick={addWord}
            ref={btnaddWord}
          >
            +
          </button>
        </label>
      </div>
    );
  } else {
    return null;
  }
}

export default WordPanel;
