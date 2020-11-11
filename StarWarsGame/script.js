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

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(background, 0, 0, canvas.width, canvas.height);

    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)

    movePlayer();
    
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('keydown', (key)=>{
    keys[key.keyCode] = true;
});
window.addEventListener('keyup', (key)=>{
    delete keys[key.keyCode];
});

function movePlayer() {
    //top
    if(keys[38] && player.y > 100){
        player.y -= player.speed;
        player.frameY = 3;
    }
    //left
    if(keys[37] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
    }
    //bottom
    if(keys[40] && player.y < canvas.height - player.height){
        player.y += player.speed;
        player.frameY = 0;
    }
    //rigth
    if(keys[39] && player.x < canvas.width - player.width){
        player.x += player.speed;
        player.frameY = 2;
    }
}