const canvas = document.querySelector("canvas") || document.createElement("canvas");
const c = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

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
function Square (nb) {
    return nb * nb;
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

let mouse = {
    x: 0,
    y: 0
};

function setListeners() {
    /*
    window.addEventListener("keydown", (e) => {
        if (e.key === "q")
            inputs.left = true;
        if (e.key === "d")
            inputs.right = true;
        if (e.key === "z")
            inputs.top = true;
        if (e.key === "s")
            inputs.bottom = true;
        console.log(e.key);
    });
    window.addEventListener("keyup", (e) => {
        if (e.key === "q")
            inputs.left = false;
        if (e.key === "d")
            inputs.right = false;
        if (e.key === "z")
            inputs.top = false;
        if (e.key === "s")
            inputs.bottom = false;
        // console.log(e.key);
    });
    */
    window.addEventListener("mousemove", (e) => {
        mouse = getMousePos(canvas, e);
    });
}
setListeners();

function point(x, y, color = "green", weight = 10) {
    c.beginPath();
    c.arc(x, y, weight, 0, Math.PI * 2);
    c.lineWidth = 0;
    c.stroke();
    c.fillStyle = color;
    c.fill();
}

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
            this.normalize();
            this.mult(max);
        }
    }
    random2D() {
        this.set(new PVector(random(0, canvas.width), random(0, canvas.height)));
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
    static randomVector(){
        const v3 = new PVector(random(-canvas.width, canvas.width), random(-canvas.height, canvas.height));
        return v3;
    }
}
class Boid {
    constructor() {
        console.log('New Boid');
        this.pos = new PVector(canvas.width / 2, canvas.height / 2);
        this.pos.random2D();
        this.vel = PVector.randomVector();
        this.acc = new PVector();
        this.maxForce = 0.1;
        this.maxSpeed = 1;
        this.color = "white";
    }

    edges(){
        if(this.pos.x > canvas.width) this.pos.x = 0
        else if(this.pos.x < 0) this.pos.x = canvas.width;
        if(this.pos.y > canvas.height) this.pos.y = 0
        else if(this.pos.y < 0) this.pos.y = canvas.height;
    }

    align(boids){
        let perceptionRadius = 100;
        let steering = new PVector();
        let total = 0;

        for (const other of boids) {
            let d = PVector.disti(this.pos, other.pos);
            if(other != this && d < perceptionRadius){
                steering.add(other.vel)
                total++;
            }
        }

        if(total > 0) {
            steering.div(total);
            steering.mult(this.maxSpeed)
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    seperation(boids){
        let perceptionRadius = 20;
        let steering = new PVector();
        let total = 0;

        for (const other of boids) {
            let d = PVector.disti(this.pos, other.pos);
            if(other != this && d < perceptionRadius){
                let diff = PVector.subi(this.pos, other.pos)
                diff.div(d);
                steering.add(diff)
                total++;
            }
        }

        if(total > 0) {
            steering.div(total);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids){
        let perceptionRadius = 50;
        let steering = new PVector();
        let total = 0;

        for (const other of boids) {
            let d = PVector.disti(this.pos, other.pos);
            if(other != this && d < perceptionRadius){
                steering.add(other.pos)
                total++;
            }
        }

        if(total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids){
        this.maxForce = forceSlider.value / 10;
        this.maxSpeed = speedSlider.value / 10;

        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);

        alignment.mult(alignmentSlider.value/10)
        cohesion.mult(cohesionSlider.value/10)
        seperation.mult(separationSlider.value/10)

        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(seperation);

    }

    update(){
        this.vel.normalize();
        this.vel.mult(10);
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        // this.acc.set(new PVector());
        this.acc.mult(0)
        this.changeColor();
    }

    show(){
        point(this.pos.x, this.pos.y, this.color, 3);
    }

    changeColor(){
        let colors = ["black", "blue", "green", "yellow", "pink"];
        let d = PVector.disti(this.pos, mouse);
        if(d < 50) this.color = colors[random(0, colors.length)];
        else this.color = "white"
    }
}





