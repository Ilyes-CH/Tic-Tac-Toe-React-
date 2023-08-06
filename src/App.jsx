import { useState, useRef, useEffect } from "react";
import "./App.css";
import winnerSound from "./assets/winner.wav";
import Sound from "./Sound";
import Restart from "./Restart";
function App() {
  const audioRef = useRef(null);
  const [countx, setCountx] = useState(0);
  const [counto, setCounto] = useState(0);
  const [winningSymbol, setWinningSymbol] = useState("");
  const [winningCombination, setWinningCombination] = useState([]);
  const [win, setWin] = useState(false);
  const [start, setStart] = useState("X");
  const [board, setBoard] = useState([
    { key: 0, value: "", ref: useRef(null) },
    { key: 1, value: "", ref: useRef(null) },
    { key: 2, value: "", ref: useRef(null) },
    { key: 3, value: "", ref: useRef(null) },
    { key: 4, value: "", ref: useRef(null) },
    { key: 5, value: "", ref: useRef(null) },
    { key: 6, value: "", ref: useRef(null) },
    { key: 7, value: "", ref: useRef(null) },
    { key: 8, value: "", ref: useRef(null) },
  ]);
  
  function handleClick(index) {
    const updatedBoard = [...board];
    if (updatedBoard[index].value === "") {
      updatedBoard[index].value = start;
      setBoard(updatedBoard);
      setStart((prev) => (prev === "X" ? "O" : "X"));
    }
  }

  function winner() {
    // Define all possible winning combinations
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Get an array of all the button values
    const buttonValues = board.map((element) => element.value);
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        buttonValues[a] !== "" &&
        buttonValues[a] === buttonValues[b] &&
        buttonValues[b] === buttonValues[c]
      ) {
        setWinningCombination(combination);

        setWin(true);
        if (audioRef.current) {
          audioRef.current.play();
        }
        if (win) {
          const winnerSymbol = buttonValues[a];
          setWinningSymbol(winnerSymbol);
         

          if (winnerSymbol === "O") {
            setCounto(counto + 1);
          } else {
            setCountx(countx + 1);
          }
        }
        // alert(`Player ${buttonValues[a]} wins!`);
        return { winnerofGame: buttonValues[a] };
      }
    }
    // If no winner, check for a draw
    if (!buttonValues.includes("")) {
      alert("It's a draw!");

      setWinningCombination([]);
      setWin(false);
      
      // window.location.reload();
      return;
    }

    // If no winner and no draw, continue the game
    console.log("Continue the game.");
  }

  useEffect(() => {
    winner();
  }, [board, win]);

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <h2>
        {"X wins:  " + countx}
        {" |  O wins:  " + counto}
      </h2>

      <div className="container">
        {board.map((element) => (
          <button
            ref={element.ref}
            key={element.key}
            className={`btn ${
              winningCombination.includes(element.key) ? "win" : ""
            }`}
            onClick={() => handleClick(element.key)}
          >
            {element.value}
          </button>
        ))}
      </div>
      <h3>{win && winningSymbol + " Is The Winner !"}</h3>
      {win && (
        <Restart
          setBoard={setBoard}
          setStart={setStart}
          setWin={setWin}
          setWinningCombination={setWinningCombination}
          setWinningSymbol={setWinningSymbol}
          setCounto={setCounto}
          setCountx={setCountx}
          counto={counto}
          countx={countx}
        />
      )}  
       {!win && (
        <Restart
          setBoard={setBoard}
          setStart={setStart}
          setWin={setWin}
          setWinningCombination={setWinningCombination}
          setWinningSymbol={setWinningSymbol}
          setCounto={setCounto}
          setCountx={setCountx}
          counto={counto}
          countx={countx}
        />
      )}
      {win && <Sound audiRef={audioRef} winnerSound={winnerSound} />}
    </>
  );
}

export default App;
