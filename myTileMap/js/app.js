let canvas = document.querySelector('canvas');
let c = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 720;





//tile size in pixel
let tileW = 40;
let tileH = 40;
// map size in tile
let mapW = canvas.width / tileW;
let mapH = canvas.height / tileH;

class Tile{
    constructor(){}
}


let player = {
    x: 2 * tileW,
    y: 4 * tileH,
    w: tileW,
    h: tileH,
    isMoving: false,
    direction: null,
    color: "blue"
}


let gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

let tilesType = [
    {
        tileName: "wall",
        collision: true,
        color: "darkred"
    },
    {
        tileName: "ground",
        collision: false,
        color: "burlywood"
    }
];


// LISTENER

window.addEventListener("keydown", (e)=>{
    let key = e.key;
    
});

window.addEventListener("keyup", (e)=>{
    let key = e.key;
    player.isMoving = false;
    player.direction = null;
    player.isMoving = true;

    if(key == "ArrowUp") player.direction = "up";
    if(key == "ArrowDown") player.direction = "down";
    if(key == "ArrowLeft") player.direction = "left";
    if(key == "ArrowRight") player.direction = "right";

    move(player);
});

function getNewTile(player) {
    let currentPos = {x: player.x, y: player.y};
    let newPos = {x: player.x, y: player.y};

    if (player.direction == "up") newPos.y -= tileH;
    if (player.direction == "down") newPos.y += tileH;
    if (player.direction == "right") newPos.x += tileW;
    if (player.direction == "left") newPos.x -= tileW;

    newPos.x /= tileW;
    newPos.y /= tileH;

    let newTargetTile = {
        x: newPos.x,
        y: newPos.y,
        tile: tilesType[gameMap[(newPos.y*mapW) + newPos.x]]
    }

    return newTargetTile;
}

function move(player) {
    let newTargetedTile = getNewTile(player);
    
    // if no collision so can move
    if (player.isMoving && !newTargetedTile.tile.collision) {
        // console.log(newTargetedTile);
        c.fillStyle = player.color;
        player.x = newTargetedTile.x * tileW;
        player.y = newTargetedTile.y * tileH;
    }
}

// draws
function drawPlayer(player) {
    c.fillStyle = player.color;
    c.fillRect(player.x, player.y, player.w, player.h);
}

function drawTile(coordinates, type) {
    c.fillStyle = type.color;
    c.fillRect(coordinates.x, coordinates.y, tileW, tileH);
}

function drawMap() {
    for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            drawTile({x: x * tileW, y: y * tileH}, tilesType[gameMap[(y*mapW) + x]]);
        }
    }
    drawPlayer(player);
}

function drawGame() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();

    
    // requestAnimationFrame(drawGame)
}
setInterval(() => {
    drawGame();
}, 10);

console.log(gameMap.length, mapW * mapH);