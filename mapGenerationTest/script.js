let canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 600;



let c = canvas.getContext('2d');


function mapInit() {
    let x = 0;
    let y = 600 - 100;
    while (true) {
        c.fillStyle = "black";
        c.fillRect(x, y, 20, 20);
        x += 20;

        if (x > 800) {
            x = 0;
            y += 20;
            if (y > 600) {
                y = 0;
                x = 0;
                break;
            }
        }
    }
}
mapInit();


class Player {
    constructor(x, y, velX, velY, w, h){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.w = w;
        this.h = h;

        let gravityForce = 1;

        function gravity() {
            if (gravityForce < 5) {
                gravityForce += gravityForce / 2;
            }
        }


        this.draw = () => {
            c.clearRect(this.x, this.y - this.velY, this.w, this.h);

            c.fillStyle = "seashell"
            c.fillRect(this.x, this.y, this.w, this.h);
        }

        this.update = () =>{

            // console.log("pouet");

            
            if(this.y + this.h < canvas.height - 100 ){
                gravity();
                this.y += gravityForce;
                console.log(gravityForce)
                
            }
            addEventListener("keydown", (key)=>{
                
                

                if(key.code === "Space"){
                    c.clearRect(this.x, this.y, this.w, this.h);
                    this.y = 200;
                }
            });
            
            
            

            this.draw();
            
            requestAnimationFrame(this.update);
        }
        this.update();
    }
}

let player = new Player(200, 200, 3, 3, 20, 20)



function updateFrame(){

    mapInit();
    requestAnimationFrame(updateFrame);
}
updateFrame();

