// console.warn('Be carful, it\'s the beginning of the script');

let canvas = document.querySelector('canvas');
console.log(canvas);

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;



let c = canvas.getContext('2d');

/*
c.fillStyle = "blue";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "green";
c.fillRect(240, 310, 90, 90);
c.fillStyle = "purple";
c.fillRect(400, 100, 100, 100);

// Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.lineTo(60, 300);
c.strokeStyle = "red";
c.stroke();

// arc / circle

c.beginPath();
c.arc(250, 250, 30, 0, Math.PI * 2, false);
c.strokeStyle = "seashell"
c.stroke();

for (let i = 0; i < 20; i++) {
    
    //console.log(x,y);

    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = RandomColor();
    c.stroke();
}

*/
/*
class Circle2{
    constructor(x, y, dx, dy, radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = 'blue';
            c.stroke();
        }
    
        this.update = function () {
            if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
                this.dx = -this.dx;
            }
            if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
    
            this.draw();
        }
    }
}
*/

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse)
});



function Circle(x, y, dx, dy, radius, strokeColor, fillColor, maxRadius, minRadius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;

    let originalRadius = this.radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = strokeColor;
        c.stroke();
        //c.fillStyle = fillColor;
        c.fill();
    }

    this.update = function () {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interectavity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < this.maxRadius) {
                this.radius += 1;
            }
        }else{
            if (this.radius > minRadius /*originalRadius**/) {
                this.radius -= 1;
            }
        }

        this.draw();
    }
}


let circleArray = [];

for (let i = 0; i < 100; i++) {

    let radius = Math.floor(Math.random() * (35 - 20) + 20);
    let maxRadius = Math.floor(Math.random() * (60 - 40) + 40);
    let minRadius = Math.floor(Math.random() * (10 - 4) + 4);
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    let strokeColor = RandomColor();
    let fillColor = RandomColor();
    let circle = new Circle(x, y, dx, dy, radius, strokeColor, fillColor, maxRadius, minRadius);
    //console.log(circle);

    circleArray.push(circle);

    
}

//console.log(circleArray);




function Animate() {
    requestAnimationFrame(Animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    
    for (let circle of circleArray) {
        circle.update();
    }
    
    
}
Animate();


function RandomColor(){
    var c1 = Math.floor(Math.random() * 255);
    var c2 = Math.floor(Math.random() * 255);
    var c3 = Math.floor(Math.random() * 255);
    var c4 = Math.random() * 1000;
    c4 = Math.trunc(c4) / 1000;
    
    return "rgba(" + c1 +", " + c2 +", " + c3 +", " + c4 + ")";
}