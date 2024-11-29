let map = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
]



// droite
if(cosX >= 0) roundX = "ceil"
// gauche
else if(cosX <= 1) roundX = "floor"
else console.log("no X")
// bas
if(sinY >= 0) roundY = "ceil"
// haut
else if(sinY <= 1) roundX = "floor"
else console.log("no Y")



if(map[exeFuncByName(roundY, Math, player.y)]
    [exeFuncByName(roundX, Math, tempX)] == 0)
    player.x = exeFuncByName(roundX, Math, tempX)
if(map[exeFuncByName(roundY, Math, tempY)]
[exeFuncByName(roundX, Math, player.x)] == 0)
    player.y = exeFuncByName(roundY, Math, tempY)
console.log(exeFuncByName(roundX, Math, tempX), exeFuncByName(roundY, Math, tempY))


function drawTile(coor, color, size = 70){
    if (!c) return;
    c.fillStyle = colors[color];
    c.fillRect(coor.x * size, coor.y * size, size, size);
}