//Class Mouse implementation
class Mouse extends Block{
    constructor(snakeQueue) {
        super();

        let mouseTemp;
        do {
            mouseTemp = new Block(this.getRandomInt(WIDTH), this.getRandomInt(HEIGHT));
        } while (snakeQueue.some(block => block.equals(mouseTemp)));

        this.x = mouseTemp.x;
        this.y = mouseTemp.y;
        this.color = "lime";
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max) / SIZE) * SIZE;
    }
}