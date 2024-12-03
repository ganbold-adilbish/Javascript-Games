class Piece {
    constructor(x, y, color) {
        this.x = x * length + length / 2;
        this.y = y * length + length / 2;
        this.color = color;
        this.state = "Piece";
    }

    //The origin is (100, 100)
    //Radius: 30
    draw(x = this.x, y = this.y) {
        ctx.restore();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        if (this.state == "King") {
            var img  = new Image();
            var size = 20; 
            img.src = "./images/crown.png";
            ctx.drawImage(img, x - size, y - size, size * 2, size * 2);
        }
        ctx.save();
    }

    drawActivatedPiece(x = this.x, y = this.y) {
        this.draw(x, y);
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.lineWidth = "6";
        ctx.strokeStyle = "Cyan";
        ctx.stroke();
    }

    move(x, y) {
        if (x > 130 && x < 870 && y > 130 && y < 870) {
            this.x = x;
            this.y = y;
        }
    }

    checkEnemy(x, y, anotherList) {
        for (let index = 0; index < anotherList.length; index++) {
            if (anotherList[index].equals([x, y]) == true) {
                return index;
            }
        }
        return -1;
    }

    canJump(number, initialCoord, x, y, isOverlapped, anotherList) {        

        if (this.state == "Piece") 
            return Math.abs(initialCoord[0] - x) == length * 2 
                && (initialCoord[1] + length * 2 * (3 - 2 * number) == y) 
                && this.checkEnemy((x + initialCoord[0]) / 2, (y + initialCoord[1])/ 2, anotherList) != -1 
                && (isOverlapped == false);
        else 
            return Math.abs(initialCoord[0] - x) == length * 2 
                && Math.abs(initialCoord[1] - y) == length * 2 
                && this.checkEnemy((x + initialCoord[0]) / 2, (y + initialCoord[1])/ 2, anotherList) != -1 
                && (isOverlapped == false);
    }

    jump(number, initialCoord, x, y, isOverlapped, anotherList) {
        x = Math.floor(x / length) * length + length / 2;
        y = Math.floor(y / length) * length + length / 2;  

        if (this.canJump(number, initialCoord, x, y, isOverlapped, anotherList)) {
            this.x = x;
            this.y = y;
            this.turnKing();
            return this.checkEnemy((x + initialCoord[0]) / 2, (y + initialCoord[1])/ 2, anotherList);
        }
        else {
            this.x = initialCoord[0];
            this.y = initialCoord[1];
            return -1;
        }
    }

    canMakeMove(number, initialCoord, x, y, isOverlapped) {
        if (this.state == "Piece") {
            return (Math.abs(initialCoord[0] - x) == length 
                && initialCoord[1] + length * (3 - 2 * number) == y 
                && isOverlapped == false);
        }
        else {
            return (Math.abs(initialCoord[0] - x) == length 
                && Math.abs(initialCoord[1] - y) == length 
                && isOverlapped == false);
        }
    }

    makeMove(number, initialCoord, x, y, isOverlapped) {
        x = Math.floor(x / length) * length + length / 2;
        y = Math.floor(y / length) * length + length / 2;

        if (this.canMakeMove(number, initialCoord, x, y, isOverlapped)) {
            this.x = x;
            this.y = y; 
            this.turnKing();  
            return true;
        }
        else {
            this.x = initialCoord[0];
            this.y = initialCoord[1];
            return false;
        }
    }

    
    isClicked(x, y) {
        if ((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) < 30 * 30) {
            return true;
        }
        else {
            return false;
        }
    }

    equals(coord) {
        return (this.x == coord[0] && this.y == coord[1]);
    }

    get position() {
        return [this.x, this.y];
    }

    turnKing() {
        if (this.y == length + length / 2 || this.y == length * 8 + length / 2) {
            this.state = "King";
        }   
    }
}
