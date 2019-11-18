'use strict';

class Game {
  constructor() {
    this.symbolArray = [null, null, null, null, null, null, null, null, null];
    this.numberOfClicks = 0;
  }

  addSymbol(event) {
    const cellClick = event.target.id;
    if (this.symbolArray[cellClick] !== null) return '';

    if (this.numberOfClicks % 2 === 0) {
      this.drowSymbol(cellClick, 'X', 'crosses');
    } else {
      this.drowSymbol(cellClick, 'O', 'noughts');
    }
    this.numberOfClicks++;

    if (this.numberOfClicks >= 5) {
      this.checkWinner();
    }
  };

  drowSymbol(cellClick, symbol, className) {
    this.symbolArray.splice(cellClick, 1, symbol);
    document.getElementById(cellClick).innerHTML =
      `<div class="${className}"></div>`;
  }

  checkWinner() {
    if (this.checkLine() || this.checkColumn() || this.checkHorizontally()) {
      if (this.numberOfClicks % 2 === 0) {
        this.showWinner('O won!');
      } else {
        this.showWinner('X won!');
      }
    } else if (this.numberOfClicks >= 9) {
      this.showWinner('Draw');
    };

    return false;
  };

  checkLine() {
    for (let i = 0; i < this.symbolArray.length; i += 3) {
      if (this.symbolArray[i] === null) continue;
      if (this.symbolArray[i] === this.symbolArray[i + 1] &&
        this.symbolArray[i] === this.symbolArray[i + 2]) {
          return true;
      };

    return false;
    };
  };

  checkColumn() {
    for (let i = 0; i <= 2; i++) {
      if (this.symbolArray[i] === null) continue;
      if (this.symbolArray[i] === this.symbolArray[i + 3] &&
        this.symbolArray[i] === this.symbolArray[i + 6]) {
          return true;
      };

      return false;
    };
  };

  checkHorizontally() {
    if (this.symbolArray[4] === null) return false;

    if (this.symbolArray[0] === this.symbolArray[4] &&
      this.symbolArray[0] === this.symbolArray[8]) {
      return true;
    } else if (this.symbolArray[2] === this.symbolArray[4] &&
      this.symbolArray[2] === this.symbolArray[6]) {
      return true;
    };    
  };

  showWinner(name) {
    setTimeout(function () {
      alert(name);
      window.location.reload();
    }, 100);
  };

  createGameField() {
    const field = document.createElement('div');
    field.className = 'game__field';
    field.id = 'field';
    for (let i = 0; i < 9; i++) {
      let div = document.createElement('div');
      div.className = 'field__cell';
      div.id = i;
      field.appendChild(div);
    }
    game.appendChild(field);
  };
}



const game = document.getElementById('game');

const play = new Game();
play.createGameField();

const field = document.getElementById('field');
field.addEventListener('click', (event) => {
  play.addSymbol(event);
})
