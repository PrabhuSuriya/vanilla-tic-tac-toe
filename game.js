const o = "o";
const x = "x";
const players = ["A", "B"];
const playersSymbols = {
  A: o,
  B: x,
};
const gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function startGame() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) =>
    box.addEventListener("click", (e) => {console.log('e', e.target.getAttribute('data-box'))})
  );
}

function updateBoardUI() {}

function addSymbol(row, col, symbol) {
  const current = gameBoard[(row, col)];
  if (!current) {
    current = symbol;
    return true;
  }
  return false;
}

startGame();