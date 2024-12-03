//Class Block implementation
class Block {
    constructor(x = 0, y = 0, color = "red") {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = SIZE;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    equals(block) {
        return this.x == block.x && this.y == block.y;
    }
}