class Vec {
    constructor(x,y){
        this.x = x; 
        this.y = y; 
    }
    plus(other){
        return new Vec(this.x + other.x, this.y + other.y);
    }
    minus(other){
        return new Vec(this.x - other.x, this.y - other.y);
    }
    times(scalar){
        return new Vec(this.x*scalar, this.y*scalar);
    }
    magnitude(){
        return Math.sqrt(this.x **2 + this.y **2);
    }
}

 
// let a = new Vec(3,7);
// let b = new Vec(-2,5);
// console.log("plus", a.plus(b));
// console.log("minus", a.minus(b));
// console.log("times" , a.times(3));
// console.log("magnitude", a.magnitude());

class GameObject{
    constructor(position,width,height,color,type){
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(){

    }
}

function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.width > obj2.position.x && 
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.height;
}