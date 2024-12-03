const canvas = document.getElementById("canvas");
const SIZE = 30;
const WIDTH = 10;
const HEIGHT = 25;
canvas.width = (WIDTH + 2) * SIZE;
canvas.height = (HEIGHT + 2) * SIZE;
const ctx = canvas.getContext("2d");



;(function () {
    function main() {
        let board = new Board();
    }
    
    main();
})();