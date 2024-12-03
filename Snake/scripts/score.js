class Score {
    constructor() {
        this.value = 0;
    }

    draw() {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(WIDTH, 0, canvas.width - WIDTH, HEIGHT);
        ctx.fillStyle = "black";
        ctx.font = "70px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Score", WIDTH + 100, 70);
        ctx.font = "100px Arial";
        ctx.fillText(this.value.toString(), WIDTH + 100, 200);
    }

    set currentScore(value) {
        this.value = value;
    }

    get currentScore() {
        return this.value;
    }
}