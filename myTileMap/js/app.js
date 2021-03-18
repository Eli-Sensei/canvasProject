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

class Tiles{
    constructor(type, layer, collision, color){
        this.type = type;
        this.layer = layer;
        this.collision = collision;
        this.color = color;
    }
}

class InteractObjects extends Tiles{
    constructor(type, layer, collision, color){
        super(type, layer, collision, color);
    }

}

class Entities extends Tiles{
    constructor(type, layer, collision, color, x, y, w, h){
        super(type, layer, collision, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isMoving = false;
        this.direction = null;
        this.inventory = [];
    }

    addToInventory(item){
        var found = false;
        for(var i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].name == 'key') {
                found = true;
                this.inventory[i].count += 1;
                break;
            }
        }
        if (!found) {
            this.inventory.push({name: item, count: 1});
            console.log('pas le else');            
        }
    }

    getInventory(){
        return this.inventory;
    }
}




let gameMapLayers = [
    [
        //gameMap
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
        0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        // interactsObject
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
];

let player = new Entities("player", 1, false, "blue", 12 * tileW, 5 * tileH, tileW, tileH);

let layers = [
    [
        new Tiles("wall", 0, true, "darkred"),
        new Tiles("ground", 0, false, "white"),
        new Tiles("door", 0, true, "orange"),
    ],
    [
        new InteractObjects("invisible", 1, false, "transparent"),
        new InteractObjects("key", 1, false, "pink")
    ]
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
        gameMapTile: layers[0][gameMapLayers[0][(newPos.y*mapW) + newPos.x]],
        InteractObjectsTile: layers[1][gameMapLayers[1][(newPos.y*mapW) + newPos.x]]

    }

    return newTargetTile;
}

function move(player) {
    let newTargetedTile = getNewTile(player);
    
    // if no collision so can move
    if (player.isMoving) {
        if (newTargetedTile.gameMapTile.type == "ground") {
            c.fillStyle = player.color;
            player.x = newTargetedTile.x * tileW;
            player.y = newTargetedTile.y * tileH;
        }else{
            if(newTargetedTile.gameMapTile.type == "wall") console.log("c'est un mur !!!");
            if(newTargetedTile.gameMapTile.type == "door") console.log("c'est une porte, trouve une clé...");
            
        }
    }

    if (newTargetedTile.InteractObjectsTile.type == "key") {
        console.log("C'est une clé !!!!!!!");
        player.addToInventory("key");
        console.log(player.inventory);
        
    }
}

// draws
function drawPlayer(player) {
    c.fillStyle = player.color;
    c.fillRect(player.x, player.y, player.w, player.h);
}

let count = 1;
function drawTile(coordinates, tile) {
    c.fillStyle = tile.color;
    c.fillRect(coordinates.x, coordinates.y, tileW, tileH);
}

function drawLayers() {
    for (let i = 0; i < gameMapLayers.length; i++) {
        for (let y = 0; y < mapH; y++) {
            for (let x = 0; x < mapW; x++) {
                drawTile({x: x * tileW, y: y * tileH}, layers[i][gameMapLayers[i][(y*mapW) + x]]);
            }
        }
    }
}

function drawMap() {
    drawLayers();
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
