const flock = [];
let alignmentSlider = document.getElementById("alignment");
let cohesionSlider = document.getElementById("cohesion");
let separationSlider = document.getElementById("separation");
let speedSlider = document.getElementById("speed");
let forceSlider = document.getElementById("force");


function setup() {
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}
setup();

function update() {
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock)
        boid.update()
    }
}

function render() {
    for (let boid of flock) {
        boid.changeColor();
        boid.show()
    }
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    

    mouseDisplay();
    
    update();
    render();

    requestAnimationFrame(draw);
}
draw();