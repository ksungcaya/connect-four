import Game from "../src/libs/Game";

let player1 = new Player('red');
let player2 = new Player('yellow');
let board = new Board();

let game = new Game(board);

game.move(player1, 1); // column 1
