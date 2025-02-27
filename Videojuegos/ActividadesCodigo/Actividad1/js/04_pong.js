/*
Implementation of the game of Pong
*/

"use strict";

// Global variables
const canvasWidth = 900;
const canvasHeight = 700;
let oldTime;
const paddleVelocity = 1.25;
let leftScore = 0; 
let rightScore = 0;

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
        this.velocity = new Vec(0.25,0.25);
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
    initVelocity(){
        box.position = new Vec(canvasWidth/2, canvasHeight/2);
        let angle = Math.random()*(Math.PI/2) - (Math.PI/4);
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle));
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
const leftPaddle = new Paddle(new Vec(20, canvasHeight/2), 20,100, "rgb(255, 89, 89)");
const rightPaddle = new Paddle(new Vec(canvasWidth-40, canvasHeight/2), 20,100, "rgb(255, 89, 89)");
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
        if(event.key == 'q'){
            leftPaddle.velocity = new Vec(0, -paddleVelocity);
        }
        else if(event.key == 'a'){
            leftPaddle.velocity= new Vec(0, paddleVelocity);
        }
        else if(event.key == 'o' || event.code == 'ArrowUp'){
            rightPaddle.velocity = new Vec(0, -paddleVelocity);
        }
        else if(event.key == 'l' || event.code == 'ArrowDown'){
            rightPaddle.velocity = new Vec(0, paddleVelocity);
        }    
    });
    window.addEventListener('keyup', (event) =>{
        if(event.key == 'q'){
            leftPaddle.velocity = new Vec(0, 0);
        }
        else if(event.key == 'a'){
            leftPaddle.velocity= new Vec(0, 0);
        }
        else if(event.key == 'o' || event.code == 'ArrowUp'){
            rightPaddle.velocity = new Vec(0, 0);
        }
        else if(event.key == 'l' || event.code == 'ArrowDown'){
            rightPaddle.velocity = new Vec(0, 0);
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
    leftPaddle.draw(ctx);
    rightPaddle.draw(ctx);
    upMarg.draw(ctx);
    downMarg.draw(ctx);
    leftMarg.draw(ctx);
    rightMarg.draw(ctx);
    box.update(deltaTime);
    leftPaddle.update(deltaTime);
    rightPaddle.update(deltaTime);

    if(boxOverlap(box, leftPaddle) || boxOverlap(box, rightPaddle)){
        box.velocity.x *= -1; 
        box.velocity = box.velocity.times(1.1);
    }
    if(boxOverlap(box, upMarg) || boxOverlap(box, downMarg)){
        box.velocity.y *= -1;
        box.velocity = box.velocity.times(1.1);
    }
    if(boxOverlap(box, leftMarg)){
        rightScore++;
        box.initVelocity();
    }
    if(boxOverlap(box, rightMarg)){
        leftScore++;
        box.initVelocity();
    }  
    
    oldTime = newTime; 
    requestAnimationFrame(drawScene);
}