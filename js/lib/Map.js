class Map {

    entities = [];

    constructor(canvas, mapData, tilesImage, camera, config) {

        this.grid = new Grid(mapData, config, tilesImage);
        this.camera = camera;
        this.config = config;
        this.canvas = canvas;

        this.maxTiles = {
            x: Math.ceil(config.WINDOW.WIDTH / config.TILE_SIZE.WIDTH) + 2, // buffer left, right
            y: Math.ceil(config.WINDOW.HEIGHT / config.TILE_SIZE.HEIGHT) + 2 // buffer top, bottom
        }
    }

    getOffset() {

        const cameraPos = this.camera.getAccurateGridPosition();

        return {
            x: -(cameraPos.x % this.config.TILE_SIZE.WIDTH),
            y: -(cameraPos.y % this.config.TILE_SIZE.HEIGHT)
        }
    }

    draw() {
        const offset = this.getOffset();

        const tilePos = {
            x: Math.floor(this.camera.getAccurateGridPosition().x),
            y: Math.floor(this.camera.getAccurateGridPosition().y)
        };

        // tiles
        for (let y = 0; y < this.maxTiles.y; y++) {
            const cameraGridPos = this.camera.getGridPosition();
            const tileY = cameraGridPos.y + y;
            const screenY = y * this.config.TILE_SIZE.HEIGHT + offset.y;

            // reset
            tilePos.x = cameraGridPos.x;

            for (let x = 0; x < this.maxTiles.x; x++) {
                const tileX = tilePos.x + x;
                const screenX = x * this.config.TILE_SIZE.WIDTH + offset.x;

                const row = this.grid.slots[tileY] || undefined;
                if (row === undefined) {
                    continue;
                }

                const tile = this.grid.slots[tileY][tileX] || undefined;
                if (tile === undefined) {
                    continue;
                }

                tile.draw(this.canvas, screenX, screenY);

                /*
                this.canvas.beginPath();
                this.canvas.rect(screenX, screenY, this.config.TILE_SIZE.WIDTH, this.config.TILE_SIZE.HEIGHT);
                this.canvas.stroke();
                this.canvas.strokeText(tile.position.x + ':' + tile.position.y, screenX, screenY + this.config.TILE_SIZE.HEIGHT);
                this.canvas.strokeText(tile.position.x + ':' + tile.position.y, screenX, screenY + this.config.TILE_SIZE.HEIGHT);
                 */
            }
        }

        // entities
        for(let entity of this.entities) {
            entity.draw(this.canvas);
        }
    }

    addEntity(player) {
        this.entities.push(player);
    }
}