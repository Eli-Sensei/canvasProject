const canvas = document.querySelector("canvas");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// window resize

let c = canvas.getContext("2d");



let mouse = {
    x: undefined,
    y: undefined,
    isPressed: false
};






// function draw() {
    
//     // drawLine(mouse, 'red');
//     // console.log(mouse);


//     requestAnimationFrame(draw);
// }
// draw();

let paintController = {
    color: "blue",
    lineWidth: 1,
    begin: ()=>{
        c.beginPath();
        c.moveTo(mouse.x, mouse.y);
    },
    draw: ()=>{
        c.lineWidth = paintController.lineWidth;
        c.lineTo(mouse.x, mouse.y);
    },
    end: ()=>{
        c.strokeStyle = paintController.color;
        c.stroke();
    },
    clearAll: ()=>{
        c.clearRect(0, 0, canvas.width, canvas.height);
    }
}

window.addEventListener("mousedown", (e)=>{
    mouse.isPressed = true;
    paintController.begin();
});

window.addEventListener("mousemove", (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    
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

    let lineWidth = document.querySelector("#lineWidth");
    lineWidth.addEventListener("focusout", ()=>{
        paintController.lineWidth = parseInt(lineWidth.value);
        // console.log(lineWidth.value);
        
    });
    lineWidth.addEventListener("click", ()=>{
        paintController.lineWidth = parseInt(lineWidth.value);
        // console.log(lineWidth.value);
        
    });

    let trash = document.querySelector("[alt=Clear]");
    trash.addEventListener('click', ()=>{
        paintController.clearAll();
    });
}
initColors();