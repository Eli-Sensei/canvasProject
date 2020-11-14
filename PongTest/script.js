let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 10;
canvas.height = canvas.width / 3 * 2;

let c = canvas.getContext('2d');

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = canvas.width / 3 * 2;
    
});

///////////// PREFABS /////////////////////////
let score = {
    player: 0,
    bot: 0,
    addScore: (who)=>{
        if(who === "player") score.player += 1;
        if(who === "bot") score.bot += 1;
        console.log("added 1 to " + who);
    }
};

let ballDirection = [-10, 10];
let ball = {
    x: 200,
    y: 200,
    width: 10,
    height: 10,
    radius: 15,
    velX: ballDirection[Math.floor(Math.random() * 2)],
    velY: Math.random() * (180 + 180) - 180,
    color: "white"
};
ball.velY = Math.floor(ball.velY / 10);
// console.log(ball.velY);

let ballCache = {
    originalVelX: ball.velX,
    originalVelY: ball.velY
}

// console.log(ball);

let leftBar = {
    x: 20,
    y: 250,
    width: 10,
    height: 100,
    color: "white"
};

let rightBar = {
    x: innerWidth - 40,
    y: 250,
    width: 10,
    height: 100,
    speed: ball.velY,
    color: "white"
};
if (rightBar.speed < 0) {
    rightBar.speed = -rightBar.speed;
}

let borderMap = {
    size: 5
};
borderMap = {
    wallLeft: {
        x: 0,
        y: 50,
        width: borderMap.size,
        height: canvas.height - 50,
        color: "transparent"
    },
    wallRight: {
        x: canvas.width - borderMap.size,
        y: 50,
        width: borderMap.size,
        height: canvas.height - 50,
        color: "transparent"
    },
    wallTop: {
        x: 0,
        y: 50,
        width: canvas.width,
        height: borderMap.size,
        color: "white"
    },
    wallBottom: {
        width: canvas.width,
        height: borderMap.size,
        x: 0,
        y: canvas.height - borderMap.size,
        color: "white"
    }
};



const mouse = {
    x: undefined,
    y: undefined
};

const game = {
    stopBall: ()=>{
        ball.velX = 0;
        ball.velY = 0;
    },
    replaceBallAndBarAtCenter: ()=>{
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        rightBar.y = ball.y - (rightBar.height / 2) + (ball.height / 2);
    },
    startBall: ()=>{
        ball.velX = ballDirection[Math.floor(Math.random() * 2)];
        ball.velY = ballCache.originalVelY;
    },
    gameInit: ()=>{
        game.stopBall();
        game.replaceBallAndBarAtCenter();
        setTimeout(game.startBall, 3000);
    },
    gameScoreUpdate: ()=>{
        c.font = "30px Verdana";
        c.fillText(`${score.player}`, canvas.width / 2 - 25, 35);
        c.fillText(`${score.bot}`, canvas.width / 2 + 25, 35);
        c.font = "40px Verdana";
        c.fillText(`-`, canvas.width / 2 , 35);
    },
    resetGame: async ()=>{
        score.player = 0;
        score.bot = 0;
        game.gameInit();
    }

}
window.addEventListener("mousemove", (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});


/////////////////// FUNCTIONS ///////////////////

// POINT / POINT
function isColliding(x1, y1, x2, y2) {
    if(x1 == x2 && y1 == y2){
        return true;
    }
    return false;
}

// POINT / CIRCLE
function isInto(px, py, cx, cy, r) {
    let distX = px - cx;
    let distY = py - cy;
    let distance = Math.sqrt((distX*distX) + (distY*distY));

    if(distance <= r){
        return true;
    }
    return false;
}

// CIRCLE / CIRCLE
function isCircleIntoCircle(px, py, cx, cy, pr, cr) {
    let distX = px - cx;
    let distY = py - cy;
    let distance = Math.sqrt((distX*distX) + (distY*distY));

    if(distance <= pr + cr){
        return true;
    }
    return false;
}

// POINT / SQUARE
function isPointIntoSquare(px, py, sx, sy, sw, sh) {

    if(px >= sx && px <= sx + sw && py >= sy && py <= sy + sh){
        return true;
    }
    return false;
}

// SQUARE / SQUARE
function isSquareIntoSquare(square1, square2) {
    let sx1 = square1.x;
    let sy1 = square1.y;
    let sw1 = square1.width;
    let sh1 = square1.height;

    let sx2 = square2.x;
    let sy2 = square2.y;
    let sw2 = square2.width;
    let sh2 = square2.height;

    if(sx1 + sw1 >= sx2 
        && sx1 <= sx2 + sw2 
        && sy1 + sh1 >= sy2 
        && sy1 <= sy2 + sh2
        ){
        return true;
    }
    return false;
}


// CIRCLE / SQUARE

function isCircleIntoSquare(cx, cy, radius, rx, ry, rw, rh) {
    let testX = cx;
    let testY = cy;

    if(cx < rx) testX = rx;
    else if(cx > rx + rw) testX = rx+rw;
    if(cy < ry) testY = ry;
    else if(cy > ry+rh) testY = ry+rh;

    let distX = cx-testX;
    let distY = cy-testY;
    distance = Math.sqrt( (distX*distX) + (distY*distY));

    if (distance <= radius) {
       return true; 
    }
    return false;
}

function displayWinner() {
    if(score.player > score.bot){
        c.font = "30px Verdana";
        c.fillText(`Winner`, 25, 32);
    }else {
        c.font = "30px Verdana";
        c.fillText(`Winner`, canvas.width - 120, 32);
    }
}

function drawPrefab(prefab) {
    c.fillStyle = prefab.color;
    c.fillRect(prefab.x, prefab.y, prefab.width, prefab.height);
}


function ballMovement() {

    function replaceBall() {
        game.stopBall();
        game.replaceBallAndBarAtCenter();
        setTimeout(game.startBall, 3000);
    }

    // Ball movement
    if(isSquareIntoSquare(ball, borderMap.wallRight)){
        replaceBall();
        setTimeout(score.addScore("player"), 200);
        
    }else if(isSquareIntoSquare(ball, borderMap.wallLeft)){
        replaceBall();
        setTimeout(()=>{score.addScore("bot")}, 200);
    }
    
    if(isSquareIntoSquare(ball, rightBar) || isSquareIntoSquare(ball, leftBar)){
        ball.velX = -ball.velX;
    }
    if(isSquareIntoSquare(ball, borderMap.wallTop) || isSquareIntoSquare(ball, borderMap.wallBottom)){
        ball.velY = -ball.velY;
    }
    ball.x += ball.velX;
    ball.y += ball.velY;
    
    

    drawPrefab(ball);
}

function allPrefabsMovement() {
    
    ballMovement();
    
    //right bar movement
    // Above or BElow the ball
    if(rightBar.y + rightBar.height / 2 > ball.y + ball.height / 2){
        rightBar.y += -rightBar.speed;
    }else if(rightBar.y + rightBar.height / 2 < ball.y + ball.height / 2){
        rightBar.y += rightBar.speed;
    }

    // Touch bottom or top wall 
    if (rightBar.y <= borderMap.wallTop.y + borderMap.wallTop.height + 10) {
        rightBar.y = borderMap.wallTop.y + borderMap.wallTop.height + 10; 
    }else if(rightBar.y + rightBar.height > canvas.height - 10){
        rightBar.y = canvas.height - 10 - rightBar.height;
    }
    drawPrefab(rightBar);
    
    //left bar movement
    if(mouse.y > 10 && mouse.y < canvas.height - 10){
        leftBar.y = mouse.y - (leftBar.height / 2);
        if (leftBar.y <= borderMap.wallTop.y + borderMap.wallTop.height + 10) {
            leftBar.y = borderMap.wallTop.y + borderMap.wallTop.height + 10; 
        }else if(leftBar.y + leftBar.height >= borderMap.wallBottom.y - 10){
            leftBar.y = borderMap.wallBottom.y - 10 - leftBar.height;
        }
    }
    drawPrefab(leftBar);
    
    
}






game.gameInit();
function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawPrefab(borderMap.wallLeft);
    drawPrefab(borderMap.wallRight);
    drawPrefab(borderMap.wallTop);
    drawPrefab(borderMap.wallBottom);
    
    allPrefabsMovement();
    game.gameScoreUpdate();

    if(score.player >= 6 || score.bot >= 6) {
        displayWinner();
        setTimeout(game.resetGame, 2000);
    }
    requestAnimationFrame(update);
}
update();





