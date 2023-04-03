
const player = function(tic, name) {
    let active = false;
    let score = 0;
    const isActive = () => active;
    const toggleActive = () => {
        active = (active === false ? true : false);
    }
    const getScore = () => score;
    const incrementScore = () => {
        score++;
    }
    return {tic, name, isActive, toggleActive}
}
const gameBoard = (function() {
    let tics = ['', '', '', '', '', '', '', '', ''];
    let winOptions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let players;
    const startGame = (e) => {
        e.preventDefault();
        players = displayController.getForm();
        displayController.renderGame();
    }
    const checkWin = () => {
        let emptyTics = 0;
        let winner = ''
       winOptions.forEach(option => {
            if (tics[option[0]] !== '' && tics[option[1]] === tics[option[0]] && tics[option[2]] === tics[option[0]]) {
                winner = tics[option[0]];
            } 
       })
       tics.forEach(tic => {
            if (tic === '') {
                emptyTics++
            }
       });
       if (emptyTics === 0 && winner === '') {
            return 'tie';
       } else if (winner !== '') {
            return winner;
       } else {
        return 'none';
       }
    }
    const playTurn = (e) => {
        tics[e.target.dataset.index] = players.p1.isActive() ? players.p1.tic : players.p2.tic;
        const winner = checkWin();
        displayController.updateBoard()
        players.p1.toggleActive();
        if (winner !== 'none') {
            displayController.showWinner(winner);
        }
    }
    const getTic = (index) => tics[index];
    return {playTurn, getTic, startGame};
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
    let form = document.querySelector('.form');
    let startButton = document.getElementById('start');
    startButton.addEventListener('click', gameBoard.startGame);
    let buttons = [];
    for (let i = 0; i < 9; i++) {
        buttons.push(gameSpace(i))
    }
    const showWinner = (winner) => {
        _clearBoard();
        _renderWin(winner);
    }
    const _renderWin = (winner) => {
        score.classList.remove('inactive')
        score.classList.add('active');

    }
    const renderGame = () => {
        hideForm();
        _populateBoard();
    }
    const getForm = () => {
        const p1Name = document.getElementById('p1Name').value;
        const p2Name = document.getElementById('p2Name').value;
        return {p1: player('X', p1Name), p2: player('O', p2Name)};
    }
    const hideForm = () => {
        form.style.display = 'none';
    }
    const _populateBoard = () => {
        buttons.forEach(button => {
            board.appendChild(button);
        })
    }
    const _clearBoard = () => {
        board.innerHTML = '';
    }
    const updateBoard = () => {
        _clearBoard()
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = gameBoard.getTic(i);
        }
        populateBoard();
    }
    return {renderGame, getForm, updateBoard, showWinner};
})();

