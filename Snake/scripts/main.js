const canvas = document.getElementById("canvasOfSnake");
const pauseButton = document.getElementById("pause");
const SIZE = 30;
const WIDTH = canvas.width = 40 * SIZE;
canvas.width = 1400;
const HEIGHT = canvas.height = 20 * SIZE;
const ctx = canvas.getContext("2d");
var gameBegin = false
var game;

function main() {
    if (!gameBegin) {
        game = new Game();
        gameBegin = true;
    }
    else {
        if (confirm("Are you sure")) {
            game.deleteGame();
            game = new Game();
        }
    }
}









