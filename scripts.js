
var player = function(tic, name) {
    let active = false;
    const isActive = () => active;
    const toggleActive = () => {
        active = (active === false ? true : false);
    }
    return {tic, name, isActive, toggleActive}
}
var gameBoard = (function() {
    let tics = ['', '', '', '', '', '', '', '', ''];
    let winOptions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let playerOne = player('X', 'Bob');
    let playerTwo = player('O', 'Sarah');
    let score = { 
        p1: 0,
        p2: 0
    }
    const checkWin = () => {
        let count = 0;
        winOptions.forEach(option => {
            if (tics[option[0]] !== '' && tics[option[0]] === tics[option[1]] && tics[option[0]] === tics[option[2]]) {
                return tics[option[0]];
            }
        })
        for(let i = 0; i < tics.length; i++) {
            if (displayController.buttons[i].isFilled) {
                count++;
            }
        }
        if(count === 9) {
            return 'tie';
        } else {
            return '';
        }
    }
    const incrementScore = (winner) => {
        this.score[winner] += 1;
    }
    return {tics};
})();
const gameSpace = (index) => {
    let button = document.createElement('button');
    button.classList.add('game-piece');
    button.dataset.index = index;
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
    return {populateBoard};
})();

displayController.populateBoard()