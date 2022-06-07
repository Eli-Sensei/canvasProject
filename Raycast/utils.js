let Square = (nb) => nb * nb;

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
    let colors = ["gray", "black", "red", "darkgray"]

    

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
    c.fillStyle = color;
    c.fill();
}

function drawSquare(x, y, size, color) {
    
    c.fillStyle = color;
    c.fillRect(x, y, size, size);
}

function getLineAngle(u, v) {

    let rU = Math.sqrt(u.x*u.x + u.y*u.y);
    let rV = Math.sqrt(v.x*v.x + v.y*v.y);
    
    let rUV = u.x*v.x + u.y*v.y;

    let cosUV = rUV / (rU*rV)

    return cosUV;
}