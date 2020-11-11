let canvas = document.querySelector('canvas');
console.log(canvas);

canvas.width = 800;
canvas.height = 600;



let c = canvas.getContext('2d');

// Coeur 
function drawHeart(x, y) {
    
    c.beginPath();
    c.moveTo(40 + x, 50 + y);
    c.lineTo(20 + x, 30 + y);
    c.moveTo(40 + x, 50 + y);
    c.lineTo(60 + x, 30 + y);
    c.lineTo(20 + x, 30 + y);
    c.strokeStyle = '#4d0000';
    c.stroke();
    c.fillStyle = "#4d0000";
    c.fill();
    
    c.beginPath();
    c.arc(30 + x, 30 + y, 10, Math.PI, false);
    c.arc(50 + x, 30 + y, 10, Math.PI, false);
    c.lineTo(30 + x, 30 + y);
    c.strokeStyle = "#4d0000";
    c.stroke();
    c.fillStyle = "#4d0000";
    c.fill();
}

class Heart {
    constructor(x, y, velX, velY, sizeX, sizeY){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.drawHeart = () => {
            c.beginPath();
            c.moveTo(this.x, this.y);
            c.lineTo(this.sizeX, this.sizeY);
            c.moveTo(this.sizeX, this.sizeY);
            c.lineTo(this.sizeX, this.sizeY);
            c.lineTo(this.sizeX, this.sizeY);
            c.strokeStyle = '#4d0000';
            c.stroke();
            c.fillStyle = "#4d0000";
            c.fill();
            
            c.beginPath();
            c.arc(this.sizeX, this.sizeY, this.sizeX / 2, Math.PI, false);
            c.arc(this.sizeX, this.sizeY, this.sizeX / 2, Math.PI, false);
            c.lineTo(this.x, this.y);
            c.strokeStyle = "#4d0000";
            c.stroke();
            c.fillStyle = "#4d0000";
            c.fill();
        }

        this.drawHeart();
    }
}



let x = 0;
let y = 0;
let velocityX = 10;
let velocityY = 10;

let heart = new Heart(x, y, velocityX, velocityY, 20, 50);
heart.drawHeart();

/*
function Animate() {
    requestAnimationFrame(Animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    
    drawHeart(x, y);
    if (x + 60 > canvas.width || x + 10 < 0) {
        velocityX = -velocityX;
    }
    if (y + 60> canvas.height || y + 10 < 0) {
        velocityY = -velocityY;
    }
    x += velocityX;
    y += velocityY;
}
Animate();


/*
for (let between = 0; between < canvas.width; between += 50) {
    c.fillRect(between)
}
*/