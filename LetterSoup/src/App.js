import "./App.css";
import { Title, Controls, GamePanel, WordPanel, Footer, PopUpWindow } from "./components/index";
import { useEffect, useState, useRef } from "react";

let max; // Limite timer
let timerId = undefined;

let numLinhas;
let numCol;
let table = [numLinhas]; // Tabela Letras
let auxtable = [numLinhas]; // Tabela auxiliar

let s = 0; // Index_Array Letras
let selection = []; // Array Letras
let boxs = []; // Array Elementos HTML

let score = 0; // Pontuação Jogador

let contAddWords = 0; // Palavras adicionadas 

function App() {

  // let orientacao = [0, 1, 2, 3, 4, 5];
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const [diff, setDiff] = useState("0");
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [drag, setDrag] = useState(false);
  const [popup, setPopUp] = useState(false);
  const inputName = useRef(null);
  const [namePlayer, setNamePlayer] = useState("");
  const inputWord = useRef(null);
  const btnaddWord = useRef(null);
  const [words, setWords] = useState(["APPLE", "ORANGE", "PEAR", "PINAPLE", "BANANA", "CHERRY"]);
  const [wordStatus, setWordStatus] = useState(["", "", "", "", "", ""]);
  const [palavra, setPalavra] = useState('');


  // Preenchimento da Grelha de Letras
  function TableSet() {

    // Cria um array bidimensional
    for (let i = 0; i < numCol; i++) {
      table[i] = [numCol];
      auxtable[i] = [numCol];
    }

    //Define valores aletorios para este array
    for (var j = 0; j < numLinhas; j++) {
      for (var y = 0; y < numCol; y++) {
        var aux = alphabet[Math.floor(Math.random() * 26)];
        table[j][y] = aux;
        auxtable[j][y] = "";
      }
    }


    let RandomIndex_Colum;

    let RandomIndex_Line;

    let x;
    let flagSet;

    for (let i = 0; i < words.length; i++) {
      let length = words[i].length;


      // console.log("Words Tamanho: " + words.length);
      // console.log("num linhs: " + numLinhas);
      // console.log("num col: " + numCol);
      // console.log("i :" + i);

      let z = 0;
      let flag;

      let orientacao_aleatoria = Math.floor(Math.random() * 8);


      switch (orientacao_aleatoria) {
        case 0:
          //Coluna cima para baixo

          //Definir onde e que a palavra vai ser printada
          do {
            RandomIndex_Line = Math.floor(Math.random() * (numLinhas - length));
            RandomIndex_Colum = Math.floor(Math.random() * numCol);

            for (x = RandomIndex_Line, z = 0, flagSet = 0; x < length + RandomIndex_Line; x++, z++) {
              aux = words[i][z];
              if (table[x][RandomIndex_Colum] !== aux && auxtable[x][RandomIndex_Colum] === "SET") {
                flagSet = 1;
              }
            }
          } while (flagSet === 1);

          for (x = RandomIndex_Line, z = 0; x < length + RandomIndex_Line; x++, z++) {

            aux = words[i][z];
            console.log(RandomIndex_Colum);
            console.log(aux);


            table[x][RandomIndex_Colum] = aux;
            auxtable[x][RandomIndex_Colum] = "SET";

          }

          break;

        case 1:
          //Baixo para cima


          //Definir onde e que a palavra vai ser printada 
          do {
            RandomIndex_Line = Math.floor(Math.random() * (numLinhas - length));
            RandomIndex_Colum = Math.floor(Math.random() * numCol);

            for (x = RandomIndex_Line + length, z = 0, flagSet = 0; x > RandomIndex_Line; x--, z++) {
              aux = words[i][z];
              if (table[x][RandomIndex_Colum] !== aux && auxtable[x][RandomIndex_Colum] === "SET") {
                flagSet = 1;
              }
            }

          } while (flagSet === 1);

          for (x = RandomIndex_Line + length, z = 0; x > RandomIndex_Line; x--, z++) {
            aux = words[i][z];

            table[x][RandomIndex_Colum] = aux;
            auxtable[x][RandomIndex_Colum] = "SET";
          }

          break;

        case 2:
          //Esquerda para direita

          do {
            RandomIndex_Line = Math.floor(Math.random() * numLinhas);
            RandomIndex_Colum = Math.floor(Math.random() * (numCol - length));

            for (x = RandomIndex_Colum, z = 0, flagSet = 0; x < RandomIndex_Colum + length; x++, z++) {
              aux = words[i][z];
              if (table[RandomIndex_Line][x] !== aux && auxtable[RandomIndex_Line][x] === "SET") {
                flagSet = 1;
              }

            }

          } while (flagSet === 1);

          for (x = RandomIndex_Colum, z = 0; x < RandomIndex_Colum + length; x++, z++) {
            aux = words[i][z];

            table[RandomIndex_Line][x] = aux;
            auxtable[RandomIndex_Line][x] = "SET";
          }


          break;
        case 3:
          //Direita para esquerda
          do {
            RandomIndex_Line = Math.floor(Math.random() * numLinhas);
            RandomIndex_Colum = Math.floor(Math.random() * (numCol - length));

            for (x = RandomIndex_Colum + length, z = 0, flagSet = 0; x > RandomIndex_Colum; x--, z++) {
              aux = words[i][z];
              if (table[RandomIndex_Line][x] !== aux && auxtable[RandomIndex_Line][x] === "SET") {
                flagSet = 1;
              }

            }

          } while (flagSet === 1);

          for (x = RandomIndex_Colum + length, z = 0; x > RandomIndex_Colum; x--, z++) {
            aux = words[i][z];

            table[RandomIndex_Line][x] = aux;
            auxtable[RandomIndex_Line][x] = "SET";
          }

          break;
        case 4:
          //Diagonal esquerda direita Cima baixo
          do {
            RandomIndex_Line = Math.floor(Math.random() * (numLinhas - length));
            RandomIndex_Colum = Math.floor(Math.random() * (numCol - length));
            for (x = RandomIndex_Colum, j = RandomIndex_Line, z = 0, flagSet = 0; x < RandomIndex_Colum + length; x++, j++, z++) {
              aux = words[i][z];
              if (table[j][x] !== aux && auxtable[j][x] === "SET") {
                flagSet = 1;
              }
            }
          } while (flagSet === 1);

          for (x = RandomIndex_Colum, j = RandomIndex_Line, z = 0; x < RandomIndex_Colum + length; x++, j++, z++) {
            aux = words[i][z];
            table[j][x] = aux;
            auxtable[j][x] = "SET";
          }

          break;
        case 5:
          //Diagonal esquerda direita baixo cima
          do {
            RandomIndex_Line = Math.floor(Math.random() * (numLinhas - length));
            RandomIndex_Colum = Math.floor(Math.random() * (numCol - length));

            for (x = RandomIndex_Colum + length, j = RandomIndex_Line + length, z = 0, flagSet = 0; x > RandomIndex_Colum; x--, j--, z++) {
              aux = words[i][z];
              if (table[j][x] !== aux && auxtable[j][x] === "SET") {
                flagSet = 1;
              }
            }

          } while (flagSet === 1);

          for (x = RandomIndex_Colum + length, j = RandomIndex_Line + length, z = 0; x > RandomIndex_Colum; x--, j--, z++) {
            aux = words[i][z];
            table[j][x] = aux;
            auxtable[j][x] = "SET";
          }

          break;

        case 6:
          // Diagonal direita esquerda cima baixo

          do {
            RandomIndex_Line = Math.floor(Math.random() * (numLinhas - length));

            do {
              RandomIndex_Colum = Math.floor(Math.random() * numCol)
              flag = RandomIndex_Colum;
            } while (flag - length < 0);

            for (x = RandomIndex_Colum, j = RandomIndex_Line, z = 0, flagSet = 0; j < RandomIndex_Line + length; x--, j++, z++) {
              aux = words[i][z];
              if (table[j][x] !== aux && auxtable[j][x] === "SET") {
                flagSet = 1;
              }
            }


          } while (flagSet === 1);
          for (x = RandomIndex_Colum, j = RandomIndex_Line, z = 0; j < RandomIndex_Line + length; x--, j++, z++) {
            aux = words[i][z];
            table[j][x] = aux;
            auxtable[j][x] = "SET";
          }

          break;

        default:
          // Diagonal direita esquerda baixo cima

          do {
            RandomIndex_Line = Math.floor(Math.random() * (numLinhas - length));

            do {
              RandomIndex_Colum = Math.floor(Math.random() * numCol)
              flag = RandomIndex_Colum;
            } while (flag - length < 0);

            for (x = RandomIndex_Colum, j = RandomIndex_Line + length, z = 0, flagSet = 0; j > RandomIndex_Line; x--, j--, z++) {
              aux = words[i][z];
              if (table[j][x] !== aux && auxtable[j][x] === "SET") {
                flagSet = 1;
              }
            }

          } while (flagSet === 1);


          for (x = RandomIndex_Colum, j = RandomIndex_Line + length, z = 0; j > RandomIndex_Line; x--, j--, z++) {
            aux = words[i][z];
            table[j][x] = aux;
            auxtable[j][x] = "SET";
          }

          break;


      }
    }
  }

  //Adicionar Palavra a Array Words
  const addWord = () => {
    if (contAddWords < 3 && inputWord.current.value !== "") {
      let aux = inputWord.current.value.toUpperCase();
      words.push(aux);
      wordStatus.push("");

      // copia o array para um novo array identico para efetuar re-render
      setWords([...words]);
      setWordStatus([...wordStatus]);

      contAddWords++;
    }
  }

  //Não permite número input add palavras
  const handleChangeAddWord = (e) => {
    const result = e.target.value.replace(/[^a-z]/gi, '');
    setPalavra(result);
  }

  //Funções Drag - Select
  //Função Drag - Select ( Start )
  const dragStart = (e) => {
    if (!drag) {

      // Verificações Classe ( evitar duplicação )
      if (e.target.className === "letter-button correct") {
        selection[s] = e.target.innerText;
        boxs[s] = e.target;
        setDrag(true);
        s++;
        e.target.className += " selected";
      } else if (e.target.className === "letter-button") {
        selection[s] = e.target.innerText;
        boxs[s] = e.target;
        setDrag(true);
        s++;
        e.target.className += " selected";
      }

    }
  }

  //Função Drag - Select ( Drag com Select )
  const dragSelect = (e) => {
    if (drag) {


      // Verificações Classe ( evitar duplicação )
      if (e.target.className === "letter-button correct") {
        selection[s] = e.target.innerText;
        boxs[s] = e.target;
        s++;
        e.target.className += " selected";
      } else if (e.target.className === "letter-button") {
        selection[s] = e.target.innerText;
        boxs[s] = e.target;
        s++;
        e.target.className += " selected";
      }

      // console.log(selection);
    }
  }

  //Função Drag - Select ( End )
  const dragEnd = (e) => {
    if (drag) {
      let scoreTemp = 0;
      let container = {
        st: [],
      };

      setDrag(false);
      s = 0;
      let flag = 0; // Flag de Palavra Encontrada ( 0 = N || 1 = N)

      //Verificação Palavra ( Esquerda -> Direita )
      container.st = "";

      // Meter valores array selection na string st
      for (let w = 0; w < selection.length; w++) {
        container.st += selection[w];
      }

      // Ciclo Verificação 
      for (let w = 0; w < words.length && flag === 0; w++) {
        if (container.st === words[w] && wordStatus[w] === "") {
          flag = 1;
          wordStatus[w] = "checked";
          setWordStatus([...wordStatus]);
          boxs.forEach(element => {
            element.className = "letter-button correct";
            scoreTemp++;
          });
        }
      }

      //Verificação Palavra ( Esquerda <- Direita )
      if (flag === 0) {
        container.st = "";

        // Meter valores array selection na string st
        for (let w = selection.length - 1; w >= 0; w--) {
          container.st += selection[w];
        }

        // Ciclo Verificação 
        for (let w = 0; w < words.length; w++) {
          if (container.st === words[w] && wordStatus[w] === "") {
            flag = 1;
            wordStatus[w] = "checked";
            setWordStatus([...wordStatus]);

            boxs.forEach(element => {
              element.className = "letter-button correct";
              scoreTemp++;
            });
          }
        }
      }

      //Remover Class Selected ( Palavra Errada )
      for (let w = 0; w < boxs.length && flag === 0; w++) {
        boxs[w].className === "letter-button correct selected" ||
          boxs[w].className === "letter-button correct" ? // Evitar elementos com classe já alterada (caso estejam duplicados no array)
          boxs[w].className = "letter-button correct" : boxs[w].className = "letter-button";
      }
      console.log(container.st);
      selection.splice(0, selection.length);
      boxs.splice(0, boxs.length);
      score += Math.floor(scoreTemp * (timer / 2)); // Atualiza Score

      var cntCheck = 0;
      for (let w = 0; w < wordStatus.length; w++) {
        if (wordStatus[w] === "checked") {
          cntCheck++;
        }
      }
      console.log(cntCheck);
      if (cntCheck === words.length) {
        handleGameStart();
      }
    }
  }

  // timer--
  useEffect(() => {
    if (gameStarted) {
      let timerAux;
      timerId = setInterval(() => {
        setTimer((previousState) => {
          timerAux = previousState - 1;
          return timerAux;
        });
        if (timerAux === 0) {
          setGameStarted(false);
          setPopUp(true);
          setTimer(0);
        }
      }, 1000);
    } else if (timer !== max && popup) {
      setTimer(timer);
    } else if (timer !== max) {
      setTimer(max);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted]);

  // Handle Inicio Jogo
  const handleGameStart = () => {
    let aux = inputName.current.value;
    if (aux === "") {
      setNamePlayer("Anónimo");
    } else {
      setNamePlayer(aux);
    }
    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
      setPopUp(true);
    } else {
      console.log("Inicia Jogo");
      setGameStarted(true);
      TableSet();
      score = 0;
      inputWord.current.className = "gameStarted";
      btnaddWord.current.className = "addWordBtn gameStarted"
    }
  }

  // Fechar POPUP WINDOW
  const handleClosePopup = () => {

    setPopUp(false);
    score = 0;
    selection.splice(0, selection.length);
    s = 0;
    setDiff("0");
    setWords(["APPLE", "ORANGE", "PEAR", "PINAPLE", "BANANA", "CHERRY"]);
    setWordStatus(["", "", "", "", "", ""]);
    contAddWords = 0;
    inputWord.current.className = "";
    btnaddWord.current.className = "addWordBtn"
    setPalavra('');
  }



  // Handle alteração dificuldade
  const handleDiffChange = (e) => {
    const value = e.target.value;
    setDiff(value);
    switch (value) {
      case "1":
        table.length = 0;
        auxtable.length = 0;
        max = 50;
        numLinhas = 14;
        numCol = 14;
        contAddWords = 0;
        setWords(["APPLE", "ORANGE", "PEAR", "PINAPLE", "BANANA", "CHERRY"]);
        setWordStatus(["", "", "", "", "", ""]);
        break;
      case "2":
        table.length = 0;
        auxtable.length = 0;
        max = 100;
        numLinhas = 16;
        numCol = 16;
        contAddWords = 0;
        setWords(["APPLE", "ORANGE", "PEAR", "PINAPLE", "BANANA", "CHERRY", "GRAPE", "PLUM"]);
        setWordStatus(["", "", "", "", "", "", "", ""]);
        break;
      case "3":
        table.length = 0;
        auxtable.length = 0;
        max = 150;
        numLinhas = 18;
        numCol = 18;
        contAddWords = 0;
        setWords(["APPLE", "ORANGE", "PEAR", "PINAPLE", "BANANA", "CHERRY", "GRAPE", "PLUM", "PEACH", "MANGO"]);
        setWordStatus(["", "", "", "", "", "", "", "", "", ""]);
        break;
      default:
        max = 0;
        contAddWords = 0;
        setWords(["APPLE", "ORANGE", "PEAR", "PINAPLE", "BANANA", "CHERRY"]);
        setWordStatus(["", "", "", "", "", ""]);
        break;
    }
    TableSet();
    setTimer(max);
  }
  return (
    <div className="App">
      <header className="App-header">
        <Title />
      </header>
      <main>
        <Controls
          diff={diff}
          onDiffChange={handleDiffChange}
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          timer={timer}
          score={score}
          inputName={inputName}
        />
        <div className={`panel-wrapper ${diff === "0" ? "" : "diff"}`}>
          <GamePanel
            table={table}
            diff={diff}
            gameStarted={gameStarted}
            dragStart={dragStart}
            dragSelect={dragSelect}
            dragEnd={dragEnd}
            drag={drag}
          />
          <WordPanel
            words={words}
            wordStatus={wordStatus}
            diff={diff}
            inputWord={inputWord}
            btnaddWord={btnaddWord}
            addWord={addWord}
            handleChangeAddWord={handleChangeAddWord}
            palavra={palavra}
            contAddWords={contAddWords}
          />
        </div>
        <Footer />
        <PopUpWindow
          popup={popup}
          handleClosePopup={handleClosePopup}
          score={score}
          namePlayer={namePlayer}
        />
      </main>
    </div>
  );
}
export default App;