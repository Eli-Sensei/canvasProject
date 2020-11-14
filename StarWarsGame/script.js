const canvas = document.querySelector("#canvas1");
const c = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;


const keys = [];

const player = {
    x: 200,
    y: 300,
    width: 40,
    height: 72,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const playerSprite = new Image();
playerSprite.src = "./sprites/chewie.png";
const background = new Image();
background.src = "./sprites/background.png";



function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    c.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}


window.addEventListener('keydown', (key)=>{
    keys[key.keyCode] = true;
    player.moving = true;
});
window.addEventListener('keyup', (key)=>{
    delete keys[key.keyCode];
    player.moving = false;
});

function movePlayer() {
    //top
    if(keys[38] && player.y > 100){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    //left
    if(keys[37] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    //bottom
    if(keys[40] && player.y < canvas.height - player.height){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    //rigth
    if(keys[39] && player.x < canvas.width - player.width){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
}

function handlePlayerFrame() {
    if(player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
}


/*
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(background, 0, 0, canvas.width, canvas.height);

    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)

    movePlayer();
    handlePlayerFrame();
    
    requestAnimationFrame(animate);
}
animate();
*/


let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(background, 0, 0, canvas.width, canvas.height);

        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)

        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(60);