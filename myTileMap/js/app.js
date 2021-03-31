let canvas = document.querySelector('#canvas');
let c = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 720;





//tile size in pixel
let tileW = 40;
let tileH = 40;
// map size in tile
let mapW = Math.floor(canvas.width / tileW);
let mapH = Math.floor(canvas.height / tileH);

let images = [];
function spritesInit() {
    let image1 = new Image(40, 200);
    let image2 = new Image(40, 200);
    let image3 = new Image(40, 200);
    let image4 = new Image(200, 40);
    let image5 = new Image(40, 40);

    image1.src = "./js/sprites/pipo-map001_at-kusa.png";
    image2.src = "./js/sprites/pipo-map001_at-tuti.png";
    image3.src = "./js/sprites/pipo-map001_at-yama3.png";
    image4.src = "./js/sprites/KeyIcons.png";
    image5.src = "./js/sprites/New_Piskel.png";

    images.push(image1);
    images.push(image2);
    images.push(image3);
    images.push(image4);
    images.push(image5);
}
spritesInit();

class Tiles{
    constructor(type, layer, collision, color, imgX, imgY, isImage, indexOfImage = 0){
        this.type = type;
        this.layer = layer;
        this.collision = collision;
        this.color = color;
        this.imgX = imgX;
        this.imgY = imgY;
        this.isImage = isImage;
        this.indexOfImage = indexOfImage;
    }
}

class InteractObjects extends Tiles{
    constructor(name, type, layer, collision, color, imgX, imgY, isImage, indexOfImage = 0){
        super(type, layer, collision, color, imgX, imgY, isImage, indexOfImage);
        this.name = name;

    }

    destroy(item){
        // console.log(layers[1][gameMapLayers[1][(item.y*mapW) + item.x]]);
        gameMapLayers[1][(item.y*mapW) + item.x] = 0;

        // change le nom pick parce que cette fonction permet enfaite que de faire depop l'object
    }
}

class Entities extends Tiles{
    constructor(type, layer, collision, color, x, y, w, h, offset, imageSrc){
        super(type, layer, collision, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offset = offset;
        this.isMoving = false;
        this.direction = null;
        this.inventory = [];

        this.image = new Image(w, h);
        this.image.src = imageSrc;
    }

    getNewTile() {
        let currentPos = {x: this.x, y: this.y};
        let newPos = {x: this.x, y: this.y};
        // console.log(this)
        // console.log(newPos)
    
        if (this.direction == "up") newPos.y -= tileH;
        if (this.direction == "down") newPos.y += tileH;
        if (this.direction == "right") newPos.x += tileW;
        if (this.direction == "left") newPos.x -= tileW;
    
        newPos.x /= tileW;
        newPos.y /= tileH;
    
        let newTargetTile = {
            x: newPos.x,
            y: newPos.y,
            gameMapTile: layers[0][gameMapLayers[0][(newPos.y*mapW) + newPos.x]],
            interactObjectsTile: layers[1][gameMapLayers[1][(newPos.y*mapW) + newPos.x]]
    
        }
    
        return newTargetTile;
    }

    interact(newTargetedTile){
        // console.log(tile);
        // console.log(newTargetedTile);
        // console.log(newTargetedTile.interactObjectsTile.type);
        
        let newTileInfos = {};

        // if no collision so can move
        if (newTargetedTile.gameMapTile.type == "ground" && !newTargetedTile.interactObjectsTile.collision) {
            newTileInfos.canPass = true;
        }else{
            if(newTargetedTile.gameMapTile.collision || newTargetedTile.interactObjectsTile.collision){
                newTileInfos.canPass = false;
            }
            
        }

        if(newTargetedTile.gameMapTile.type == "wall") console.log("Ughr, a wall..");

        if(newTargetedTile.interactObjectsTile.name == "door"){

            if(this.getInventoryItem("key")){
                newTargetedTile.interactObjectsTile.destroy(newTargetedTile);
                this.removeFromInventory("key");
                console.log("You opened a door");
            }else{
                console.log("a door...I need a key");
            }
        }

        if (newTargetedTile.interactObjectsTile.type == "item") {

            console.log(`you picked up "${newTargetedTile.interactObjectsTile.name}"`);
            this.addToInventory(newTargetedTile.interactObjectsTile);
            newTargetedTile.interactObjectsTile.destroy(newTargetedTile);
            // console.log(this.inventory);
        }

        return newTileInfos;
    }

    moveTo(newTargetedTile){
        // console.log(newTargetedTile);
        this.x = newTargetedTile.x * tileW;
        this.y = newTargetedTile.y * tileH;
    }

    moveController(){
        let newTargetedTile = this.getNewTile();
        let tileInfos = this.interact(newTargetedTile);

        if(tileInfos.canPass) this.moveTo(newTargetedTile);
    }

    addToInventory(item){

        let found = this.getInventoryItem(item.name);
        if (found) {
            found.count += 1;
            found.innerHTML += 1;
        }else {
            this.inventory.push({tileItem: item, name: item.name, count: 1});
            let $inventory = document.querySelector(".inventory");
            let $div = document.createElement("div");
            $div.classList.add("inventory-item");
            $div.style.backgroundImage = `url(${images[item.indexOfImage].src})`;
            $div.style.backgroundPosition = `${item.imgX}px ${item.imgY}`;
            $div.innerHTML = "1";
            $inventory.appendChild($div);
        }
    }

    removeFromInventory(itemName){
        let found = this.getInventoryItem(itemName);
        if (found) {
            found.count -= 1;
            if(found.count <= 0) this.inventory.splice(this.inventory.indexOf(found), 1);
            // console.log(this.inventory);
        }else {
            this.inventory.push({name: item.name, count: 1});   
        }
    }

    getInventory(){
        return this.inventory;
    }

    getInventoryItem(itemName){
        let found = false;
        for(let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].name == itemName) {
                found = true;
                return this.inventory[i];
            }
        }
        return found;
    }

    loadInventory(){

    }

    showInventory(){
        for (const item of this.inventory) {
            console.log(item, item.name, item.count);

        }
        this.loadInventory();
        let $inventory = document.querySelector(".inventory");
        $inventory.classList.toggle("show");
        console.log($inventory)
    }
}


import {gameMapLayers} from "./maps.js";
import * as Functions from "./functions.js";

let player = new Entities("player", 1, false, "blue", 13 * tileW, 5 * tileH, tileW - 5, tileH - 5, 2.5, "./js/sprites/player.png");

let layers = [
    [
        new Tiles("wall", 0, true, "darkred", 0, 160, true, 0),
        new Tiles("ground", 0, false, "white", 0, 120, true, 1),
    ],
    [
        new InteractObjects("invisible", "invisible", 1, false, "transparent", 0, 0, false),
        new InteractObjects("key", "item", 1, false, "pink", 0, 0, true, 3),
        new InteractObjects("door", "obstacle", 0, true, "orange", 0, 0, true, 4),
    ],
    [
        new InteractObjects("invisible", "invisible", 1, false, "transparent", 0, 0, false),
        new InteractObjects("rock", "decor", 1, false, "red", 0, 0, true, 2),
    ]
];



// LISTENER

window.addEventListener("keydown", (e)=>{
    let key = e.key;
    
});

window.addEventListener("keyup", (e)=>{
    let key = e.key.toLowerCase();
    player.isMoving = false;
    player.direction = null;
    player.isMoving = true;

    let abledInput = ["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "i"]
    
    if (abledInput.includes(key)) {
        
        if(key == "arrowup") player.direction = "up";
        if(key == "arrowdown") player.direction = "down";
        if(key == "arrowleft") player.direction = "left";
        if(key == "arrowright") player.direction = "right";
        if(key == " ") console.log("Interact !");
        if(key == "i") player.showInventory();

        entityBehevior(player);

    }

    
});

function entityBehevior(entity) {
    entity.moveController();
}


// draws
function drawEntity(entity) {
    c.fillStyle = entity.color;
    // c.fillRect(entity.x + entity.offset, entity.y + entity.offset, entity.w, entity.h);
    c.drawImage(entity.image, entity.x, entity.y);
}



let count = 1;
function drawTile(coordinates, tile) {
        
    if (tile.isImage) {
        c.drawImage(
            images[tile.indexOfImage], 
            tile.imgX, tile.imgY, // ou dans l'image
            tileW, tileH, // quel taille bout on prend
            coordinates.x, coordinates.y, // ou dans le canvas
            tileW, tileH // quel taille elle va faire
        );
    }else if(tile.type === "invisible"){
        return;
       
    }else{
        c.fillStyle = tile.color;
        c.fillRect(coordinates.x, coordinates.y, tileW, tileH);
    }
    
    

    
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
    drawEntity(player);
}

function drawGame() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();

    // requestAnimationFrame(drawGame)
}
setInterval(() => {
    drawGame();
}, 10);
