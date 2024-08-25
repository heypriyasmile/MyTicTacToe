// script.js

document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameButton = document.getElementById('newGameButton');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (boardState[index] === '' && !checkWin()) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                showResult(`${currentPlayer} wins!`);
            } else if (boardState.every(cell => cell !== '')) {
                showResult("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
        });
        resultScreen.style.display = 'none';
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', resetGame);
});
