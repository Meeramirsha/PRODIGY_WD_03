const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusText.textContent = `${currentPlayer} wins!`;
            return;
        }
    }
    if (!board.includes(null)) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    }
}

function cellClicked(e) {
    const index = e.target.dataset.index;
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener('click', cellClicked));

