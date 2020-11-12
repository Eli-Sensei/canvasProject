let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

let c = canvas.getContext('2d');

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
});

const score = {
    player: 0,
    IA: 0
};

const ball = {
    x: 200,
    y: 200,
    width: 10,
    height: 10,
    radius: 15,
    velX: 3,
    velY: 3,
    color: "white"
};

const leftBar = {
    x: 20,
    y: 250,
    width: 10,
    height: 100,
    color: "white"
};

const rightBar = {
    x: innerWidth - 40,
    y: 250,
    width: 10,
    height: 100,
    color: "white"
};

const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("mousemove", (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});


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


function drawPrefab(prefab) {
    c.fillStyle = prefab.color;
    c.fillRect(prefab.x, prefab.y, prefab.width, prefab.height);
}

function allPrefabsMove() {
    // Ball movement
    if(isSquareIntoSquare(ball, rightBar) || isSquareIntoSquare(ball, leftBar) ||ball.x < 0){
        ball.velX = -ball.velX;
    }
    if(ball.y + ball.height > canvas.height || ball.y < 0){
        ball.velY = -ball.velY;
    }
    ball.x += ball.velX;
    ball.y += ball.velY;
    drawPrefab(ball);
    

    //right bar movement
    rightBar.y = ball.y - (rightBar.height / 2) + (ball.height / 2);
    if (rightBar.y <= 10) {
        rightBar.y = 10; 
    }else if(rightBar.y + rightBar.height > canvas.height - 10){
        rightBar.y = canvas.height - 10 - rightBar.height;
    }
    drawPrefab(rightBar);

    //left bar movement
    if(mouse.y > 10 && mouse.y < canvas.height - 10){
        leftBar.y = mouse.y - (leftBar.height / 2);
        if (leftBar.y <= 10) {
            leftBar.y = 10; 
        }else if(leftBar.y + leftBar.height > canvas.height - 10){
            leftBar.y = canvas.height - 10 - leftBar.height;
        }
    }
    drawPrefab(leftBar);


}

let xVel = 3;
function circle2Move() {
    if(circle2.x + circle2.radius > canvas.width || circle2.x - circle2.radius < 0){
        xVel = -xVel;
    }
    circle2.x += xVel;
    if (isCircleIntoCircle(circle2.x, circle2.y, circle.x, circle.y, circle2.radius, circle.radius)) {
        c.fillStyle = circle2.wrongColor;
    }else{

        c.fillStyle = circle2.goodColor;
    }

    c.beginPath();
    c.arc(circle2.x, circle2.y, circle2.radius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
}




function update() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    
    allPrefabsMove();

    requestAnimationFrame(update);
}
update();


