let Square = (nb) => nb * nb;

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


function drawLine(startVector, endVector) {
    if (!c)
        return;
    c.beginPath();
    c.moveTo(startVector.x, startVector.y);
    c.lineTo(endVector.x, endVector.y);
    c.lineWidth = 5;
    c.strokeStyle = "blue";
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