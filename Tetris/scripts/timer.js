class Timer {
    constructor(animatingFunction) {
        this.delayRate = 1000;
        this.startingTime = performance.now();
        this.animatingFunction = animatingFunction;      
        this.animation = requestAnimationFrame(this.run.bind(this));
    }

    start() {
        this.startingTime = performance.now();
        this.animation = window.requestAnimationFrame(this.run.bind(this));        
    }

    stop() {
        cancelAnimationFrame(this.animation);
    }

    reset() {
        this.delayRate = 1000;
    }

    run(timestamp) {
        this.animation = requestAnimationFrame(this.run.bind(this));
        
        if (timestamp - this.startingTime >= this.delayRate) {
            this.animatingFunction();
            this.startingTime = performance.now();
        }
    }
    
}

