class Grid {

    slots = [];

    constructor(mapData, config, tilesImage) {
        for (let row = 0; row < mapData.length; row++) {
            this.slots[row] = [];
            for (let col = 0; col < mapData[row].length; col++) {
                this.slots[row][col] = new Tile(new Point(col, row), mapData[row][col], config, tilesImage);
            }
        }
    }

    getColumns() {
        return this.slots[0].length;
    }

    getRows() {
        return this.slots.length;
    }
}