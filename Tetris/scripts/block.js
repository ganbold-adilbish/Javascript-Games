//Class Block implementation
class Block {
    constructor(x, y, color = "black") {
        this.x = x;
        this.y = y;
        this.size = SIZE;
        this.color = color;
        this.listOfShape = [];
        this.status = "active";
    }

    copy() {
        return (new Block(this.x, this.y, this.color));
    }

    draw() {
        let padding = 2;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * this.size + padding, this.y * this.size + padding, this.size - 2 * padding, this.size - 2 * padding);
    }

    move(direction) {
        switch (direction) {
            case "left":
                this.x--;
                break;
            case "right":
                this.x++
                break;
            case "down":
                this.y++;
                break;
            case "up":
                this.y--;
                break;
            default:
                break;
        }
    }

    rotate(pivot) {
        let relX = this.x - pivot.x;
        let relY = this.y - pivot.y;
        this.x = pivot.x - relY;
        this.y = pivot.y + relX;

        //I_Shape rotation
        if (this.color == "cyan") {
            this.x--;
        }
    }

    canMove(direction, gridTable) {   
        let block = this.copy(); 
        block.move(direction); 

        if (0 <= block.x && block.x < WIDTH && block.y < HEIGHT) {
            return gridTable[block.y][block.x] == null;
        }
        else
            return false;
    }

    canRotate(pivot, gridTable) {   
        let block = this.copy(); 
        block.rotate(pivot); 

        if (0 <= block.x && block.x < WIDTH && block.y < HEIGHT) {
            return gridTable[block.y][block.x] == null;
        }
        else
            return false;
    }

    equals(block) {
        return this.x == block.x && this.y == block.y && this.color == block.color;
    }

    remove() {
        this.status = "removed";
    }

    isRemoved() {
        // let pixel = ctx.getImageData((this.x + 1.5) * this.size , (this.y + 1.5) * this.size, 1, 1);
        // let data = pixel.data;
        // return (data[3] < 255);
        return (this.status == "removed");
    }

    setListOfShape(list) {
        this.listOfShape = list;
    }    

    updateListOfShape() {
        this.listOfShape = this.listOfShape.filter(block => block.status == "active");

        if (this.listOfShape.length < 4) {
            let queue = [];
            let traversed = [];
            queue.push(this.listOfShape.indexOf(this));
            this.listOfShape.forEach(block => traversed.push(false));

            while (queue.length > 0) {
                let index = queue.shift();
    
                if (traversed[index] == false) {
                    this.listOfShape[index].getAdjBlocks().forEach(block => queue.push(block));
                }

                traversed[index] = true;
            }

            this.listOfShape = this.listOfShape.filter(block => traversed[this.listOfShape.indexOf(block)]);

        }
    }

    getAdjBlocks() {
        return this.listOfShape.filter(block => Math.abs(block.x - this.x) == 1 && block.y == this.y || Math.abs(block.y - this.y) == 1 && block.x == this.x).map(elem => this.listOfShape.indexOf(elem));
    }
    
    getListOfShape() {
        return this.listOfShape;
    }

}

class Pivot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return (new Pivot(this.x, this.y));
    }

    move(direction) {
        switch (direction) {
            case "left":
                this.x--;
                break;
            case "right":
                this.x++
                break;
            case "down":
                this.y++;
                break;
            case "up":
                this.y--;
                break;
            default:
                break;
        }
    }
}


