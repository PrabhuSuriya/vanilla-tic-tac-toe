const o = "o";
const x = "x";
const players = {
  A: { name: "Mario", symbol: o },
  B: { name: "Luigi", symbol: x },
};
let currentPlayer;
let gameBoard;
const infoEl = document.getElementById("info");

function setupGame() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
  const playerInfo = document.getElementById("player-info");
  playerInfo.innerText = `${players.A.name}: ${players.A.symbol.toUpperCase()} Vs ${players.B.name}: ${players.B.symbol.toUpperCase()} `;
}

function startGame() {
  gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  currentPlayer = players.A;
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.classList.remove("symbol-o");
    box.classList.remove("symbol-x");
  });
  showMessage(`New Game. ${currentPlayer.name}'s playing..`);
  toggleGame(true);
}

function showMessage(msg) {
  infoEl.innerText = msg;
}

function handleBoxClick(e) {
  const boxId = e.target.getAttribute("data-box");
  const symbol = currentPlayer.symbol;
  const isValid = addSymbol(boxId, symbol);
  if (isValid) {
    updateBoardUI(boxId, symbol);
    switchPlayer();
    const status = getGameStatus();
    if (status.isGameOver) {
      showWinner(status);
      toggleGame(false);
      setTimeout(() => {
        startGame();
      }, 2000);
    }
  }
}

function toggleGame(enable) {
  if (enable) {
    document.querySelector(".game-container").classList.remove("disable-click");
  } else {
    document.querySelector(".game-container").classList.add("disable-click");
  }
}

function updateBoardUI(boxId, symbol) {
  const box = document.querySelector(`[data-box='${boxId}']`);
  box.classList.add(`symbol-${symbol}`);
}

function switchPlayer() {
  // TODO make this better
  currentPlayer = currentPlayer == players.B ? players.A : players.B;
  showMessage(`${currentPlayer.name}'s playing..`);
}

function addSymbol(boxId, symbol) {
  const [row, col] = boxId.split("-");
  if (!gameBoard[row - 1][col - 1]) {
    gameBoard[row - 1][col - 1] = symbol;
    return true;
  }
  return false;
}

function getGameStatus() {
  const result = {
    winner: null,
    isGameOver: false,
  };

  // check rows
  for (let i = 0; i < 3; i++) {
    const winningSymbol = checkIfSameSymbols(gameBoard[i]);
    if (winningSymbol) {
      result.winner = winningSymbol;
      result.isGameOver = true;
      return result;
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    const winningSymbol = checkIfSameSymbols(gameBoard.map((x) => x[i]));
    if (winningSymbol) {
      result.winner = winningSymbol;
      result.isGameOver = true;
      return result;
    }
  }
  //check diagonal
  {
    const boxesToCheck = gameBoard.map((r, i) => r[i]);
    const winningSymbol = checkIfSameSymbols(boxesToCheck);
    if (winningSymbol) {
      result.winner = winningSymbol;
      result.isGameOver = true;
      return result;
    }
  }
  {
    const boxesToCheck = gameBoard.map((r, i) => r[2 - i]);
    const winningSymbol = checkIfSameSymbols(boxesToCheck);
    if (winningSymbol) {
      result.winner = winningSymbol;
      result.isGameOver = true;
      return result;
    }
  }
  if (gameBoard.flat().filter((x) => x === null).length == 0) {
    result.isGameOver = true;
    return result;
  }
  return result;
}

function checkIfSameSymbols([a, b, c]) {
  return !!a & !!b & !!c & (a == b) && b == c ? a : null;
}

function showWinner(status) {
  if (status.winner) {
    const w = Object.keys(players).find(
      (p) => players[p].symbol == status.winner
    );
    showMessage(`${players[w].name} wins! 🎉`);
  } else {
    showMessage(`Game drawn!`);
  }
}

setupGame();
startGame();
