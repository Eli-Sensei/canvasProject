const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;



function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    
    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

let mouse = {
    x: undefined, 
    y:undefined
};


function setListeners() {
    window.addEventListener("keydown", (e)=>{
        if(e.key === "ArrowLeft"){
            inputs.left = true;
        }
        if(e.key === "ArrowRight"){
            inputs.right = true;
        }
        if(e.key === "ArrowUp"){
            inputs.top = true;
        }
        if(e.key === "ArrowDown"){
            inputs.bottom = true;
        }
        console.log(e.key);
    });
    window.addEventListener("keyup", (e)=>{
        if(e.key === "ArrowLeft"){
            inputs.left = false;
        }
        if(e.key === "ArrowRight"){
            inputs.right = false;
        }
        if(e.key === "ArrowUp"){
            inputs.top = false;
        }
        if(e.key === "ArrowDown"){
            inputs.bottom = false;
        }
        // console.log(e.key);
    });
    window.addEventListener("mousemove", (e)=>{
        mouse = getMousePos(canvas, e);
    });
}
setListeners();

class PVector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set (PVector) {
        this.x = PVector.x;
        this.y = PVector.y;
    }

    add (PVector) {
        this.x += PVector.x;
        this.y += PVector.y;
    }

    sub (PVector) {
        this.x += -PVector.x;
        this.y += -PVector.y;
    }

    mult (number) {
        this.x *= number;
        this.y *= number;
    }

    div (number) {
        this.x /= number;
        this.y /= number;
    }

    mag (){
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    normalize (){
        let m = this.mag();
        if (m != 0) {
            this.div(m);
        }
    }

    limit (max){
        if (this.mag() > max) {
            // console.log('prout');
            this.normalize();
            this.mult(max);
        }
    }

    random2D(){
        this.set({x: random(-800, canvas.width), y: random(-500, canvas.height)});
        this.normalize();
        // console.log(this.x, this.y);
        // setTimeout(console.clear, 1000)
        
        // console.log(this);
        
    }



    // STATIC METHOD
    static addi(v1, v2){
        const v3 = new PVector(v1.x + v2.x, v1.y + v2.y);
        return v3;
    }

    static subi(v1, v2){
        const v3 = new PVector(v1.x - v2.x, v1.y - v2.y);
        return v3;
    }

    static multi(v1, number){
        const v3 = new PVector(v1.x * number, v1.y * number);
        return v3;
    }
    
    static divi(v1, number){
        const v3 = new PVector(v1.x / number, v1.y / number);
        return v3;
    }

}


class Mover {
    constructor(){
        console.log('Constructeur mover');
        this.locat = new PVector(random(0, canvas.width), random(0, canvas.height));
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector();

        this.topSpeed = 20;
        
    }

    update (){
        // INPUT CONTROL
        // if (inputs.left) {
        //     this.velocity.add({x: -this.acceleration.x, y: 0});
        //     console.log(this.acceleration.x, -this.acceleration.x);
        // }
        // if (inputs.right) {
        //     this.velocity.add({x: this.acceleration.x, y: 0});
        // }
        // if (inputs.top) {
        //     this.velocity.add({x: 0, y: -this.acceleration.y});
        //     console.log(this.acceleration.x, -this.acceleration.x);
        // }
        // if (inputs.bottom) {
        //     this.velocity.add({x: 0, y: this.acceleration.y});
        // }

        this.mouse = new PVector(mouse.x, mouse.y);
        // console.log(this.mouse);
        this.dir = PVector.subi(this.mouse, this.locat);

        this.dir.normalize();
        this.dir.mult(0.1);

        this.acceleration = this.dir;

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.locat.add(this.velocity);
    }

    checkEdges() {
 
        if (this.locat.x > canvas.width) {
            this.locat.x = 0;
        } else if (this.locat.x < 0) {
            this.locat.x = canvas.width;
        }
        
        if (this.locat.y > canvas.height) {
            this.locat.y = 0;
        } else if (this.locat.y < 0) {
            this.locat.y = canvas.height;
        }
         
    }

    display () {
        c.beginPath();
        c.arc(this.locat.x, this.locat.y, 20, 0, Math.PI * 2);
        c.lineWidth = 1;
        c.stroke();
        c.fillStyle = "green";
        c.fill();
    }
}



let circleArray = [];
function init() {
    circleArray = [];
    for (let i = 0; i < 700; i++) {

        let circle = new Mover();
    
        circleArray.push(circle);
    
        
    }    
}
init();

const v = new PVector(3, 3);
v.normalize();
v.mult(1.5);

const u = PVector.multi(v, 2);

const w = PVector.subi(v, u);
w.div(3);

const center = new PVector(canvas.width / 2, canvas.height / 2);


const mover = new Mover();
const inputs = {
    left: false,
    right: false,
    top: false,
    bottom: false,
};



function draw() {
    

    for (let mover of circleArray) {
        mover.update();
        mover.checkEdges();
        mover.display();
    }
    // mover.update();
    // mover.checkEdges();
    // mover.display();

    
// line(center, v);
// line(center, u);
// line(center, w);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    draw();
    // console.log(inputs);
}


animate();















// let mouse = {
//     pos: {x: undefined, y:undefined},
// };
// window.addEventListener("mousemove", (e)=>{
//     mouse.pos = getMousePos(canvas, e);
// });


// const mousePos = new PVector();
// // // let betMC = new PVector();
// // const locat = new PVector(100, 100);
// // // const locat2 = new PVector(150, 100);
// // const velocity = new PVector(1, 3.3);

function line(startVector, endVector) {
    c.beginPath();
    c.moveTo(startVector.x, startVector.y);
    c.lineTo(endVector.x, endVector.y);
    c.lineWidth = 5;
    c.fillStyle = "blue";
    c.stroke();
}

// function mouseDisplay() {
//     c.beginPath();
//     c.arc(mousePos.x, mousePos.y, 10, 0, Math.PI * 2);
//     c.lineWidth = 1;
//     c.stroke();
//     c.fillStyle = "blue";
//     c.fill();
// }


