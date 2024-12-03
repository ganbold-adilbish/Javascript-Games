class Game {
    constructor() {
        this.snake = new Snake();
        this.score = new Score();
        this.delayRate = 500;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.isPaused = false;
        this.start = performance.now();
        this.direction = "right";
        this.animation = requestAnimationFrame(this.animate.bind(this));
        
        this.preLoad();
    }
    
    animate(timestamp) {
        this.animation = requestAnimationFrame(this.animate.bind(this));
        if (timestamp - this.start > this.delayRate) {
            if (this.snake.isCollided()) {
                this.gameOver();
            }
            else {
                this.snake.move(this.direction);
                this.score.currentScore = this.snake.getScore();
                if (this.score.currentScore % 10 == 0 && this.score.currentScore < 220) 
                    this.delayRate = 500 - 2 * this.score.currentScore;

                this.draw();
            }

            this.start = performance.now();
        }
    }
    
    draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);  
        this.snake.draw();
        this.score.draw();        
    }

    pause() {
        if (!this.isPaused) {
            cancelAnimationFrame(this.animation);
            document.removeEventListener("keydown", this.handleKeyDown);
            pauseButton.innerHTML = "Resume";
            pauseButton.style.backgroundColor = "aquamarine";
        }
        else {
            document.addEventListener("keydown", this.handleKeyDown);
            this.animation = requestAnimationFrame(this.animate.bind(this));
            pauseButton.innerHTML = "Pause";
            pauseButton.style.backgroundColor = "tomato";
        }

        this.isPaused = !this.isPaused;
    }

    handleKeyDown(e) {
        let code = e.keyCode;
        let previousDirection = this.direction;

        switch (code) {
            case 37:
                if (this.direction != "right") {
                    this.direction = "left"; 
                    if (this.direction == previousDirection) {
                        this.delayRate = 50;
                    }
                }
                break;
            case 38:
                if (this.direction != "down") {
                    this.direction = "up"; 
                    if (this.direction == previousDirection) {
                        this.delayRate = 50;
                    }
                }
                break;
            case 39:
                if (this.direction != "left") {
                    this.direction = "right"; 
                    if (this.direction == previousDirection) {
                        this.delayRate = 50;
                    }
                }
                break;
            case 40:
                if (this.direction != "up") {
                    this.direction = "down"; 
                    if (this.direction == previousDirection) {
                        this.delayRate = 50;
                    }
                }
                break;
            default:
                break;
        }
    }

    handleKeyUp() {
        this.delayRate = 500;
    }

    gameOver() {
        this.deleteGame();
        ctx.fillStyle = "orange";
        ctx.font = "150px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", WIDTH / 2, HEIGHT / 2);
        gameBegin = false;
        pauseButton.disabled = true;
    }

    deleteGame() {
        cancelAnimationFrame(this.animation);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);  
    }

    preLoad() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        pauseButton.onclick = this.pause.bind(this);
        pauseButton.innerHTML = "Pause";
        pauseButton.style.backgroundColor = "tomato";
        pauseButton.disabled = false;
        this.draw();
    }
}