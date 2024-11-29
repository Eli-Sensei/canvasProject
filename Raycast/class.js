class PVector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(PVector) {
        this.x = PVector.x;
        this.y = PVector.y;
    }
    add(PVector) {
        this.x += PVector.x;
        this.y += PVector.y;
    }
    sub(PVector) {
        this.x += -PVector.x;
        this.y += -PVector.y;
    }
    mult(number) {
        this.x *= number;
        this.y *= number;
    }
    div(number) {
        this.x /= number;
        this.y /= number;
    }
    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    normalize() {
        let m = this.mag();
        if (m != 0) this.div(m);
    }
    limit(max) {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    }
    random2D() {
        this.set(new PVector(random(-canvas.width, canvas.width), random(-canvas.height, canvas.height)));
        this.normalize();
    }

    clone() { 
        return new PVector(this.x, this.y); 
    }

    // STATIC METHOD
    static addi(v1, v2) {
        const v3 = new PVector(v1.x + v2.x, v1.y + v2.y);
        return v3;
    }
    static subi(v1, v2) {
        const v3 = new PVector(v1.x - v2.x, v1.y - v2.y);
        return v3;
    }
    static multi(v1, number) {
        const v3 = new PVector(v1.x * number, v1.y * number);
        return v3;
    }
    static divi(v1, number) {
        const v3 = new PVector(v1.x / number, v1.y / number);
        return v3;
    }
    static disti(v1, v2) {
        return Math.sqrt(Square(v2.x - v1.x) + Square(v2.y - v1.y));
    }
}


class Player {
    constructor(w = tileW, h = tileH){
        this.w = w;
        this.h = h;
        this.center = new PVector();

        this.speed = 80;
        this.angle = 0.2;
        this.rotationSpeed = 5;
        this.isColliding = false;
        this.canMove = true;

        this.location = new PVector(2 * tileW, 5 * tileH)
        this.futurLocation = this.location;
        this.direction = new PVector();
        this.velocity = new PVector();
    }

    checkWall(walls){
        let playerSquare = {
            x: this.futurLocation.x,
            y: this.futurLocation.y,
            w: this.w,
            h: this.h,
        }

        for (let wall of walls) {
            if(isSquareIntoSquare(playerSquare, wall)){
                this.isColliding = true;
                this.canMove = false;

                // console.log("colliding wall")
                wall.color = 2
                // return this.canMove
                break;
            }else{
                // console.log("no colliding wall")
                wall.color = 1
                this.isColliding = false;
                this.canMove = true;
            }
        }
        return this.canMove
    }

    move(nb, walls){
        let cosX = Math.cos(this.angle) * nb;
        let sinY = Math.sin(this.angle) * nb;

        this.direction.x = cosX;
        this.direction.y = sinY;
        this.direction.normalize();
        this.velocity = this.direction;
        this.velocity.mult(this.speed * deltaTime);

        this.futurLocation.add(this.velocity)

        this.checkWall(walls)

        if(this.canMove){
            this.location.add(this.velocity);
        }else {
            this.location.sub(this.velocity)
            // console.log("TU PEUX PAS Y ALLER TDC")
        }
        

        
        
    }

    update(walls){
        if(inputs.right) this.angle += this.rotationSpeed * deltaTime;
        if(inputs.left) this.angle -= this.rotationSpeed * deltaTime;
        if(inputs.top) this.move(1, walls);
        if(inputs.bottom) this.move(-1, walls);

        this.center = this.location.clone();
        this.center.add(new PVector(this.w / 2, this.h / 2))
    }

    draw(){
        drawRect(this.location.x, this.location.y, this.w, this.h, 4)


        // compass on player

        let cosX = Math.cos(this.angle);
        let sinY = Math.sin(this.angle);

        let compassDir = new PVector(cosX, sinY);
        compassDir.normalize();
        compassDir.mult(100)
        
        let compassStartPoint = this.location.clone();
        compassStartPoint.add(new PVector(this.w / 2, this.h / 2))
        
        let compassEndPoint = PVector.addi(compassStartPoint, compassDir);
    
        drawLine(compassStartPoint, compassEndPoint, 3);
    }

    lookAt(Vector) {
        return PVector.subi(Vector, this.location);
    }
}


class Wall extends PVector {
    constructor(x = 0, y = 0, w = tileW, h = tileH, color =  1){
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    draw(){
        drawRect(this.x, this.y, this.w, this.h, this.color)
    }
}

class Ray extends PVector {
    constructor(startVector, angle = 0){
        super();
        this.angle = angle;
        this.length = 1;
        this.maxLength = 500
        this.location = startVector;
        this.endLocation = this.location;

        this.hit = false;
    }

    checkWall(walls){
        
        for (let wall of walls) {
            if(isPointIntoSquare(this.endLocation, wall)){
               this.hit = true;

                wall.color = 3
                break;
            }else{
                this.hit = false
            }
        }
        return this.hit
    }

    update(player, walls){

        let newAngle = player.angle + this.angle - offsetAngle

        let cosX = Math.cos(newAngle);
        let sinY = Math.sin(newAngle);

        
        this.location = player.center.clone();
        let tmpEnd = new PVector(cosX, sinY);
        
        for (let i = 0; i < this.maxLength;) {
            
            tmpEnd.normalize();
            tmpEnd.mult(this.length)
            
            this.endLocation = PVector.addi(this.location, tmpEnd);
            
            
            
            
            
            if(this.hit){
                break;
            }else{
                this.checkWall(walls)
                this.length++
            }

            
            i++
            // console.log(i)
        }

        this.length = 1
        this.hit = false;
    }

    draw(){
     
        drawLine(this.location, this.endLocation, 2);
    }
}