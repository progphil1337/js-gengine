class Player {

    area = {
        x: [],
        y: []
    };

    width = 100;
    height = 200;

    constructor(x, y, camera) {
        this.position = new Point(x, y);
        this.windowSize = camera.config.WINDOW;

        const padding = {
            x: this.windowSize.WIDTH * 0.25,
            y: this.windowSize.HEIGHT * 0.25
        };

        this.area.x = [
            padding.x,
            this.windowSize.WIDTH - padding.x
        ];

        this.area.y = [
            padding.y,
            this.windowSize.HEIGHT - padding.y
        ];
    }

    isInHorizontalArea() {
        const x = this.position.x;
        return x > this.area.x[0] && x < this.area.x[1];
    }

    isInVerticalArea() {
        const y = this.position.y;
        return y > this.area.y[0] && y < this.area.y[1];
    }

    move(x, y) {

        const newX = this.position.x + x;
        const newY = this.position.y + y;

        if (newX >= 0 && newX <= this.windowSize.WIDTH - this.width) {
            this.position.x = newX;
        }

        if (newY >= 0 && newY <= this.windowSize.HEIGHT - this.height) {
            this.position.y = newY;
        }
    }

    draw(canvas) {
        canvas.beginPath();
        canvas.rect(this.position.x, this.position.y, this.width, this.height);
        canvas.stroke();
    }
}