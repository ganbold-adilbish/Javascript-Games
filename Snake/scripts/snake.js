//Class Snake implementation
class Snake {
    constructor(){
        this.queue = [];

        for (let index = 0; index < 5; index++) {
            this.queue.unshift(new Block(SIZE * index, SIZE * 13));
        };

        this.mouse = new Mouse(this.queue);
    }

    //Draw the body of a snake. 
    draw() {
        this.queue[1].color = "red";
        this.queue[0].color = "yellow";
        this.queue.forEach(block => block.draw());
        this.queue[0].draw();
        this.mouse.draw();
    }

    //The function below decides whether a snake can move or not.
    //Additionally, it will tell ya whether a pity mouse is caught.
    move(direction) {
        let headPosition = this.queue[0];

        switch (direction) {
            case "left":
                this.queue.unshift(new Block((headPosition.x - headPosition.size + WIDTH) % WIDTH, headPosition.y));
                break;
            case "right":
                this.queue.unshift(new Block((headPosition.x + headPosition.size) % WIDTH, headPosition.y));
                break;
            case "up":
                this.queue.unshift(new Block(headPosition.x, (headPosition.y - headPosition.size + HEIGHT) % HEIGHT));
                break;
            case "down":
                this.queue.unshift(new Block(headPosition.x, (headPosition.y + headPosition.size) % HEIGHT));
                break;
            default:
                break;
        }


        //If a snake catches a delicious mouce, the snake will definitely swallow it without any mercy.
        headPosition = this.queue[0];

        if (headPosition.equals(this.mouse)) 
            this.mouse = new Mouse(this.queue);
        
        else
            this.queue.pop();
    }

    isCollided() {
        return this.queue.slice(1).some(block => block.equals(this.queue[0]));
    }

    getScore() {
        return this.queue.length - 5;
    }
}