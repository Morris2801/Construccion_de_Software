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

// Context of the Canvas
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
        box.position = new Vec(canvasWidth/2, canvasHeight/2);
        let angle = Math.random()*(5*(Math.PI)/4) - (7*(Math.PI)/4);
        this.velocity = new Vec(Math.cos(angle), Math.abs(Math.sin(angle)));
    }
    reset(){
        this.inPlay = false;
        this.velocity = new Vec(0,0);
        this.position = new Vec(canvasWidth/2, canvasHeight/2);
    }
}
class Paddle extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "paddle");
        this.velocity = new Vec(0.0,0.0);
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
        if(this.position.y <0){
            this.position.y = 0; 
        }
        else if(this.position.y + this.height > canvasHeight){
            this.position.y = canvasHeight - this.height
        }
    }
}

const box = new Ball(new Vec(canvasWidth/2, canvasHeight/2), 20, 20, "white");
const paddle = new Paddle(new Vec(canvasWidth/2-50, canvasHeight-50), 100,50, "rgb(255, 89, 89)");
const upMarg = new Box(new Vec(0,0), canvasWidth, 20, "grey");
const downMarg = new Box(new Vec(0,canvasHeight-20), canvasWidth, 20, "grey");
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

function drawScene(newTime) {
    if (oldTime == undefined){
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;
    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Draw the object
    box.draw(ctx);
    paddle.draw(ctx);
    
    upMarg.draw(ctx);
    downMarg.draw(ctx);
    leftMarg.draw(ctx);
    rightMarg.draw(ctx);
    
    box.update(deltaTime);
    paddle.update(deltaTime);
    
    // new TextLabel(50,canvasHeight/2,"60px Arial","white").draw(ctx, l);
    
    if(boxOverlap(box, paddle)){
        box.velocity.y *= -1; 
        box.velocity = box.velocity.times(1.01);
    }  
    if(boxOverlap(box, rightMarg) || boxOverlap(box, leftMarg)){
        box.velocity.x *= -1;
    }
    if(boxOverlap(box, upMarg)){
        box.velocity.y *= -1;
    }
    if(boxOverlap(box, downMarg)){
        box.reset();
    }
    if(boxOverlap(paddle, rightMarg) || boxOverlap(paddle, leftMarg)){
        paddle.velocity.x =0;
    }
    oldTime = newTime; 
    requestAnimationFrame(drawScene);
}