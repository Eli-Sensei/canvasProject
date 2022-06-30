const canvas = document.querySelector("canvas") || document.createElement("canvas");
const c = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;
c.font = "30px Arial";
//tile size in pixel
let tileW = 70;
let tileH = 70;
// map size in tile
let mapW = Math.floor(canvas.width / tileW);
let mapH = Math.floor(canvas.height / tileH);



let minimap = [
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


let walls = [];
for (let y = 0; y < mapH; y++) {
    for (let x = 0; x < mapW; x++) {
        if(minimap[y][x] > 0) {
            let wall = new Wall(x * tileW, y * tileH);
            walls.push(wall);
        }
    }
}

let player = new Player(tileW - 40, tileH - 40);

let rays = [];
let radAngle = 0;
let nbRays = 60;
const oneDegToRadAngle = (2*Math.PI) / 360;
const offsetAngle = nbRays * oneDegToRadAngle / 2
for (let degAngle = 1; degAngle <= nbRays; degAngle++) {
    radAngle = oneDegToRadAngle * degAngle
    let ray = new Ray(player.center, radAngle);
    rays.push(ray);
}


function drawMap() {
    for (let wall of walls) {
        wall.draw()
    }
   
}






function update(){
    player.update(walls)
    for (const ray of rays) {
        ray.update(player, walls);
    }
}

function draw() {
    drawMap();
    for (const ray of rays) {
        ray.draw();
    }
    player.draw();
    drawPoint(mouse.x, mouse.y, "blue", 10)
}



let deltaTime = 0;
let currentTime = Date.now();
let lastTime = 0;
function animate() {
    if (!c) return;
    c.clearRect(0, 0, canvas.width, canvas.height);


    update();
    draw();

    currentTime = Date.now();
    deltaTime = (currentTime - lastTime) / 1000
    lastTime = currentTime;

    
    c.fillText((1/deltaTime).toFixed().toString(), canvas.width - 50, 30)

    requestAnimationFrame(animate);
}
animate();

// setInterval(() => {
//     animate()
// }, 1000);


// for (let pix = 0; pix <= canvas.width; pix++) {
//     let ratio = (pix - canvas.width / 2) / (canvas.width / 2)
//     console.log(ratio)
// }




