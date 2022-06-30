let Square = (nb) => nb * nb;
let colors = ["gray", "black", "red", "blue", "green"]
function exeFuncByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
    return {
        x: parseFloat(((evt.clientX - rect.left) * scaleX).toFixed(2)),
        y: parseFloat(((evt.clientY - rect.top) * scaleY).toFixed(2)) // been adjusted to be relative to element
    };
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function drawLine(startVector, endVector, color = 0) {
    if (!c) return;

    c.beginPath();
    c.moveTo(startVector.x, startVector.y);
    c.lineTo(endVector.x, endVector.y);
    c.lineWidth = 1;
    c.strokeStyle = colors[color];
    c.stroke();
}

function drawPoint(x, y, color, weight) {
    c.beginPath();
    c.arc(x, y, weight, 0, Math.PI * 2);
    c.lineWidth = 0;
    c.stroke();
    c.fillStyle = colors[color];
    c.fill();
}

function drawRect(x, y, w, h, color) {
    
    c.fillStyle = colors[color];
    c.fillRect(x, y, w, h);
}

function getLineAngle(u, v) {

    let rU = Math.sqrt(u.x*u.x + u.y*u.y);
    let rV = Math.sqrt(v.x*v.x + v.y*v.y);
    
    let rUV = u.x*v.x + u.y*v.y;

    let cosUV = rUV / (rU*rV)

    return cosUV;
}

function isSquareIntoSquare(sq1, sq2) {
    
    if (sq1.x < sq2.x + sq2.w &&
        sq1.x + sq1.w > sq2.x &&
        sq1.y < sq2.y + sq2.h &&
        sq1.y + sq1.h > sq2.y) {
         // collision detected!
         
         return true;
     }

    return false;
}

function isPointIntoSquare(point, sq) {

    if(point.x >= sq.x && 
        point.x <= sq.x + sq.w &&
        point.y >= sq.y &&
        point.y <= sq.y + sq.h
    ){
        return true;
    }
    return false;
}