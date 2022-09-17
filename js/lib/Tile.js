class Tile {

    TEXTURES = {
        GRASS: 1,
        WATER: 2
    };

    SOLID = {};
    POSITIONS = {};

    constructor(position, index, config, tilesImage) {
        this.position = position;
        this.tilesImage = tilesImage;
        this.index = index;
        this.width = config.TILE_SIZE.WIDTH;
        this.height = config.TILE_SIZE.HEIGHT;

        this.POSITIONS[this.TEXTURES.GRASS] = [0, 0];
        this.POSITIONS[this.TEXTURES.WATER] = [1, 0];


        this.SOLID[this.TEXTURES.GRASS] = false;
        this.SOLID[this.TEXTURES.WATER] = true;
    }

    draw(canvas, x, y) {

        const [sx, sy] = this.POSITIONS[this.index];
        canvas.drawImage(
            this.tilesImage,
            sx * this.width,
            sy * this.height,
            this.width,
            this.height,
            x,
            y,
            this.width,
            this.height
        );
    }

}