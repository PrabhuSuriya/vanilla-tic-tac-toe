const o = "o";
const x = "x";
const players = ["A", "B"];
const playersSymbols = {
  A: o,
  B: x,
};
let currentPlayer;
const gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function setupGame() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
}

function startGame() {
  currentPlayer = players[0];
}

function handleBoxClick(e) {
  const boxId = e.target.getAttribute("data-box");
  const symbol = playersSymbols[currentPlayer];
  const isValid = addSymbol(boxId, symbol);
  if (isValid) {
    updateBoardUI(boxId, symbol);
    switchPlayer();
    const status = getGameStatus();
  }
}

function updateBoardUI(boxId, symbol) {
  const box = document.querySelector(`[data-box='${boxId}']`);
  box.classList.add(`symbol-${symbol}`);
}

function switchPlayer() {
  // TODO make this better
  currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
}

function addSymbol(boxId, symbol) {
  const [row, col] = boxId.split("-");
  let current = gameBoard[row - 1][col - 1];
  if (!current) {
    current = symbol;
    return true;
  }
  return false;
}

function getGameStatus() {
  
}

setupGame();
startGame();
