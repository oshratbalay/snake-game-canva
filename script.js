let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tailCount = 20;
let tailSize = canvas.width / tailCount - 2;
let headX = 10;
let headY = 10;
let snakePart = [];
let taillegnth = 2;

let score = 0;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();
  drawSnake();
  drawApple();
  checkApple();
  drawscore();

if(score > 2){ 
    speed = 11
}

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if(xVelocity === 0 && yVelocity=== 0 ){
    return false
  }
  if (headX < 0) {
    gameOver = true;
  }

else if(headY < 0){
    gameOver = true;
}
else if(headY >= tailCount){
    gameOver = true;
}
else if(headX >= tailCount){
    gameOver = true;
}

for (let i = 0 ; i < snakePart.length ; i++){
    let part = snakePart[i];
    if (part.x == headX && part.y == headY){
    gameOver = true;
        break;
    }
}



  if(gameOver){
    ctx.fillStyle = "white";
    ctx.font = "50px verdana";
    ctx.fillText("game over" ,canvas.width / 6.5 , canvas.height / 2 ); 
  }
  return gameOver;
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawscore() {
  ctx.fillStyle = "white";
  ctx.font = "10px verdana";
  ctx.fillText("score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tailCount, headY * tailCount, tailSize, tailSize);

  ctx.fillStyle = "green";
  for (let i = 0; i < snakePart.length; i++) {
    let part = snakePart[i];
    ctx.fillRect(part.x * tailCount, part.y * tailCount, tailSize, tailSize);
  }
  snakePart.push(new SnakePart(headX, headY));
  if (snakePart.length > taillegnth) {
    snakePart.shift();
  }
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tailCount, headY * tailCount, tailSize, tailSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tailCount, appleY * tailCount, tailSize, tailSize);
}

function checkApple() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tailCount);
    appleY = Math.floor(Math.random() * tailCount);
    taillegnth++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(e) {
  if (e.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }

  if (e.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  if (e.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  if (e.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
