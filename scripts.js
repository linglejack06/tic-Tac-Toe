
const player = function(tic, name) {
    let active = false;
    const isActive = () => active;
    const toggleActive = () => {
        active = (active === false ? true : false);
    }
    return {tic, name, isActive, toggleActive}
}
const gameBoard = (function() {
    let tics = ['', '', '', '', '', '', '', '', ''];
    let winOptions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let playerOne = player('X', 'Bob');
    let playerTwo = player('O', 'Sarah');
    let score = { 
        p1: 0,
        p2: 0
    }
    const checkWin = () => {
        console.log(tics)
    }
    const incrementScore = (winner) => {
        score[winner] += 1;
    }
    const playTurn = (e) => {
        tics[e.target.dataset.index] = playerOne.isActive() ? playerOne.tic : playerTwo.tic;
        alert(tics[e.target.dataset.index]);
        checkWin();
        displayController.updateBoard()
        playerOne.toggleActive();
    }
    const getTic = (index) => tics[index];
    return {playTurn, getTic};
})();
const gameSpace = (index) => {
    let button = document.createElement('button');
    button.classList.add('game-piece');
    button.dataset.index = index;
    button.addEventListener('click', gameBoard.playTurn);
    return button;
}
var displayController = (function() {
    let board = document.getElementById('board');
    let score = document.getElementById('score');
    let playerOne = player('X', 'Bob');
    let playerTwo = player('O', 'Sarah');
    let buttons = [];
    for (let i = 0; i < 9; i++) {
        buttons.push(gameSpace(i))
    }
    const populateBoard = () => {
        buttons.forEach(button => {
            board.appendChild(button);
        })
    }
    const clearBoard = () => {
        board.innerHTML = '';
    }
    const updateBoard = () => {
        clearBoard()
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = gameBoard.getTic(i);
        }
        populateBoard();
    }
    return {populateBoard, updateBoard};
})();

displayController.populateBoard()