'use strict';

class Game {
	constructor(event) {
		this.target = event.target;
		this.arrClicks = [];
	}

	drowSymbols() {
		if (this.target.tagName === "DIV" && this.target.innerHTML === '') {
			if (numberOfClicks % 2 === 0) {
				this.target.innerHTML = "<span class='crosses'></span>";
			} else {
				this.target.innerHTML = "<span class='noughts'></span>";
			};
			numberOfClicks++;
		};
	};

	getCellValues() {
		let gameCell = document.getElementsByClassName('game-field__cell');
		let arr = [];
		[].forEach.call(gameCell, function (element) {
			if (!!(element.innerHTML.indexOf('noughts') + 1)) {
				arr.push(0);
			} else if (!!(element.innerHTML.indexOf('crosses') + 1)) {
				arr.push(1);
			} else {
				arr.push(NaN);
			};
		});
		this.arrClicks = arr;
	}

	checkWinner() {
		if (this.checkLine() || this.checkColumn() || this.checkHorizontally()) {
			if (numberOfClicks % 2 == 0) {
				this.showWinner('O won!');
			} else {
				this.showWinner('X won!');
			}
		} else if (numberOfClicks >= 9) {
			this.showWinner('Draw');
		};
	}

	showWinner(name) {
		setTimeout(function () {
			alert(name);
			window.location.reload();
		}, 100);
	}

	checkLine() {
		for (let i = 0; i < this.arrClicks.length; i += 3) {
			if (this.arrClicks[i] === this.arrClicks[i + 1] &&
				this.arrClicks[i] === this.arrClicks[i + 2]) {
				return true;
			};
		};
	}

	checkColumn() {
		for (let i = 0; i <= 2; i++) {
			if (this.arrClicks[i] === this.arrClicks[i + 3] &&
				this.arrClicks[i] === this.arrClicks[i + 6]) {
				return true;
			};
		};
	}

	checkHorizontally() {
		if (this.arrClicks[0] === this.arrClicks[4] &&
			this.arrClicks[0] === this.arrClicks[8]) {
			return true;
		} else if (this.arrClicks[2] === this.arrClicks[4] &&
			this.arrClicks[2] === this.arrClicks[6]) {
			return true;
		};
	};
};


class Bot extends Game {
	constructor(event) {
		super(event);
		this.target = event.target;
		this.arrClicks = [];
		this.step;
	}

	botStep() {
		let arrBotSteps = [];
		arr.forEach(function (element, index) {
			if (isNaN(element)) {
				arrBotSteps.push(index);
			};
			this.step = arrBotSteps[Math.floor(Math.random() * arrBotSteps.length)];
		});
	}

	drowBotStep() {
		let cells = document.getElementsByClassName('game-field__cell');
		if (numberOfClicks % 2 === 0) {
			cells[this.step].innerHTML = "<span class='crosses'></span>";
		} else {
			cells[this.step].innerHTML = "<span class='noughts'></span>";
		}
		numberOfClicks++;
	}
}


let gameField = document.getElementById('field-js');
let numberOfClicks = 0;
gameField.addEventListener('click', function (event) {
	let playGame = new Game(event);
	playGame.drowSymbols();
	playGame.getCellValues();
	if (numberOfClicks > 4) {
		playGame.checkWinner();
	}
})



