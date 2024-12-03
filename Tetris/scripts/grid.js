class Grid {
    constructor() {
        this.table = [];

        for (let index = 0; index < HEIGHT; index++) {
            this.table.push([]);
        }
    }

    get Table() {
        return this.table;
    }

    draw() {
        ctx.clearRect(0, 0, WIDTH * SIZE, HEIGHT * SIZE);
        this.table.forEach(row => row.forEach(block => block.draw()));
    }

    addShape(shape) {
        let list = shape.getList();
        list.forEach(block => block.setListOfShape(list));
        list.forEach(block => this.table[block.y][block.x] = block);
    }

    canCreateShape(shape) {
        let list = shape.getList();
        return list.every(block => this.table[block.y][block.x] == null);
    }

    

    async clearRow() {        

        while (this.filterRows().length > 0) {

            await this.makeRowsWhite(this.filterRows());

            this.draw();
            await this.sleep();

            await this.removeRows(this.filterRows());

            this.draw();
            await this.sleep();

            await this.dropBlocks();
        }

        return new Promise(resolve => setTimeout(resolve, 0));
    }

    filterRows() {
        //filter the rows which satisfy the condition that 10 blocks are horizontally positioned.
        let listFiltered = this.table.filter(row => {
            let length = 0;
            row.forEach(block => length++);
            return length == 10;
        }).map(elem => this.table.indexOf(elem));

        return listFiltered;
    }

    makeRowsWhite(listFiltered) {
        //remove the blocks in the filtered rows
        listFiltered.forEach(i => this.table[i].forEach(block => block.remove()));
        this.table.forEach(row => row.forEach(block => block.updateListOfShape()));
        listFiltered.forEach(i => this.table[i].forEach(block => block.color = "white"));

        return new Promise(resolve => setTimeout(resolve, 0));
    }

    removeRows(listFiltered) {
        //remove rows from the grid of the board.
        listFiltered.forEach(i => {
            this.table.slice(0, i).forEach(row => row.forEach(block => block.move("down")));
            this.table = this.table.slice(0, i).concat(this.table.slice(i + 1));
            this.table.unshift([]);
        }); 

        return new Promise(resolve => setTimeout(resolve, 0));
    }

    async dropBlocks() {
        //Drop The Blocks in the air.
        for (let i = this.table.length - 1; i >= 0; i--) {
            for (let j = 0; j < this.table[i].length; j++) {
                if (this.table[i][j] != null) {
                    this.move(this.table[i][j].getListOfShape());

                    this.table.forEach(row => {
                        let rowFiltered = row.filter(block => block != null);
                        this.table[this.table.indexOf(row)] = [];
                        rowFiltered.forEach(block => this.table[block.y][block.x] = block);
                    });


                    if (this.table[i][j] == null ) {
                        this.draw();
                        await this.sleep(1000);
                    }
                }
            }
            
        }

        return new Promise(resolve => setTimeout(resolve, 0));
    }

    move(list) {
        list.forEach(block => this.table[block.y][block.x] = null);

        while (list.every(block => block.canMove("down", this.table))) {
            list.forEach(block => block.move("down"));
        }

        list.forEach(block => this.table[block.y][block.x] = block);
    }

    sleep(duration = 500) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }
}

