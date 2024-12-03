//Class Shape implementation
class Shape {
    constructor(pivot, list, color) {
        this.pivot = pivot;
        this.list = list.map(point => new Block(point[0], point[1], color));
        this.grid;
    }

    draw() {
        this.drawGhostPiece();
        this.list.forEach(block => block.draw());
    }

    drawGhostPiece() {
        let listOfGhostPiece = this.list.map(block => block.copy());
        while (listOfGhostPiece.every(block => block.canMove("down", this.grid.Table))) {
            listOfGhostPiece.forEach(block => block.move("down"));
        }

        listOfGhostPiece.forEach(block => block.color = "gray");
        listOfGhostPiece.forEach(block => block.draw());
    }

    move(direction = "down") {
        this.list.forEach(block => block.move(direction));
        this.pivot.move(direction);
    }

    rotate() {
        this.list.forEach(block => block.rotate(this.pivot));            
    }

    canMove(direction = "down") {
        return this.list.every(block => block.canMove(direction, this.grid.Table));
    }

    canRotate() { 
        if (this.list.every(block => block.canRotate(this.pivot, this.grid.Table))) {
            return true;
        }
        else {
            let directions = ["right", "left", "up"];

            for (let i = 0; i < directions.length; i++) {
                let list = this.list.map(block => block.copy());
                let pivot = this.pivot.copy();

                for (let j = 0; j < 2; j++) {
                    list.forEach(block => block.move(directions[i]));
                    pivot.move(directions[i]);    
                        
                    if (list.every(block => block.canRotate(pivot, this.grid.Table))) {
                        for (let k = 0; k <= j; k++) {
                            this.move(directions[i]);
                        }
                        return true;
                    }
                }
                
            }
            return false;
        }
    }

    getList() {
        return this.list;
    }

    setGrid(grid) {
        this.grid = grid;
    }
}

//Implementations of The inheriting shapes

class O_Shape extends Shape {
    constructor() {
        super(new Pivot(5, 1), [[4, 0], [4, 1], [5, 0], [5, 1]], "yellow");
    }

    rotate() {}
}

class I_Shape extends Shape {
    constructor() {
        super(new Pivot(5, 2), [[3, 1], [4, 1], [5, 1], [6, 1]], "cyan");
    }
}

class T_Shape extends Shape {
    constructor() {
        super(new Pivot(4, 1), [[4, 1], [3, 1], [5, 1], [4, 0]], "purple");
    }
}

class L_Shape extends Shape {
    constructor() {
        super(new Pivot(4, 1), [[3, 1], [4, 1], [5, 1], [5, 0]], "orange");
    }
}

class J_Shape extends Shape {
    constructor() {
        super(new Pivot(4, 1), [[3, 0], [3, 1], [4, 1], [5, 1]], "blue");
    }
}

class S_Shape extends Shape {
    constructor() {
        super(new Pivot(4, 1), [[3, 1], [4, 1], [4, 0], [5, 0]], "green");
    }
}

class Z_Shape extends Shape {
    constructor() {
        super(new Pivot(4, 1), [[3, 0], [4, 0], [4, 1], [5, 1]], "red");
    }
}

//Implementation of ShapeGenerator

class ShapeGenerator {
    constructor(grid) {
        this.grid = grid;
        this.randomNumber;
    }

    getNewShape() {
        let randomNumber, shapeSelected;
        let shapes = [  new O_Shape(), new I_Shape(), 
            new T_Shape(), new L_Shape(), 
            new J_Shape(), new S_Shape(), 
            new Z_Shape()
        ];

        do {
            randomNumber = Math.floor(Math.random() * 7);
        } while (randomNumber == this.randomNumber);

        this.randomNumber = randomNumber;
        shapeSelected = shapes[randomNumber];
        shapeSelected.setGrid(this.grid); 
        shapeSelected.draw();       
        return shapeSelected;
    }

    canGenerateShape() {
        let shapes = [  new O_Shape(), new I_Shape(), 
            new T_Shape(), new L_Shape(), 
            new J_Shape(), new S_Shape(), 
            new Z_Shape()
        ];

        return shapes.every(shape => this.grid.canCreateShape(shape));
    }
}