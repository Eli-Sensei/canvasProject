let canvas = document.querySelector('canvas');

canvas.width = 500;
canvas.height = 800;

let c = canvas.getContext('2d');

//////////////// PREFABS ///////////////
// stat
let stat = {
    score: 0,
    life: 3,
    addNumber: (which, num)=>{
        // increase life or score
        if(which  === 'score') stat.score += num;
        if(which  === 'life') stat.life += num;
        console.log(`added ${num} to ${which}`);
    }
}

// player
let player = {
    x: canvas.width / 2 - 10,
    y: canvas.height - 40,
    velX: 0,
    width: 20,
    height: 20,
    color: "blue",
    type: "rect",
    canMove: false,
}

// map prefab

let borderMap = {
    size: 5 // size of border
};
borderMap = {
    wallLeft: {
        x: 0,
        y: 0,
        width: borderMap.size,
        height: canvas.height,
        color: "white",
        type: 'rect'
    },
    wallRight: {
        x: canvas.width - borderMap.size,
        y: 0,
        width: borderMap.size,
        height: canvas.height,
        color: "white",
        type: 'rect'
    },
    wallTop: {
        x: 0,
        y: 0,
        width: canvas.width,
        height: borderMap.size,
        color: "white",
        type: 'rect'
    },
    wallBottom: {
        width: canvas.width,
        height: borderMap.size,
        x: 0,
        y: canvas.height - borderMap.size,
        color: "white",
        type: 'rect'
    },
    statWall: {
        x: 0,
        y: 50,
        width: canvas.width,
        height: borderMap.size,
        color: "white",
        type: 'rect'
    },
    endWall: {
        width: canvas.width,
        height: borderMap.size,
        x: 0,
        y: canvas.height - borderMap.size - 60,
        color: "white",
        type: 'rect'
    }
};


window.addEventListener("keydown", (key)=>{
    console.log(key.code);

    // Player movement
    player.canMove = true;
    if (player.canMove) {
        if (key.code === "ArrowRight") {
            player.velX = 3;
        }else if(key.code === "ArrowLeft"){
            player.velX = -3;
        }
    }
});

// window.addEventListener("keyup", (key)=>{  
//     if(key.code !== "Space"){
//         player.canMove = false;
//         player.velX = 0;
//     }
// });

let allBullets = [];
window.addEventListener("keyup", (key)=>{
    player.canMove = false;
    player.velX = 0;

    if (key.code === "Space") {
        allBullets.push(creatBullet());
        console.log(allBullets);
    }
});


////////////////////////         FUNCTION        ///////////

function drawPrefab(prefab) {
    c.fillStyle = prefab.color;
    c.fillRect(prefab.x, prefab.y, prefab.width, prefab.height);

    if(prefab.type === "rect"){
        c.fillStyle = prefab.color;
        c.fillRect(prefab.x, prefab.y, prefab.width, prefab.height);
    }else if (prefab.type === "circle"){

    }
}

// drawing the map
function drawWall() {
    drawPrefab(borderMap.wallTop);
    drawPrefab(borderMap.wallRight);
    drawPrefab(borderMap.wallLeft);
    drawPrefab(borderMap.wallBottom);
    drawPrefab(borderMap.statWall);
    drawPrefab(borderMap.endWall);
}

// drawing score and life
function drawStat() {
    c.font = "20px Verdana"
    c.fillStyle = "orange";
    c.fillText(`Score: ${stat.score}`, 12, 35);

    c.fillStyle = "red";
    c.fillText(`Life: ${stat.life}`, canvas.width - 80, 35);
}


// create bullet
function creatBullet() {
    this.bullet = {
        x: (player.x + player.width / 2) - (player.width / 3) / 2,
        y: player.y + 5,
        width: player.width / 3,
        height: player.height / 3 * 2,
        velY: -3,
        color: "green",
    }
    
    return this.bullet;
}

// bullet movement
function bulletScript() {
    for (let bullet of allBullets) {
        drawPrefab(bullet);
        bullet.y += bullet.velY;
    }
}

// player collision
function playerScript() {
    
    player.x += player.velX;
    if(player.x + player.width > canvas.width - borderMap.wallRight.width - 10){
        player.x = canvas.width - borderMap.wallRight.width - 10 - player.width;
    }else if(player.x < borderMap.wallLeft.width + 10){
        player.x = borderMap.wallLeft.width + 10;
    }
    drawPrefab(player);
}

// game engine
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height); // clear all
    
    drawWall();
    drawStat();
    bulletScript();     
    playerScript();

    requestAnimationFrame(animate);
}
animate();