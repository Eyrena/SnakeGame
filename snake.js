window.onload = function() {

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var cvsW = cvs.clientWidth;
var cvsH = cvs.clientHeight;

var snakeW = 10;
var snakeH = 10;

// score variable
var score = 4;

// default direction
var direction = "right";

// read user's directions
document.addEventListener("keydown",getDirection);

function getDirection(e){
    if (e.keyCode == 37 && direction != "right"){
        direction = "left";
    } else if (e.keyCode == 38 && direction != "down"){
        direction = "up";
    } else if (e.keyCode == 39 && direction != "left"){
        direction = "right";
    } else if (e.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

function drawSnake(x,y){
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

    ctx.fillStyle = "#000";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

// creat our snake object, it will contain 4 cells in default
var len = 4;
var snake = [];

for (var i = len-1; i>=0; i--){
    snake.push(
        { x:i,
          y:0
        }
    );
}

// create food 
food = {
    x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
    y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
}

// draw food function
function drawFood(x,y){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

    ctx.fillStyle = "#000";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

// check collision function
function checkCollision(x,y,array){
    for (var i = 0; i < array.length; i++){
        if (x==array[i].x && y == array[i].y){
            return true;
        }
    }
    return false;
}

function drawScore(x){
    ctx.fillStyle = "yellow";
    ctx.font ="15px Verdana";
    ctx.fillText("score : "+ x, 5, cvsH-5);
}


function draw(){
    ctx.clearRect(0,0,cvsW,cvsH);
    for (var i=0; i<snake.length;i++){
        var x = snake[i].x;
        var y = snake[i].y;
        drawSnake(x,y);
    }
     
    // draw food
    drawFood(food.x,food.y);

    // snake head
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // create a new head, based on the previous head and the direction
    if (direction == "left") snakeX--;
        else if (direction == "up") snakeY--;
        else if (direction == "right") snakeX++;
        else if (direction == "down") snakeY++;

    // if the snake hits the wall, it's a game over
    if (snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || 
        snakeY >= cvsH/snakeH || checkCollision(snakeX,snakeY,snake)) {
        location.reload();
    }
    // if our snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x : Math.round(Math.random()*(cvsW/snakeW+1)),
            y : Math.round(Math.random()*(cvsH/snakeH+1))
        }
        var newHead = {
            x : snakeX,
            y : snakeY
        };
        score++;
        
    } else {
        // remove to last entry (the snake Tail);
        snake.pop();
        var newHead = {
            x : snakeX,
            y : snakeY
        };

    }
    

    snake.unshift(newHead);
    drawScore(score);
}

setInterval(draw,100);

}