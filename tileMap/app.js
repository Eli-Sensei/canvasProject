let c = null;

//tile size in pixel
let tileW = tileH = 40;
// map size in tile
let mapW = mapH = 10;

console.log(tileW, tileH);
console.log(mapW, mapH);

let currentSecond = frameCount = framesLastSecond = 0;
let lastFrameTime = 0;

let keysDown = {
    37: false,
    38: false,
    39: false,
    40: false
};

class Character{
    constructor() {
        this.tileFrom = [1, 1];
        this.tileTo = [1, 1];
        this.timeMoved = 0;
        this.dimensions = [30, 30];
        this.position = [45, 45];
        this.delayMove = 700;
    }
    
    placeAt(x, y){
        this.tileFrom = [x, y];
        this.tileTo = [x, y];
        this.position = [
            ((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
            ((tileH * y) + ((tileH - this.dimensions[1]) / 2))
        ];
    }

    processMovement(t){
        if (this.tileFrom[0] === this.tileTo[0] && this.tileFrom[1] === this.tileTo[1]) {
            return false;
        }

        if ((t - this.timeMoved) >= this.delayMove) {
            this.placeAt(this.tileTo[0], this.tileTo[1]);
        }else{
            this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
            this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

            if (this.tileTo[0] != this.tileFrom[0]) {
                let diff = (tileW / this.delayMove) * (t - this.timeMoved);
                this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
            }

            if (this.tileTo[1] != this.tileFrom[1]) {
                let diff = (tileH / this.delayMove) * (t - this.timeMoved);
                this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
            }

            this.position[0] = Math.round(this.position[0]);
            this.position[1] = Math.round(this.position[1]);
        }
        return true;
    }
}

function toIndex(x, y){
    return ((y * mapW) + x);
}

let player = new Character();

let gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

window.onload = function () {
    c = document.querySelector('canvas').getContext("2d");
    requestAnimationFrame(drawGame);
    c.font = "bold 10pt sans-serif";

    window.addEventListener("keydown", (e)=>{
        if(e.keyCode >= 37 && e.keyCode <= 40){
            keysDown[e.keyCode] = false;
        }
        // console.log(e.keyCode);
    });

    window.addEventListener("keyup", (e)=>{
        if(e.keyCode >= 37 && e.keyCode <= 40){
            keysDown[e.keyCode] = true;
        }
        console.log(e.keyCode);
    });
  
};

function drawGame() {
    if (c === null) return;
    c.clearRect(0, 0, 400, 400);

    let currentFrameTime = Date.now();
    let timeElapsed = currentFrameTime - lastFrameTime;


    // FPS systeme
    let sec = Math.floor(Date.now() / 1000);
    if (sec !== currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    }else{ frameCount++};

    if (!player.processMovement(currentFrameTime)) {
        // up key
        if (keysDown[38] && player.tileFrom[1] > 0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] - 1)] === 1) {
            player.tileTo[1] -= 1;
        }
        // down key
        else if(keysDown[40] && player.tileFrom[1] < (mapH - 1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] + 1)] === 1){
            player.tileTo[1] += 1;
        }
        //left key
        else if(keysDown[37] && player.tileFrom[0] > 0 && gameMap[toIndex(player.tileFrom[0] - 1, player.tileFrom[1])] === 1){
            player.tileTo[0] -= 1;
        }
        //right key
        else if(keysDown[39] && player.tileFrom[0] < (mapW - 1) && gameMap[toIndex(player.tileFrom[0] + 1, player.tileFrom[1])] === 1){
            player.tileTo[0] += 1;
        }

        if (player.tileFrom[0] !== player.tileTo[0] && player.tileFrom[1] !== player.tileTo[1]) {
            player.timeMoved = currentFrameTime;
        }
    }

    
    
    // tiles Draw
    for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            switch (gameMap[(y*mapW) + x]) {
                case 0:
                    c.fillStyle = "#999999";
                    
                    break;
            
                default:
                    c.fillStyle = "#eeeeee";
                    
                    break;
            }
            c.fillRect(x*tileW, y*tileH, tileW, tileH);
        }
    }
    c.fillStyle = "#0000ff";
    c.fillRect(player.position[0], player.position[1], player.dimensions[0], player.dimensions[1]);

    c.fillStyle = "#ff0000";
    c.fillText("FPS: " + framesLastSecond, 10, 20);

    lastFrameTime = currentFrameTime;
    requestAnimationFrame(drawGame);
}