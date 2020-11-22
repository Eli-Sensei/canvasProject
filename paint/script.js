const canvas = document.querySelector("canvas");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// window resize

let c = canvas.getContext("2d");



let mouse = {
    pos: {x: undefined, y:undefined},
    isPressed: false
};

function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    
    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}





// function draw() {
    
    //     // drawLine(mouse, 'red');
    //     // console.log(mouse);
    
    
    //     requestAnimationFrame(draw);
    // }
    // draw();
    
    let lineWidth = document.querySelector("#lineWidth");
    let lineWidthInfo = document.querySelector("#lineWidthInfo");
    let paintController = {
        color: "blue",
        lineWidth: lineWidth.value,
        begin: ()=>{
            c.beginPath();
            c.moveTo(mouse.pos.x, mouse.pos.y);
        },
        draw: ()=>{
            c.lineWidth = paintController.lineWidth;
            c.lineTo(mouse.pos.x, mouse.pos.y);
        },
        end: ()=>{
            c.strokeStyle = paintController.color;
            c.stroke();
        },
        clearAll: ()=>{
            c.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    lineWidthInfo.textContent = `${paintController.lineWidth}px`;
    
window.addEventListener("mousedown", (e)=>{
    mouse.isPressed = true;
    paintController.begin();
});

window.addEventListener("mousemove", (e)=>{
    mouse.pos = getMousePos(canvas, e);
    
    if (mouse.isPressed) {
        paintController.draw();
    }
    paintController.end();
    // console.log(mouse);
});

window.addEventListener("mouseup", (e)=>{
    mouse.isPressed = false;
});


function initColors() {
    let colorsBox = document.querySelectorAll(".colorBox");
    for (let ele of colorsBox) {
        ele.style.backgroundColor = ele.attributes.value.value;
        ele.addEventListener('click', ()=>{
            // console.log(ele.attributes.value.value);
            paintController.color = ele.attributes.value.value;
        });
    }
    lineWidth.addEventListener("click", ()=>{
        paintController.lineWidth = parseInt(lineWidth.value);
        lineWidthInfo.textContent = `${paintController.lineWidth}px`;
        // console.log(lineWidth.value);
        
    });

    let trash = document.querySelector("[alt=Clear]");
    trash.addEventListener('click', ()=>{
        paintController.clearAll();
    });
}
initColors();