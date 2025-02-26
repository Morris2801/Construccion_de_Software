/*
Implementation of the game of Pong
*/

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;
let oldTime;
const paddleVelocity = 2;

// Context of the Canvas
let ctx;
class Ball extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "ball");
        this.velocity = new Vec(0.01,0.01);
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
}
class Paddle extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "paddle");
        this.velocity = new Vec(0.0,0.0);
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
}

const box = new Ball(new Vec(canvasWidth/2, canvasHeight/2), 20, 20, "white");
const leftPaddle = new Paddle(new Vec(20, canvasHeight/2), 20,100, "rgb(255, 89, 89)");
const rightPaddle = new Paddle(new Vec(canvasWidth-40, canvasHeight/2), 20,100, "rgb(255, 89, 89)");

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
    box.update(deltaTime);
    leftPaddle.update(deltaTime);
    rightPaddle.update(deltaTime);
    // Update the properties of the object
    // box.x += box.speed * box.direction;
    // if (box.position.x > canvasWidth - box.width) {
    //     box.direction = -1;
    //     box.speed += 0.1;
    // } 
    // else if (box.x < 0) {
    //     box.direction = 1;
    // }
    oldTime = newTime; 
    requestAnimationFrame(drawScene);
}