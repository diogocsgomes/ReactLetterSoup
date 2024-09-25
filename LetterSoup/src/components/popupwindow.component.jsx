import React from "react";

function PopUpWindow(props) {
  const { popup, handleClosePopup, score, namePlayer } = props;
  return (
    <div className={`popup-container ${popup ? "show" : ""}`}>
      <div className="popup">
        <h1>Jogo Terminado!</h1>
        <p>{`Parabéns ${namePlayer}!`}</p>
        <p>{`Conseguiste um total de ${score} pontos`}</p>
        <button className="fechar-Popup" onClick={handleClosePopup}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default PopUpWindow;
