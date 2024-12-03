class Player {
    constructor(number) {
        this.number = number;
        this.activatedPiece = -1; //If no one is activated, it's -1.
        this.initialCoord = [];
        this.listOfPieces = [];
        let colors = ["red", "blue"];
        this.color = colors[this.number - 1];
        for (let i = 1; i < 9; i++) {
            for (let j = 1 + (this.number - 1) * 5 ; j < 4 + (this.number - 1) * 5; j++) {
                if ((i + j) % 2 == 0) {
                    this.listOfPieces.push(new Piece(i, j, this.color));
                }
            }
            
        }
        this.madeMove = false;
        this.capturedPiece = -1;
        this.enemy;
        this.anotherList = []; 
        this.score = new Score(this.number);
    }

    draw() {
        this.score.draw();
        this.listOfPieces.filter(a => this.listOfPieces.indexOf(a) != this.activatedPiece).forEach(a => a.draw());

        if (this.activatedPiece != -1) {
            this.listOfPieces[this.activatedPiece].drawActivatedPiece();
        }
    }

    move(x, y) {
        this.listOfPieces[this.activatedPiece].move(x, y);
    }

    getClickedPiece(x, y) {
        for (let index = 0; index < this.listOfPieces.length; index++) {
            if (this.listOfPieces[index].isClicked(x, y)) {
                return index;
            }
        }
        return -1;
    }

    clickPiece(x, y) {
        if (this.isPieceActivated()) {
            //click a piece again or move a piece.
            let isOverlapped = this.checkOverlap(x, y);
            this.madeMove = this.listOfPieces[this.activatedPiece].makeMove(this.number, this.initialCoord, x, y, isOverlapped);
            if (this.madeMove == false) {
                this.capturedPiece = this.listOfPieces[this.activatedPiece].jump(this.number, this.initialCoord, x, y, isOverlapped, this.anotherList);
                if (this.capturedPiece != -1) {
                    this.enemy.listOfPieces = this.enemy.listOfPieces.filter(a => this.enemy.listOfPieces.indexOf(a) != this.capturedPiece);
                }
            }
            this.activatedPiece = -1;
        }
        else {
            //click a piece or another one. 
            this.activatedPiece = this.getClickedPiece(x, y);
            if (this.activatedPiece != -1) 
                this.initialCoord = this.listOfPieces[this.activatedPiece].position;
            else
                this.initialCoord = [0, 0];
        }
    }

    isPieceActivated() {
        return this.activatedPiece != -1;
    }

    checkOverlap(x, y) {
        x = Math.floor(x / length) * length + length / 2;
        y = Math.floor(y / length) * length + length / 2;

        this.anotherList = this.enemy.listOfPieces.slice();

        for (let index = 0; index < this.listOfPieces.length; index++) {
            if (this.listOfPieces[index].equals([x, y]) == true && index != this.activatedPiece) {
                return true;
            }
        }

        for (let index = 0; index < this.anotherList.length; index++) {
            if (this.anotherList[index].equals([x, y]) == true) {
                return true;
            }
            
        }
        return false;

    }

    getMadeMove() {
        return this.madeMove;
    }

    setMadeMove() {
        this.madeMove = false;
    }

    getCapturedPiece() {
        return this.capturedPiece;
    }

    setCapturedPiece() {
        this.capturedPiece = -1;
    }

    setEnemy(player) {
        this.enemy = player;
    }

    isLost() {
        return this.listOfPieces.length == 0;
    }
}