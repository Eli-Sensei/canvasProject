const canvas = document.querySelector("canvas") || document.createElement("canvas");
const c = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;


let Square = (nb) => nb * nb;
let Sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000))




function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
    };
}
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let mouse = {
    x: 0,
    y: 0
};
const inputs = {
    left: false,
    right: false,
    top: false,
    bottom: false,
    space: false,
};
function setListeners() {
    window.addEventListener("keydown", (e) => {
        if (e.key === "q") inputs.left = true;
        if (e.key === "d") inputs.right = true;
        if (e.key === "z") inputs.top = true;
        if (e.key === "s") inputs.bottom = true;
        if (e.key === " ") inputs.space = true;
        // setTimeout(()=>{ inputs.space = false;}, 10)
       
        // console.log(e.key);
    });
    window.addEventListener("keyup", (e) => {
        if (e.key === "q") inputs.left = false;
        if (e.key === "d") inputs.right = false;
        if (e.key === "z") inputs.top = false;
        if (e.key === "s") inputs.bottom = false;
        if (e.key === " ") inputs.space = false;
        // console.log(e.key);
    });
    window.addEventListener("mousemove", (e) => {
        mouse = getMousePos(canvas, e);
    });
}
setListeners();
class PVector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(PVector) {
        this.x = PVector.x;
        this.y = PVector.y;
    }
    add(PVector) {
        this.x += PVector.x;
        this.y += PVector.y;
    }
    sub(PVector) {
        this.x += -PVector.x;
        this.y += -PVector.y;
    }
    mult(number) {
        this.x *= number;
        this.y *= number;
    }
    div(number) {
        this.x /= number;
        this.y /= number;
    }
    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    normalize() {
        let m = this.mag();
        if (m != 0) {
            this.div(m);
        }
    }
    limit(max) {
        if (this.mag() > max) {
            // console.log('prout');
            this.normalize();
            this.mult(max);
        }
    }
    random2D() {
        this.set(new PVector(random(-800, canvas.width), random(-500, canvas.height)));
        this.normalize();
        // console.log(this.x, this.y);
        // setTimeout(console.clear, 1000)
        // console.log(this);
    }
    // STATIC METHOD
    static addi(v1, v2) {
        const v3 = new PVector(v1.x + v2.x, v1.y + v2.y);
        return v3;
    }
    static subi(v1, v2) {
        const v3 = new PVector(v1.x - v2.x, v1.y - v2.y);
        return v3;
    }
    static multi(v1, number) {
        const v3 = new PVector(v1.x * number, v1.y * number);
        return v3;
    }
    static divi(v1, number) {
        const v3 = new PVector(v1.x / number, v1.y / number);
        return v3;
    }
    static disti(v1, v2) {
        return Math.sqrt(Square(v2.x - v1.x) + Square(v2.y - v1.y));
    }
}
class Mover {
    constructor(id = null) {
        console.log('Constructeur mover');
        this.locat = new PVector(random(0, canvas.width), random(0, canvas.height));
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector();
        this.topSpeed = 5;
        this.dir = new PVector();
        this.mouse = new PVector();
        this.id = id;
    }
    update() {
        
        // INPUT CONTROL
        let randomDir = new PVector();
        randomDir.random2D();
        this.dir = PVector.subi(randomDir, this.locat);
        this.dir.normalize();
        this.dir.mult(0.02);
        this.acceleration = this.dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.locat.add(this.velocity);
        this.velocity = new PVector();
    }
    checkEdges() {
        if (this.locat.x > canvas.width) {
            this.locat.x = 0;
            // this.velocity.x = -this.velocity.x;
        }
        else if (this.locat.x < 0) {
            this.locat.x = canvas.width;
            // this.velocity.x = -this.velocity.x;
        }
        if (this.locat.y > canvas.height) {
            this.locat.y = 0;
            // this.velocity.y = -this.velocity.y;
        }
        else if (this.locat.y < 0) {
            this.locat.y = canvas.height;
            // this.velocity.y = -this.velocity.y;
        }
    }
    display() {
        if (!c)
            return;
        c.beginPath();
        c.arc(this.locat.x, this.locat.y, 10, 0, Math.PI * 2);
        c.lineWidth = 1;
        c.stroke();
        c.fillStyle = "green";
        c.fill();
    }
   
    lookAt(pos) {
        return PVector.subi(pos, this.locat);
    }
}
class Player extends Mover {
    constructor() {
        super();
        this.topSpeed = 10;
        this.speed = 0.5;
        this.isMoving = false;
        this.range = 100;
        this.canDash = true;
        this.isDashing = false;
        this.dashPower = 10;
        this.dashTime = 0.4;
        this.dashCooldown = 1;

    }

    async dash(){
        this.canDash = false;
        this.isDashing = true;

        this.acceleration.normalize();
        this.acceleration.mult(this.dashPower)

        await Sleep(this.dashTime)
        this.isDashing = false;
        await Sleep(this.dashCooldown)
        this.canDash = true;

    }

    move() {
        let randomDir = new PVector();
        randomDir.random2D();
        this.mouse.set(new PVector(mouse.x, mouse.y));
        // this.dir = PVector.subi(this.mouse, this.locat);
        // INPUT CONTROL
        let rotateSpeed = 10;
        if(!this.isDashing){

            if (inputs.left)   this.dir.add(new PVector(-rotateSpeed, 0));
            if (inputs.right)  this.dir.add(new PVector(rotateSpeed, 0));
            if (inputs.top)    this.dir.add(new PVector(0, -rotateSpeed));
            if (inputs.bottom) this.dir.add(new PVector(0, rotateSpeed));
            
           
            
            this.dir.normalize();
            
            this.acceleration = this.dir;
        }
        
        if (inputs.left || inputs.right || inputs.top || inputs.bottom) 
        this.isMoving = true;
        else
        this.isMoving = false;
        
        if(inputs.space && this.canDash)
            this.dash();
        
        this.velocity.add(this.acceleration);

        if(this.isDashing)
            this.velocity.limit(10);
        else
            this.velocity.limit(5)
        

        if (this.isMoving)
            this.locat.add(this.velocity);
        else
            this.velocity = new PVector();
        
    }
}
const player = new Player();


function draw() {

    player.move();
    player.display();
    mouseDisplay();
    // console.log(deltaTime)
}


let deltaTime = 0;
let currentTime = Date.now();
let lastTime = 0;
function animate() {
    requestAnimationFrame(animate);
    currentTime = Date.now();
    deltaTime = (currentTime - lastTime) / 1000
    lastTime = currentTime;

    if (!c) return;
    c.clearRect(0, 0, canvas.width, canvas.height);

    draw();
}
animate();


function line(startVector, endVector) {
    if (!c)
        return;
    c.beginPath();
    c.moveTo(startVector.x, startVector.y);
    c.lineTo(endVector.x, endVector.y);
    c.lineWidth = 5;
    c.fillStyle = "blue";
    c.stroke();
}
function mouseDisplay() {
    if (!c)
        return;
    c.beginPath();
    c.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
    c.lineWidth = 1;
    c.stroke();
    c.fillStyle = "blue";
    c.fill();
}