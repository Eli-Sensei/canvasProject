let object = [
    {
        name: "A",
        visited: false,
        next: ["B", "C"]
    },
    {
        name: "B",
        visited: false,
        parent: "",
        next: ["A", "E"]
    },
    {
        name: "E",
        visited: false,
        next: ["D", "B"]
    },
    {
        name: "C",
        visited: false,
        parent: "",
        next: ["A"]
    },
    {
        name: "D",
        visited: false,
        next: []
    }
];

function getClosestPath(object, start, end) {
    let path = [];

    function getPoints(pointsName) {
        let out = [];
        for (const pointName of pointsName) {
            let point = object.find(point => point.name == pointName);
            out.push(point)
        }
        return out;
    }
    
    function findClosestPath(object, start, end) {
        if(start.name == end.name){
            path.push(start.name);
            return true;
        }
        start.visited = true;
    
        let neighbors = getPoints(start.next).filter(point => !point.visited);
        console.log(neighbors);
        for (let i = 0; i < neighbors.length; i++) {
            if(findClosestPath(object, neighbors[i], end)){
                path.push(start.name);
                return true;
            }
        }
    
    
        return false;
    }

    findClosestPath(object, start, end) 

    return path.reverse();
}



let start = object.find(point => point.name == "A");
let end = object.find(point => point.name == "D");
console.log("chemin le plus court -> " + getClosestPath(object, start, end).toLocaleString());