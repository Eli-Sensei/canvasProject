let canvas = document.querySelector('canvas');

canvas.width = 500;
canvas.height = 800;

let c = canvas.getContext('2d');

//////////////// PREFABS ///////////////
let stat = {
    score: 0,
    life: 3,
    addNumber: (which, num)=>{
        if(which  === 'score') stat.score += num;
        if(which  === 'life') stat.life += num;
        console.log(`add ${num} to ${which}`);
    }
}

let player = {
    x: canvas.width / 2 - 10,
    y: canvas.height - 40,
    width: 20,
    height: 20,
    color: "blue",
    type: "rect",
    canMove: false,
}

let borderMap = {
    size: 5
};
borderMap = {
    wallLeft: {
        x: 0,
        y: 0,
        width: borderMap.size,
        height: canvas.height,
        color: "white",
        type: 'rect'
    },
    wallRight: {
        x: canvas.width - borderMap.size,
        y: 0,
        width: borderMap.size,
        height: canvas.height,
        color: "white",
        type: 'rect'
    },
    wallTop: {
        x: 0,
        y: 0,
        width: canvas.width,
        height: borderMap.size,
        color: "white",
        type: 'rect'
    },
    wallBottom: {
        width: canvas.width,
        height: borderMap.size,
        x: 0,
        y: canvas.height - borderMap.size,
        color: "white",
        type: 'rect'
    },
    statWall: {
        x: 0,
        y: 50,
        width: canvas.width,
        height: borderMap.size,
        color: "white",
        type: 'rect'
    },
    endWall: {
        width: canvas.width,
        height: borderMap.size,
        x: 0,
        y: canvas.height - borderMap.size - 60,
        color: "white",
        type: 'rect'
    }
};




////////////////////////         FUNCTION        ///////////

function drawPrefab(prefab) {
    c.fillStyle = prefab.color;
    c.fillRect(prefab.x, prefab.y, prefab.width, prefab.height);

    if(prefab.type === "rect"){
        c.fillStyle = prefab.color;
        c.fillRect(prefab.x, prefab.y, prefab.width, prefab.height);
    }else if (prefab.type === "circle"){

    }
}

function drawWall() {
    drawPrefab(borderMap.wallTop);
    drawPrefab(borderMap.wallRight);
    drawPrefab(borderMap.wallLeft);
    drawPrefab(borderMap.wallBottom);
    drawPrefab(borderMap.statWall);
    drawPrefab(borderMap.endWall);
}

function drawStat() {
    c.font = "20px Verdana"
    c.fillStyle = "orange";
    c.fillText(`Score: ${stat.score}`, 12, 35);

    c.fillStyle = "red";
    c.fillText(`Life: ${stat.life}`, canvas.width - 80, 35);
}

function playerScript() {
    
    drawPrefab(player);
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    drawWall();
    drawStat();
    playerScript();

    requestAnimationFrame(animate);
}
animate();