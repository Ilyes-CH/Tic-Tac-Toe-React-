
import "./App.css";
import { useState } from "react";

function Square() {
  // Initialize state variables
  const [start, setStart] = useState("x");
  const [spots, setSpots] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  // Check if it's a tie
  function tie() {
    for (let i = 0; i < spots.length; ++i) {
      if (spots[i][0] === "" || spots[i][1] === "" || spots[i][2] === "") {
        // If any spot in the current row is empty, it's not a tie yet
        return false;
      }
    }
    // If the loop completes without finding any row with an empty spot, it's a tie
    return true;
  }

  // Currying function to create the winner checking function
  const createWinner = (symbol) => {
    const Conditions = [
      {
        firstCond:
          spots[0][0] === symbol &&
          spots[0][1] === spots[0][0] &&
          spots[0][2] === spots[0][0],
        coordinates: [[0, 0], [0, 1], [0, 2]],
      },
      {
        secondCond:
          spots[1][0] === symbol &&
          spots[1][1] === spots[1][0] &&
          spots[1][2] === spots[1][0],
        coordinates: [[1, 0], [1, 1], [1, 2]],
      },
      {
        thirdCond:
          spots[2][0] === symbol &&
          spots[2][1] === spots[2][0] &&
          spots[2][2] === spots[2][0],
        coordinates: [[2, 0], [2, 1], [2, 2]],
      },
      {
        fourthCond:
          spots[0][0] === symbol &&
          spots[1][1] === spots[0][0] &&
          spots[2][2] === spots[0][0],
        coordinates: [[0, 0], [1, 1], [2, 2]],
      },
      {
        fifthCond:
          spots[0][2] === symbol &&
          spots[1][1] === spots[0][2] &&
          spots[2][0] === spots[1][1],
        coordinates: [[0, 2], [1, 1], [2, 0]],
      },
      {
        sixthCond:
          spots[0][1] === symbol &&
          spots[1][1] === spots[0][1] &&
          spots[2][1] === spots[1][1],
        coordinates: [[0, 1], [1, 1], [2, 1]],
      },
      {
        seventhCond:
          spots[0][2] === symbol &&
          spots[1][2] === spots[0][2] &&
          spots[2][2] === spots[1][2],
        coordinates: [[0, 2], [1, 2], [2, 2]],
      },
      {
        eighthCond:
          spots[0][0] === symbol &&
          spots[1][0] === spots[0][0] &&
          spots[2][0] === spots[1][0],
        coordinates: [[0, 0], [1, 0], [2, 0]],
      },
    ];
    

    return function () {
      for (const [index, condition] of Conditions.entries()) {
        if (Object.values(condition)[0]) {
          return { isWinner: true, index: index , coordinates: condition.coordinates };
        }
      }
      console.log("no winner yet");
      return { isWinner: false, index: -1 , coordinates: [] };
    };
  };

  // Handle the click event on a button
  function click(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (spots[row][col] === "") {
      // Update the corresponding spot in the spots array with the current value of start
      const updatedBoard = [...spots];
      updatedBoard[row][col] = start;
      setSpots(updatedBoard);

      // Update the button text to reflect the new value of start
      e.target.textContent = start;

      // Toggle the value of start for the next turn using the functional state update
      setStart((prevStart) => (prevStart === "x" ? "O" : "x"));

      // Check for the winner after updating the board for "x" or "o"
      const result = createWinner(start)();
      if (result.isWinner) {
        alert(start + " is the winner! Condition: " + Object.keys(result)[0]+ result.coordinates);
      } else {
        if (tie()) {
          alert("It's a tie!");
        }
      }
    }
  }

  // JSX elements for the board
  return (
    <>
      <div className="s firstRow">
        <div className="one">
          <button className="btn" onClick={click} data-row={0} data-col={0}>
            {spots[0][0]}
          </button>
        </div>
        <div className="two">
          <button className="btn" onClick={click} data-row={0} data-col={1}>
            {spots[0][1]}
          </button>
        </div>
        <div className="three">
          <button className="btn" onClick={click} data-row={0} data-col={2}>
            {spots[0][2]}
          </button>
        </div>
      </div>
      <div className="s secondRow">
        <div className="four">
          <button className="btn" onClick={click} data-row={1} data-col={0}>
            {spots[1][0]}
          </button>
        </div>
        <div className="five">
          <button className="btn" onClick={click} data-row={1} data-col={1}>
            {spots[1][1]}
          </button>
        </div>
        <div className="six">
          <button className="btn" onClick={click} data-row={1} data-col={2}>
            {spots[1][2]}
          </button>
        </div>
      </div>
      <div className="s thirdRow">
        <div className="seven">
          <button className="btn" onClick={click} data-row={2} data-col={0}>
            {spots[2][0]}
          </button>
        </div>
        <div className="eight">
          <button className="btn" onClick={click} data-row={2} data-col={1}>
            {spots[2][1]}
          </button>
        </div>
        <div className="nine">
          <button className="btn" onClick={click} data-row={2} data-col={2}>
            {spots[2][2]}
          </button>
        </div>
      </div>
    </>
  );
}

export default Square;
