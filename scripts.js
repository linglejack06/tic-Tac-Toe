var events = {
    events: {},
    on: function (eventName, fn) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.events[eventName]) {
        for (var i = 0; i < this.events[eventName].length; i++) {
          if (this.events[eventName][i] === fn) {
            this.events[eventName].splice(i, 1);
            break;
          }
        };
      }
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
  };
const player = function(tic, name) {
    let active = false;
    const isActive = () => active;
    const toggleActive = () => {
        active = (active === false ? true : false);
    }
    return {tic, name, isActive, toggleActive}
}
const Button = function(index) {
    const button = document.createElement('button');
    button.classList.add('game-piece');
    button.dataset.index = index;
    button.addEventListener('click', events.emit('clicked', button));
    const update = (tic) => {
        button.textContent = tic;
    }
    return {button, update};
}
const gameBoard = (function() {
    let tics = ['', '', '', '', '', '', '', '', ''];
    let playerOne = player('X', 'Bob');
    let playerTwo = player('O', 'Sarah');
    const updateTics = (button) => {
        const place = button.dataset.index;
        let currentPlayerTic = playerOne.isActive() ? playerOne.tic : playerTwo.tic;
        tics[place] = currentPlayerTic
        button.update(currentPlayerTic);
    }
    return {tics, playerOne, playerTwo, updateTics};
})();
const displayController = (function() {
    let board = document.getElementById('board');
    let score = document.getElementById('score');
    
    const populateBoard = () => {
        for(let i = 0; i < 9; i++) {
            let button = Button(i);
            board.appendChild(button.button);
        }
    };
    return {populateBoard};
})();

displayController.populateBoard()