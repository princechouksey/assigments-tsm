const cells = document.querySelectorAll(".cell");
let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";   
let isGameOver = false;    

const message = document.getElementById("message");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");
    if (board[index] == "" && !isGameOver) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      checkWinner();
      if (!isGameOver) {
        currentPlayer = currentPlayer == "X" ? "O" : "X";
        message.textContent = "Player " + currentPlayer + "'s Turn";
      }
    }
  });
});

function checkWinner() {
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let comb of winnerCombinations) {
    const [a, b, c] = comb;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      message.textContent = "🎉 Player " + currentPlayer + " Wins!";
      isGameOver = true;
      highlightWinner(comb);
      return;
    }
  }

  if (!board.includes("")) {
    message.textContent = "😮 It's a Draw!";
    isGameOver = true;
  }
}

function highlightWinner(combo) {
  combo.forEach((index) => {
    cells[index].style.backgroundColor = "#90ee90";
  });
}

document.getElementById("reset").addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#f0f0f0";
  });
  currentPlayer = "X";   
  isGameOver = false;    
  message.textContent = "Player X's Turn";
});
