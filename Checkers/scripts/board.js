class Board {
    constructor() {
        this.players = [new Player(1), new Player(2)];
        this.turn = 0;
        this.handleMouseclick = this.handleMouseclick.bind(this);
        this.handleMousemove = this.handleMousemove.bind(this);
        this.animation;
        this.preLoad();
    }

    animate() {
        if (this.players[this.turn].isLost()) 
            this.gameOver();        
        else 
            this.animation = requestAnimationFrame(this.animate.bind(this));

        this.draw();
    }

    draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        this.players[1 - this.turn].draw();
        this.players[this.turn].draw();

        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.fillText("Turn: " + (this.turn + 1), 950, 150);
    }

    handleMouseclick(event) {
        let x = event.clientX + 87;
        let y = event.clientY + 87;
        this.players[this.turn].clickPiece(x, y); 

        if (this.players[this.turn].getMadeMove() == true) {
            this.players[this.turn].setMadeMove();
            this.turn = 1 - this.turn;
        }
        
        if (this.players[this.turn].getCapturedPiece() != -1) {
            this.players[this.turn].setCapturedPiece();
            this.turn = 1 - this.turn;
        }   
    }

    handleMousemove(event) {
        if (this.players[this.turn].isPieceActivated()) {
            let x = event.clientX + 87;
            let y = event.clientY + 87;
            this.players[this.turn].move(x, y);
        }
    }

    gameOver() {
        cancelAnimationFrame(this.animation);
        ctx.fillStyle = "green";
        ctx.fillRect(99, 399, 802, 202);
        ctx.fillStyle = "black";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Player " + (2 - this.turn) + " won." , 500, 500);
    }

    preLoad() {
        canvas.addEventListener("mousedown", this.handleMouseclick);
        canvas.addEventListener("mousemove", this.handleMousemove);
        setTimeout(() => {
            this.animation = requestAnimationFrame(this.animate.bind(this));
        }, 1000);
        this.players[0].setEnemy(this.players[1]);
        this.players[1].setEnemy(this.players[0]);
    }
}

