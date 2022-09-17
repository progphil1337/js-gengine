class Camera {

    constructor(x, y, config, minPos, maxPos = {x: 0, y: 0}) {
        this.position = new Point(x, y);
        this.config = config;
        this.minPos = minPos;
        this.maxPos = maxPos;
    }

    getGridPosition() {
        return {
            x: Math.floor(this.position.x / this.config.TILE_SIZE.WIDTH),
            y: Math.floor(this.position.y / this.config.TILE_SIZE.HEIGHT)
        }
    }

    setMaxPosition(pos) {
        this.maxPos = pos;
    }

    getAccurateGridPosition() {
        return this.position;
    }

    canMoveHorizontally(direction) {
        return direction === 'WEST' ? this.position.x > this.minPos.x : this.position.x < this.maxPos.x;
    }

    canMoveVertically(direction) {
        return direction === 'NORTH' ? this.position.y > this.minPos.y : this.position.y < this.maxPos.y;
    }

    move(x, y) {

        this.position.x += x;
        if (this.position.x < this.minPos.x) {
            this.position.x = this.minPos.x;
        } else if (this.position.x > this.maxPos.x) {
            this.position.x = this.maxPos.x;
        }

        this.position.y += y;
        if (this.position.y < this.minPos.y) {
            this.position.y = this.minPos.y;
        } else if (this.position.y > this.maxPos.y) {
            this.position.y = this.maxPos.y;
        }
    }
}