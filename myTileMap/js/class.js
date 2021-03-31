import {gameMapLayers, tileH, tileW, mapW, mapH} from "./maps.js";

export class Tiles{
    constructor(type, layer, collision, color, imgX, imgY, isImage){
        this.type = type;
        this.layer = layer;
        this.collision = collision;
        this.color = color;
        this.imgX = imgX;
        this.imgY = imgY;
        this.isImage = isImage;
    }
}

export class InteractObjects extends Tiles{
    constructor(name, type, layer, collision, color, imgX, imgY, isImage){
        super(type, layer, collision, color, imgX, imgY, isImage);
        this.name = name;

    }

    destroy(item){
        // console.log(layers[1][gameMapLayers[1][(item.y*mapW) + item.x]]);
        gameMapLayers[1][(item.y*mapW) + item.x] = 0;

        // change le nom pick parce que cette fonction permet enfaite que de faire depop l'object
    }
}

export class Entities extends Tiles{
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
        }else {
            this.inventory.push({name: item.name, count: 1});   
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
            console.log(item.name, item.count);

        }
        this.loadInventory();
        document.getElementsByClassName("canvas2")[0].classList.toggle("show");
    }
}