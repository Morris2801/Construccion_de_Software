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

class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
// let a = new Vec(3,7);
// let b = new Vec(-2,5);
// console.log("plus", a.plus(b));
// console.log("minus", a.minus(b));
// console.log("times" , a.times(3));
// console.log("magnitude", a.magnitude());

class GameObject{
    constructor(position, width, height, color, type) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;

        // Sprite properties
        this.spriteImage = undefined;
        this.spriteRect = undefined;
    }

    setSprite(imagePath, rect) {
        this.spriteImage = new Image();
        this.spriteImage.src = imagePath;
        if (rect) {
            this.spriteRect = rect;
        }
    }

    draw(ctx) {
        if (this.spriteImage) {
                ctx.drawImage(this.spriteImage,
                                this.spriteRect.x, this.spriteRect.y,
                                this.spriteRect.width, this.spriteRect.height,
                              this.position.x, this.position.y,
                              this.width, this.height);
                              //this.position.x * scale, this.position.y * scale,
                              //this.width * scale, this.height * scale);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y,
                         this.width, this.height);
        }
    }
}

class TextLabel{
    constructor(x,y,font,color){
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }
    draw(ctx,text){
        ctx.font=this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text,this.x,this.y);
    }
}


function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.width > obj2.position.x && 
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.height;
}