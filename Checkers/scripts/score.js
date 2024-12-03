class Score {
    constructor(number) {
        this.number = number;
        this.value = 0;
    }

    draw() {
        // ctx.fillStyle = "black";
        // ctx.font = "50px Arial";
        // ctx.fillText("Score", 950, 150);
    }

    addScore() {
        this.value++;
    }
}