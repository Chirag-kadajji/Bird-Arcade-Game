/*
Bird Arcade Game
Developer: Your Name
Technologies: HTML5 Canvas, JavaScript
*/
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird={
x:80,
y:200,
width:30,
height:30,
gravity:0.5,
velocity:0,
jump:-8
};

let pipes=[];
let score=0;
let gameOver=false;
let gameStarted=false;

function drawBird(){

ctx.fillStyle="yellow";
ctx.beginPath();
ctx.arc(bird.x+15,bird.y+15,15,0,Math.PI*2);
ctx.fill();

ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(bird.x+20,bird.y+10,3,0,Math.PI*2);
ctx.fill();

ctx.fillStyle="orange";
ctx.beginPath();
ctx.moveTo(bird.x+30,bird.y+15);
ctx.lineTo(bird.x+40,bird.y+18);
ctx.lineTo(bird.x+30,bird.y+22);
ctx.fill();

}

function updateBird(){

bird.velocity+=bird.gravity;
bird.y+=bird.velocity;

if(bird.y+bird.height>canvas.height){
gameOver=true;
}

if(bird.y<0){
bird.y=0;
}

}

function createPipe(){

let gap=130;
let topHeight=Math.random()*200+50;

pipes.push({
x:canvas.width,
top:topHeight,
bottom:topHeight+gap,
width:50,
passed:false
});

}

function drawPipes(){

pipes.forEach(pipe=>{

ctx.fillStyle="#2ecc71";

ctx.fillRect(pipe.x,0,pipe.width,pipe.top);
ctx.fillRect(pipe.x,pipe.bottom,pipe.width,canvas.height);

ctx.fillStyle="#27ae60";

ctx.fillRect(pipe.x-5,pipe.top-20,pipe.width+10,20);
ctx.fillRect(pipe.x-5,pipe.bottom,pipe.width+10,20);

});

}

function updatePipes(){

pipes.forEach(pipe=>{

pipe.x-=2;

if(
bird.x < pipe.x+pipe.width &&
bird.x+bird.width > pipe.x &&
(bird.y < pipe.top || bird.y+bird.height > pipe.bottom)
){
gameOver=true;
}

if(!pipe.passed && pipe.x+pipe.width<bird.x){
score++;
pipe.passed=true;
}

});

}

function drawScore(){

ctx.fillStyle="black";
ctx.font="22px Arial";
ctx.fillText("Score: "+score,10,30);

}

function drawStartScreen(){

ctx.fillStyle="black";
ctx.font="30px Arial";
ctx.fillText("Press SPACE to Start",60,250);

}

function drawGameOver(){

ctx.fillStyle="red";
ctx.font="40px Arial";
ctx.fillText("Game Over",100,250);

ctx.font="20px Arial";
ctx.fillText("Press SPACE to Restart",90,300);

}

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height);

if(!gameStarted){
drawStartScreen();
requestAnimationFrame(gameLoop);
return;
}

if(pipes.length===0 || pipes[pipes.length-1].x<220){
createPipe();
}

drawBird();
drawPipes();
drawScore();

if(!gameOver){
updateBird();
updatePipes();
}else{
drawGameOver();
}

requestAnimationFrame(gameLoop);

}

document.addEventListener("keydown",e=>{

if(e.code==="Space"){

if(!gameStarted){
gameStarted=true;
return;
}

if(gameOver){
location.reload();
}

bird.velocity=bird.jump;

}

});

canvas.addEventListener("click",()=>{

if(!gameStarted){
gameStarted=true;
return;
}

if(gameOver){
location.reload();
}

bird.velocity=bird.jump;

});

gameLoop();