class Game {

    drawInterval = null;

    constructor(config) {
        this.config = config;
    }

    init(canvasElement, canvas, assets) {
        canvasElement.setAttribute('width', this.config.WINDOW.WIDTH.toString());
        canvasElement.setAttribute('height', this.config.WINDOW.HEIGHT.toString());

        this.canvas = canvas;
        this.camera = new Camera(0, 0, this.config, {x: 0, y: 0});

        this.map = new Map(canvas, assets.get('map'), assets.get('tiles'), this.camera, this.config);
        this.camera.setMaxPosition({
            x: this.map.grid.getColumns() * this.config.TILE_SIZE.WIDTH - this.config.WINDOW.WIDTH,
            y: this.map.grid.getRows() * this.config.TILE_SIZE.HEIGHT - this.config.WINDOW.HEIGHT,
        })

        this.assets = assets;
        this.player = new Player(0, 0, this.camera);

        this.map.addEntity(this.player);

        window.addEventListener('keydown', (e) => this.onKeyDown(e), false);
    }

    draw() {
        this.canvas.clearRect(0, 0, this.config.WINDOW.WIDTH, this.config.WINDOW.HEIGHT);

        this.canvas.fillStyle = this.config.COLORS.BACKGROUND_COLOR;
        this.canvas.fillRect(0, 0, this.config.WINDOW.WIDTH, this.config.WINDOW.HEIGHT);
        this.canvas.save();

        this.map.draw();

        window.requestAnimationFrame(() => this.draw());
    }

    getMoveObject(direction) {
        const playerPos = this.player.position;
        const cameraPos = this.camera.getAccurateGridPosition();

        if (direction === 'WEST' || direction === 'EAST') {
            if (!this.player.isInHorizontalArea() || !this.camera.canMoveHorizontally(direction)) {
                return this.player;
            } else {
                return this.camera;
            }
        }

        if (direction === 'NORTH' || direction === 'SOUTH') {
            if (!this.player.isInVerticalArea() || !this.camera.canMoveVertically(direction)) {
                return this.player;
            } else {
                return this.camera;
            }
        }

        return null;
    }

    onKeyDown(e) {
        const keyCode = e.keyCode;

        const move = this.config.GAME.MOVE;

        let direction = null;
        switch (keyCode) {
            case 40:
            case 83:
                direction = 'SOUTH';
                break;
            case 37:
            case 65:
                direction = 'WEST';
                break;
            case 38:
            case 87:
                direction = 'NORTH';
                break;
            case 39:
            case 68:
                direction = 'EAST';
                break;
        }

        if (direction === null) {
            return;
        }

        let moveObject = this.getMoveObject(direction);

        if (moveObject === null) {
            return;
        }

        switch (direction) {
            case 'WEST':
                moveObject.move(-move, 0);
                break;
            case 'EAST':
                moveObject.move(move, 0);
                break;
            case 'NORTH':
                moveObject.move(0, -move);
                break;
            case 'SOUTH':
                moveObject.move(0, move);
                break;
        }

        /*
        if (keyCode === 40 || keyCode === 83) {
            this.camera.move(0, move);
            this.player.move(0, move);
        }

        if (keyCode === 37 || keyCode === 65) {
            this.camera.move(-move, 0);
            this.player.move(-move, 0);
        }

        if (keyCode === 38 || keyCode === 87) {
            this.camera.move(0, -move);
            this.player.move(0, -move);
        }

        if (keyCode === 39 || keyCode === 68) {
            this.camera.move(move, 0);
            this.player.move(move, 0)
        }

         */
    }
}