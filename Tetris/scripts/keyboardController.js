class KeyboardController {
    constructor(boardHandleKeyDown) {
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.boardHandleKeyDown = boardHandleKeyDown;
        document.addEventListener("keydown", this.handleKeyDown);
    }

    start() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    stop() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e) {
        let code = e.keyCode;
        let direction;

        switch (code) {
            case 32: 
                direction = "harddrop";
                break;
            case 37:
                direction = "left";
                break;
            case 38:
                direction = "up";
                break;
            case 39:
                direction = "right";
                break;
            case 40:
                direction = "down";
                break;
            default:
                break;
        }

        if (code == 32 || (37 <= code && code <= 40)) {
            this.boardHandleKeyDown(direction);
        }
    }
}