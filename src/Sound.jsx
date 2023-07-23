
function Sound({audiRef, winnerSound}) {
  return (
    <>
    <audio ref={audiRef} src={winnerSound}></audio>
    </>
  )
}

export default Sound