const canvas = document.querySelector("canvas") || document.createElement("canvas");
const c = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;

//tile size in pixel
let tileW = 70;
let tileH = 70;
// map size in tile
let mapW = Math.floor(canvas.width / tileW);
let mapH = Math.floor(canvas.height / tileH);



let map = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
]

let mouse = {
    x: 0,
    y: 0
};
const inputs = {
    left: false,
    right: false,
    top: false,
    bottom: false,
};


function setListeners() {
    
    window.addEventListener("keydown", (e) => {
        if (e.key === "q") inputs.left = true;
        if (e.key === "d") inputs.right = true;
        if (e.key === "z") inputs.top = true;
        if (e.key === "s") inputs.bottom = true;
    });
    window.addEventListener("keyup", (e) => {
        if (e.key === "q") inputs.left = false;
        if (e.key === "d") inputs.right = false;
        if (e.key === "z") inputs.top = false;
        if (e.key === "s") inputs.bottom = false;
    });
    
    window.addEventListener("mousemove", (e) => {
        mouse = getMousePos(canvas, e);
        if (mouse.x > canvas.width) mouse.x = canvas.width
        else if (mouse.x < 0) mouse.x = 0
        if (mouse.y > canvas.height) mouse.y = canvas.height
        else if (mouse.y < 0) mouse.y = 0
    });
}
setListeners();




let player = {
    x: 2,
    y: 5,
    speed: 0.1,
    angle: 0,
    rotation_speed: 0.2
}

function drawPlayer(){
    drawTile(player, 2)

    // la direction
    let xx = Math.cos(player.angle) * 30
    let yy = Math.sin(player.angle) * 30
    // let xx = Math.cos(player.angle * Math.PI / 180) * 30
    // let yy = Math.sin(player.angle * Math.PI / 180) * 30
    let playerTransform = {
        canvasPos: {
            x: player.x * tileW + tileW / 2,
            y: player.y * tileH + tileH / 2
        },
        directionCompass: {
            x: player.x * tileW + tileW / 2 + xx,
            y: player.y * tileH + tileH / 2 + yy
        },
    }
    drawLine(playerTransform.canvasPos, playerTransform.directionCompass)
    
}

function movePlayer(nb){

    let cosX = Math.cos(player.angle);
    let sinY = Math.sin(player.angle);

    let tempX = player.x + (player.speed * cosX) * nb
    let tempY = player.y + (player.speed * sinY) * nb

    if(nb > 0){
        // droite
        if(cosX >= 0) tempX++
        // gauche
        // else if(cosX <= 1) tempX--
        // bas
        if(sinY >= 0) tempY++
        // haut
        // else if(sinY <= 1) tempY--
    }
    

    if(map[Math.floor(player.y)][Math.floor(tempX)] == 0)
        player.x = Math.floor(tempX)
    if(map[Math.floor(tempY)][Math.floor(player.x)] == 0)
        player.y = Math.floor(tempY)

    

    // console.log(Math.round(player.x), player.y)
    console.log(Math.floor(tempX), Math.floor(tempY))
    
    // console.log(player.angle)
}

function playerController(){
    if(inputs.right) player.angle += player.rotation_speed;
    if(inputs.left) player.angle -= player.rotation_speed;
    if(inputs.top) movePlayer(1);
    if(inputs.bottom) movePlayer(-1);
}





function drawTile(coor, color){
    if (!c) return;
    let colors = ["gray", "black", "red"]
    c.fillStyle = colors[color];
    c.fillRect(coor.x * tileW, coor.y * tileH, tileW, tileH);
}

function drawMap() {
    for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            drawTile({x: x, y: y}, map[y][x]);
        }
    }
}






function update(){
    playerController();
}

function draw() {
    drawMap();
    drawPlayer();
    drawPoint(mouse.x, mouse.y, "blue", 10)
}




function animate() {
    if (!c) return;
    c.clearRect(0, 0, canvas.width, canvas.height);


    update();
    draw();


    // requestAnimationFrame(animate);
}
// animate();

setInterval(() => {
    animate()
}, 100);


// for (let pix = 0; pix <= canvas.width; pix++) {
//     let ratio = (pix - canvas.width / 2) / (canvas.width / 2)
//     console.log(ratio)
// }



/*
class PVector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(PVector) {
        this.x = PVector.x;
        this.y = PVector.y;
    }
    add(PVector) {
        this.x += PVector.x;
        this.y += PVector.y;
    }
    sub(PVector) {
        this.x += -PVector.x;
        this.y += -PVector.y;
    }
    mult(number) {
        this.x *= number;
        this.y *= number;
    }
    div(number) {
        this.x /= number;
        this.y /= number;
    }
    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    normalize() {
        let m = this.mag();
        if (m != 0) {
            this.div(m);
        }
    }
    limit(max) {
        if (this.mag() > max) {
            // console.log('prout');
            this.normalize();
            this.mult(max);
        }
    }
    random2D() {
        this.set(new PVector(random(-800, canvas.width), random(-500, canvas.height)));
        this.normalize();
        // console.log(this.x, this.y);
        // setTimeout(console.clear, 1000)
        // console.log(this);
    }
    // STATIC METHOD
    static addi(v1, v2) {
        const v3 = new PVector(v1.x + v2.x, v1.y + v2.y);
        return v3;
    }
    static subi(v1, v2) {
        const v3 = new PVector(v1.x - v2.x, v1.y - v2.y);
        return v3;
    }
    static multi(v1, number) {
        const v3 = new PVector(v1.x * number, v1.y * number);
        return v3;
    }
    static divi(v1, number) {
        const v3 = new PVector(v1.x / number, v1.y / number);
        return v3;
    }
    static disti(v1, v2) {
        return Math.sqrt(Square(v2.x - v1.x) + Square(v2.y - v1.y));
    }
}
*/