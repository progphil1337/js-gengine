const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d');

const assets = new Assets({
    tiles: 'assets/images/tiles.png',
    map: 'assets/map.json'
});

const game = new Game({
    WINDOW: {
        HEIGHT: window.innerHeight,
        WIDTH: window.innerWidth,
    },
    GRID: {
        COLUMNS: 1000,
        ROWS: 5000
    },
    TILE_SIZE: {
        HEIGHT: 40,
        WIDTH: 60
    },
    FRAMES: 24,
    COLORS: {
        BACKGROUND_COLOR: '#FFF'
    },
    GAME: {
        MOVE: 5
    },
});

assets.ready(() => game.init(canvasElement, canvas, assets) || window.requestAnimationFrame(() => game.draw()));