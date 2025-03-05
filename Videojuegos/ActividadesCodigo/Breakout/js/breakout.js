/*
Implementation of the game of Breakout
*/

"use strict";

// Global variables
const canvasWidth = 900;
const canvasHeight = 700;
let oldTime;
const paddleVelocity = 1.25;
let Score = 0;
let columns = 4; 
let rows = 14; 
let bricks = [];
let colorList = {
    purple : "rgb(168, 106, 203)",
    pink : "rgb(221, 98, 214)",
    red : "rgb(207, 108, 108)",
    orange : "rgb(210, 165, 101)",
    yellow : "rgb(180, 188, 89)",
    green : "rgb(91, 188, 89)",
    blue : "rgb(89, 188, 188)" 
}

// Game Objects
let ctx;
class Box extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "box");
    }
}
class Ball extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "ball");
        this.velocity = new Vec(0.15,0.15);
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
    initVelocity(){
        this.inPlay = true;
        box.position = new Vec(canvasWidth/2, canvasHeight*0.75 -20);
        let angle = Math.random()*(5*(Math.PI)/4) - (7*(Math.PI)/4);
        this.velocity = new Vec(Math.cos(angle), Math.abs(Math.sin(angle)));
        this.velocity = this.velocity.times(0.75);
    }
    reset(){
        this.inPlay = false;
        this.velocity = new Vec(0,0);
        this.position = new Vec(canvasWidth/2, canvasHeight*0.75 -20);
    }
}
class Paddle extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "paddle");
        this.velocity = new Vec(0.0,0.0);
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
        if(this.position.x <0){
            this.position.x = 0; 
        }
        else if(this.position.x + this.width > canvasWidth){
            this.position.x = canvasWidth - this.width
        }
    }
}
class Brick extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "brick");
    }
}

const box = new Ball(new Vec(canvasWidth/2, canvasHeight*0.75 -20), 20, 20, "white");
const paddle = new Paddle(new Vec(canvasWidth/2-50, canvasHeight-50), 100,50, "rgb(255, 255, 255)");
const upMarg = new Box(new Vec(0,0), canvasWidth, 20, "black");
const downMarg = new Box(new Vec(0,canvasHeight-20), canvasWidth, 20, "black");
const leftMarg = new Box(new Vec(0,0), 20, canvasHeight, "black");
const rightMarg = new Box(new Vec(canvasWidth-20,0), 20, canvasHeight, "black");


function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');
    createEventListeners();
    createBricks();
    drawScene(0);
}

function createEventListeners(){
    window.addEventListener('keydown', (event) =>{
        if(event.key == 'a' || event.code == 'ArrowLeft'){
            paddle.velocity = new Vec(-paddleVelocity, 0);
        }    
        else if (event.key == 'd' || event.code == 'ArrowRight'){
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
        if(event.key == 's' && !box.inPlay){
            box.initVelocity();
        }
    });
    window.addEventListener('keyup', (event) =>{
        if(event.key == 'a' || event.code == 'ArrowLeft'){
            paddle.velocity = new Vec(0, 0);
        }
        else if(event.key == 'd' || event.code == 'ArrowRight'){
            paddle.velocity= new Vec(0, 0);
        }        
    });
}

function createBricks() {
    let brickWidth = canvasWidth / columns ;
    let brickHeight = (canvasHeight * 0.49) / rows;
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++){
            let color;
            if(j == 0 || j == 7){
                color = colorList.purple;
            }
            else if(j == 1 || j == 8){
                color = colorList.pink;
            }
            else if(j == 2 || j == 9){
                color = colorList.red;
            }
            else if(j == 3 || j == 10){
                color = colorList.orange;
            }
            else if(j == 4 || j == 11){
                color = colorList.yellow;
            }
            else if(j == 5 || j == 12){
                color = colorList.green;
            }
            else if(j == 6 || j == 13){
                color = colorList.blue; 
            }
            
            let brick = new Brick(new Vec(i * brickWidth + 5, j * brickHeight + 5), brickWidth - 10, brickHeight - 10, color);
            bricks.push(brick);
        }
    }
}
function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    bricks.forEach(brick => brick.draw(ctx));
    box.draw(ctx);
    paddle.draw(ctx);
    upMarg.draw(ctx);
    downMarg.draw(ctx);
    leftMarg.draw(ctx);
    rightMarg.draw(ctx);

    box.update(deltaTime);
    paddle.update(deltaTime);

    if (boxOverlap(box, paddle)) {
        box.velocity.y *= -1;
        box.velocity = box.velocity.times(1.01);
    }
    if (boxOverlap(box, rightMarg) || boxOverlap(box, leftMarg)) {
        box.velocity.x *= -1;
    }
    if (boxOverlap(box, upMarg)) {
        box.velocity.y *= -1;
    }
    if (boxOverlap(box, downMarg)) {
        box.reset();
    }

    bricks = bricks.filter(brick => {
        if (boxOverlap(box, brick)) {
            box.velocity.y *= -1;
            //box.velocity.x *=-1;
            Score += 1;
            return false;
        }
        return true;
    });

    oldTime = newTime;
    console.log(oldTime);
    requestAnimationFrame(drawScene);
}