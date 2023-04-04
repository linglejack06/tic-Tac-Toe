
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
    return {tic, name, isActive, toggleActive, getScore, incrementScore}
}
const gameBoard = (function() {
    let tics = ['', '', '', '', '', '', '', '', ''];
    let winOptions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let players = {p1: player('X', 'Bob'), p2: player('O', 'Scott')}
    const startGame = (e) => {
        e.preventDefault();
        players = displayController.getForm(players);
        displayController.renderGame(players);
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
            if (winner === players.p1.tic) {
                players.p1.incrementScore();
            } else {
                players.p2.incrementScore();
            }
            return winner;
       } else {
        return 'none';
       }
    }
    const resetTics = () => {
        tics = ['', '', '', '', '', '', '', '', ''];
    }
    const playTurn = (e) => {
        tics[e.target.dataset.index] = players.p1.isActive() ? players.p1.tic : players.p2.tic;
        const winner = checkWin();
        players.p1.toggleActive();
        displayController.updateBoard()
        if (winner !== 'none') {
            console.log(winner);
            displayController.showWinner(winner, players);
        }
    }
    const getPlayers = () => {
        return players;
    }
    const getTic = (index) => tics[index];
    return {playTurn, getTic, resetTics, startGame, getPlayers};
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
    let scoreText = document.querySelector('.score');
    let winnerName = document.querySelector('.winner');
    let form = document.querySelector('.form');
    let startButton = document.getElementById('start');
    let restartButton = document.querySelector('.restart');
    let nextGameButton = document.querySelector('.next-game');
    let p1Text = document.querySelector('.p1');
    let p2Text = document.querySelector('.p2');
    let mainDisplay = document.querySelector('.main-screen');
    let buttons = [];
    for (let i = 0; i < 9; i++) {
        buttons.push(gameSpace(i))
    }
    const showWinner = (winner, players) => {
        _clearBoard();
        _hideBoard();
        _renderWin(winner, players);
    }
    const _renderWin = (winner, players) => {
        score.classList.remove('inactive')
        score.classList.add('active');
        winnerName.textContent = `Winner: ${winner}`;
        scoreText.textContent = `${players.p1.getScore()}(X) - ${players.p2.getScore()}(O)`;
    }
    const _hideWin = () => {
        score.classList.remove('active');
        score.classList.add('inactive');
        
    }
    const renderGame = (players) => {
        _hideForm();
        _hideWin();
        _showBoard();
        _displayPlayerNames(players);
        _populateBoard();
        _updateCurrentTurn();
    }
    const getForm = (players) => {
        const p1Name = document.getElementById('p1Name').value;
        const p2Name = document.getElementById('p2Name').value;
        if(p1Name !== null) {
            players.p1.name = p1Name;
        }
        if(p2Name !== null) {
            players.p2.name = p2Name;
        }
        players.p1.score = 0;
        players.p2.score = 0;
        return players;
    }
    const _resetGame = () => {
        form.style.display = 'block';
        gameBoard.resetTics();
    }
    const _renderNewGame = () => {
        const players = gameBoard.getPlayers();
        gameBoard.resetTics();
        renderGame(players);
        updateBoard();
    }
    const _displayPlayerNames = (players) => {
        p1Text.textContent = `${players.p1.name}(X): ${players.p1.getScore()}`;
        p2Text.textContent = `${players.p2.name}(O): ${players.p2.getScore()}`;
    }
    const _hideForm = () => {
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
    const _hideBoard = () => {
        mainDisplay.style.display = 'none';
    }
    const _showBoard = () => {
        mainDisplay.style.display = 'block';
    }
    const updateBoard = () => {
        _clearBoard()
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = gameBoard.getTic(i);
        }
        _populateBoard();
        _updateCurrentTurn();
    }
    const _updateCurrentTurn = () => {
        let players = gameBoard.getPlayers();
        if (players.p1.isActive()) {
            p2Text.classList.remove('current-turn');
            p1Text.classList.add('current-turn');
        } else {
            p1Text.classList.remove('current-turn');
            p2Text.classList.add('current-turn');
        }
    }
    startButton.addEventListener('click', gameBoard.startGame);
    restartButton.addEventListener('click', _resetGame);
    nextGameButton.addEventListener('click', _renderNewGame);
    return {renderGame, getForm, updateBoard, showWinner};
})();

