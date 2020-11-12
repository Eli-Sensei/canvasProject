let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

let c = canvas.getContext('2d');

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
});

const player = {
    x: 200,
    y: 200,
    width: 20,
    height: 20,
    radius: 15,
    color: "rgba(0,51,255,0.7)"
};

const circle = {
    x: 500,
    y: 200,
    radius: 70,
    color: "rgba(102,0,204,0.7)"
};

const circle2 = {
    x: 500,
    y: 200,
    radius: 50,
    goodColor: "rgba(51,255,102,0.7)",
    wrongColor: "rgba(255,153,0,0.7)"
};
const square = {
    x: 500,
    y: 400,
    width: 50,
    height: 50,
    goodColor: "rgba(51,255,102,0.7)",
    wrongColor: "rgba(255,153,0,0.7)"
};


const mouse = {
    x: undefined,
    y: undefined
};




canvas.addEventListener("mousemove", (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    

});
function playerMove(squareOrCircle) {
    if (squareOrCircle === "circle") {
        player.x = mouse.x + player.radius;
        player.y = mouse.y + player.radius;

        c.beginPath();
        c.arc(player.x, player.y, player.radius, 0, Math.PI * 2, false);
        c.fillStyle = player.color;
        c.fill();
        c.strokeStyle = "transparent";
        c.stroke();
    }else if(squareOrCircle === "square"){
        player.x = mouse.x;
        player.y = mouse.y;

        c.fillStyle = player.color;
        c.fillRect(player.x, player.y, player.width, player.height);
    }else{
        console.warn('Player Has No Parameter');
    }
}

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
function isSquareIntoSquare(sx1, sy1, sw1, sh1, sx2, sy2, sw2, sh2) {

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

    c.beginPath();
    c.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    c.fillStyle = circle.color;
    c.fill();
    c.stroke();

    

    playerMove("circle");
    circle2Move();

    if (isCircleIntoCircle(player.x, player.y, circle.x, circle.y, player.radius, circle.radius)) {
        canvas.style.backgroundColor = "orange";
    }else{
        canvas.style.backgroundColor = "rgb(132, 167, 231)";
    }

    if (isCircleIntoSquare(player.x, player.y, player.radius, square.x, square.y, square.width, square.height)) {
        c.fillStyle = square.wrongColor;
    }else{
        c.fillStyle = square.goodColor;
    }
    
    c.fillRect(square.x, square.y, square.width, square.height);

    requestAnimationFrame(update);
}
update();


