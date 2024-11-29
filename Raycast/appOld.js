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
    x: 300,
    y: 300,
    width: 10,
    speed: 0.1,
    angle: Math.PI,
    rotationSpeed: 0.2,
    deltaX: 0,
    deltaY: 0
}

function drawPlayer(){
    drawSquare(player.x, player.y, player.width, "green")

    drawLine(
        {x: player.x + player.width / 2, y: player.y + player.width / 2},
        {x: player.x + player.deltaX * 5, y: player.y + player.deltaY * 5},
        2
    );
    
}


function playerController(){
    if(inputs.left) {
        player.angle -= player.rotationSpeed;
        if(player.angle < 0) player.angle += 2 * Math.PI;
        // player.deltaX = Math.cos(player.angle) * 10;
        // player.deltaY = Math.sin(player.angle) * 10;
    }

    if(inputs.right) {
        player.angle += player.rotationSpeed;
        if(player.angle > 2 * Math.PI) player.angle -= 2 * Math.PI;
        // player.deltaX = Math.cos(player.angle) * 10;
        // player.deltaY = Math.sin(player.angle) * 10;
    }
    if(inputs.top){
        player.x += player.deltaX;
        player.y += player.deltaY;

    } 
    if(inputs.bottom){
        player.x -= player.deltaX;
        player.y -= player.deltaY;
    }
    player.deltaX = Math.cos(player.angle) * 10;
    player.deltaY = Math.sin(player.angle) * 10;
    // if(inputs.right) player.angle -= player.rotationSpeed;
    // if(inputs.left) player.angle += player.rotationSpeed;
    // if(inputs.top) movePlayer(1);
    // if(inputs.bottom) movePlayer(-1);
}




function drawRays() {
    let r, mx, my, mp, dof,  rx, ry, ra, xo, yo;
    ra = player.angle;
    // Horizontale lione
    let aTan = -1/Math.tan(ra);
    if(ra>Math.PI){
        ry = ((Math.floor(py)>>6)<<6)-0.0001; // looking down
        rx = (player.y - ry) * aTan+player.x
        yo = -40
        xo = -yo*aTan;
    }
    if(ra>Math.PI){
        ry = ((Math.floor(py)>>6)<<6)+40; // looking up
        rx = (player.y - ry) * aTan+player.x
        yo = 40
        xo = -yo*aTan;
    }
    if(ra == 0 || ra == Math.PI){
        rx = player.x
        ry = player.y
        dof = 8
    }
    while(dof < 8){
        mx = Math.floor(rx) >> 6;
        my = Math.floor(ry) >> 6;
        mp = my*mapX+mx;
    }
}




function drawTile(coor, color){
    if (!c) return;
    let colors = ["gray", "black", "red"]
    c.fillStyle = colors[color];
    c.fillRect(coor.x * tileW + 1, coor.y * tileH + 1, tileW - 1, tileH - 1);
}

function drawMap() {
    for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
            drawTile({x: x, y: y}, map[y][x]);
        }
    }
}






function draw() {
    drawMap();

    playerController();
    drawPlayer();

    drawPoint(mouse.x, mouse.y, "blue", 10)
}




function animate() {
    if (!c) return;
    c.clearRect(0, 0, canvas.width, canvas.height);

    draw();


    // requestAnimationFrame(animate);
}
// animate();

setInterval(() => {
    animate()
}, 30);


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