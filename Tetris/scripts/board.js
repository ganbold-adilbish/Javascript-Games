class Board {
    constructor() {
        this.currentShape;
        this.grid = new Grid();
        this.timer = new Timer(this.animate.bind(this));
        this.keyboardController = new KeyboardController(this.handleKeyDown.bind(this));
        this.shapeGenerator = new ShapeGenerator(this.grid);

        this.preLoad();
    }

    animate() {
        if (this.currentShape.canMove()) 
                this.currentShape.move();
            else
                this.checkBoard();

        this.draw();
    }

    draw() {
        ctx.clearRect(0, 0, WIDTH * SIZE, HEIGHT * SIZE);
        this.grid.draw();
        this.currentShape.draw();
    }

    handleKeyDown(direction) {
        switch (direction) {
            case "up":
                if (this.currentShape.canRotate()) 
                    this.currentShape.rotate();
                break;
            case "harddrop":
                while (this.currentShape.canMove()) {
                    this.currentShape.move();
                }

                this.checkBoard();
                break;
        
            default:
                if (this.currentShape.canMove(direction)) 
                    this.currentShape.move(direction);
                break;
        }

        this.draw();
    }

    async checkBoard() {
        this.pause("On");
        this.grid.addShape(this.currentShape);    
        await this.grid.clearRow();

        if (this.shapeGenerator.canGenerateShape()) {
            this.currentShape = this.shapeGenerator.getNewShape();
            this.pause("Off");        
        }
        else {
            //GAME OVER
            ctx.globalAlpha = 0.5;
            this.draw();
            this.pause("On");
        }

    }

    pause(value) {
        if (value == "On") {
            this.timer.stop();
            this.keyboardController.stop();
        }
        else {
            this.timer.start();
            this.keyboardController.start();
        }
    }

    preLoad() {
        for (let i = 0; i < HEIGHT + 2; i++) {
            for (let j = 0; j < WIDTH + 2; j++) {
                if ((i == 0 || i == 26) || (j == 0 || j == 11)) {
                    let block = new Block(j, i, "tomato");
                    block.draw();
                }
            }
        }
        ctx.translate(SIZE, SIZE);
        
        this.currentShape = this.shapeGenerator.getNewShape();
    }
    
}


