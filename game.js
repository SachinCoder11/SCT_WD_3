const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let boardState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = '';
    boardState.fill(null);
    gameActive = true;
    currentPlayer = "X";
    message.textContent = "";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    const cells = document.querySelectorAll(".cell");
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (boardState.every(cell => cell)) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

restartButton.addEventListener("click", createBoard);
createBoard();
