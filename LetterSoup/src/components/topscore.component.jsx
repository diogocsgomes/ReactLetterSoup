import React from "react";

function TopScore(props) {
  const { diff } = props;
  if (diff === "0") {
    return (
      <div className="TopScores">
        <h1>Top Scores</h1>
        <ul>
          <li>PLACEHOLDER (NOME) | PLACEHOLDER (SCORE)</li>
          <li>PLACEHOLDER (NOME) | PLACEHOLDER (SCORE)</li>
          <li>PLACEHOLDER (NOME) | PLACEHOLDER (SCORE)</li>
          <li>PLACEHOLDER (NOME) | PLACEHOLDER (SCORE)</li>
          <li>PLACEHOLDER (NOME) | PLACEHOLDER (SCORE)</li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default TopScore;
