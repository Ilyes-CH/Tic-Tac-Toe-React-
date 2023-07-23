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
  countx
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
    setStart("x");
    setWin(false);
    setWinningCombination([]);
    setWinningSymbol("");
    setCounto(counto);
    setCountx(countx);
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
