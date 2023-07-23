import "./App.css";

function Restart({
  setBoard,
  setStart,
  setWin,
  setWinningCombination,
  setWinningSymbol,
  setCountx,
  setCounto,
  counto,
  countx,
<<<<<<< HEAD
  setstart
=======
  setStart
>>>>>>> e492f548475e470801056651d69f060ed6882476
}) {
  function handleRestart() {
    setBoard([
      { key: 0, value: "" },
      { key: 1, value: "" },
      { key: 2, value: "" },
      { key: 3, value: "" },
      { key: 4, value: "" },
      { key: 5, value: "" },
      { key: 6, value: "" },
      { key: 7, value: "" },
      { key: 8, value: "" },
    ]);
<<<<<<< HEAD
    // setStart("x");
=======
    
>>>>>>> e492f548475e470801056651d69f060ed6882476
    setWin(false);
    setWinningCombination([]);
    setWinningSymbol("");
    setCounto(counto);
    setCountx(countx);
    setStart("X")
  }
  return (
    <>
      <button className="restart-btn" onClick={handleRestart}>
        Restart
      </button>
    </>
  );
}

export default Restart;
