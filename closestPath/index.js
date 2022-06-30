let carte = [
    "#################",
    "#S#             #",
    "# #   #         #",
    "# # #   #   # ###",
    "#   #       # ###",
    "# # #    #  # # #",
    "#   #     #    E#",
    "#################",
];

for (let i = 0; i < carte.length; i++) {
    carte[i] = [...carte[i]]
}

function showResult(map) {

    let out = [];
    let opened = [];
    let closed = [];

    let startPoint = {};
    let endPoint = {};


    for (let y = 0; y < map.length; y++) {
        const row = map[y];
        for (let x = 0; x < row.length; x++) {
            const column = row[x];
            if(column == "S") startPoint = {x: x, y: y};
            if(column == "E") endPoint = {x: x, y: y}
        }
    }
    
    // findClosestPath(map, startPoint, endPoint, 0);
    findClosestPath2(map, startPoint, endPoint);


    return map;

    function findClosestPath(map, start, end, count) {
        closed.push(JSON.stringify(start));
        count++;

        let children = getAvailableChildren(start);

        if(children.length != 0){

            for (let i = 0; i < children.length; i++) {
                if(findClosestPath(map, children[i], end, count)){
                    setPointValue(children[i], count)
                    return true;
                }
                setPointValue(children[i], count)
            }
        }else return false;
    
        
    }

    function findClosestPath2(map, start, end) {
        start.value = 1
        opened.push(start);


        // while (opened.length != 0) {

            let inter = setInterval(()=>{

                let currentNode = opened.shift();
                closed.push(currentNode);
                
                let children = getAvailableChildren(currentNode);
    
                for (let i = 0; i < children.length; i++) {
                    children[i].value = currentNode.value + 1;
    
                    setPointValue(children[i], currentNode.value)
                    opened.push(children[i])
                }
    
    
                drawResult(map)

                if(opened.length == 0) clearInterval(inter);
            }, 100)
            
        // }
        
    }

    function getAvailableChildren(coor){
        let children = [];
        let out = [];
        let maxX = map[0].length - 1;
        let maxY = map.length - 1;

        // middle left
        if(coor.x - 1 >= 0) children.push({x: coor.x - 1, y: coor.y})
        // top left
        // if(coor.x - 1 >= 0 && coor.y - 1 >= 0) children.push({x: coor.x - 1, y: coor.y - 1})
        // bottom left
        // if(coor.x - 1 >= 0 && coor.y + 1 <= maxY) children.push({x: coor.x - 1, y: coor.y + 1})


        // top center
        if(coor.y - 1 >= 0) children.push({x: coor.x, y: coor.y - 1})
        // bottom center
        if(coor.y + 1 <= maxY) children.push({x: coor.x, y: coor.y + 1})

        // middle right
        if(coor.x + 1 <= maxX) children.push({x: coor.x + 1, y: coor.y})
        // top right
        // if(coor.x + 1 <= maxX && coor.y - 1 >= 0) children.push({x: coor.x + 1, y: coor.y - 1})
        // bottom right
        // if(coor.x + 1 <= maxX && coor.y + 1 <= maxY) children.push({x: coor.x + 1, y: coor.y + 1})

     

        for (const coordonate of children) {
            if(map[coordonate.y][coordonate.x] !== "#" && 
            closed.findIndex((coor) => coor.x === coordonate.x && coor.y === coordonate.y) == -1
            ){
                out.push(coordonate)
            }
        }
        

        return out;
    }

    function getPointValue(coor) {
        return map[coor.y][coor.x]
    }
    function setPointValue(coor, value) {
        map[coor.y][coor.x] = value
        // console.log(coor.y + "-" + coor.x + " set to " + value)
        // console.log(map)
    }
}

function drawResult(mapped) {
    let container = document.createElement("div");
    container.classList.add("map")

    for (const y of mapped) {
        let rowContainer = document.createElement("div");
        rowContainer.classList.add("row")
        for (const x of y) {
            if(x == "#") rowContainer.innerHTML += `<div class="case" style="background-color: rgb(0, 75, 75);">${x}</div>`
            else rowContainer.innerHTML += `<div class="case">${x}</div>`
        }
        container.appendChild(rowContainer)
    }

    document.body.innerHTML = container.outerHTML
}

let ret = showResult(carte);
// drawResult(ret)
console.log(ret)



