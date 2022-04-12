const gameboard = document.querySelector('.gameboard');
for (x=0;x<900;x++) {
   let field = document.createElement('div');
   gameboard.appendChild(field);
   field.className = 'field';
}

const log = function(x){console.log(x)};
const fields = document.querySelectorAll(".field");
// log(fields);
//------------------------------------------------------

let apple = Math.floor(Math.random()*900);
function drawApple() {
    fields[apple].classList.add("apple");
    fields[apple].style.backgroundColor = "red";
}
drawApple();

let snake = [94,95,96,97];

let directionPlus = true;  //+1  
let directionMinus = false;  //-1

let directionX = true;
let directionY = false;
let direction = "right";


// ----------------------
function drawSnake() {
    snake.forEach(element=> fields[element].style.backgroundColor = "green");
    fields[snake[snake.length-1]].style.backgroundColor = "lime"
}
function undrawSnake(x) {
    fields[x].style.backgroundColor = "black";
    drawApple();
}
// ----------------------
// log(apple)
// log(snake[snake.length-1])
let score = document.querySelector(".score");
function eat() {
    pauso()
    starto();
    if (directionPlus==true & snake[snake.length-1]==apple) {
        snake.push(snake[snake.length-1]+1)
        log("Snake ate apple");
        log(snake);
        log(snake[0]-1);
        let history = apple;
        apple = Math.floor(Math.random()*900);
        apple!=history ? drawApple() : apple = Math.floor(Math.random()*900);
        score.innerHTML = Number(score.innerHTML)+1;
        speedPlus()
    } else if (directionMinus==true & snake[snake[0]==apple]) {
        log("snake ate apple in minus direction");
    }
}
// ----------------------
function moveSnake() {
    plus = [];
    let last = snake[snake.length-1];
    if ((last+1)%30==0) {
        if (direction =="right") {
            snake[snake.length-1]-=30;
        } else {
            snake[snake.length-1]+=30;
        }
        
        // snake.sort(compareNums);
        
    }
    else if (snake[snake.length-1]>870) {
        snake[snake.length-1]-=870;
        // snake.sort(compareNums);
    }
    else if (snake[snake.length-1]<30) {
        log(snake)
        snake[snake.length-1]+=870;
        // snake.push(snake[snake.length-1]-30);
        // snake.shift();
        // snake.sort(compareNums);
    }
    // ----------------------           
    switch (direction) {
        case("right"): 
            snake.push(snake[snake.length-1]+1);
            snake.shift();
            break;
        case("down"):
            snake.push(snake[snake.length-1]+30);
            snake.shift();
            break;
        case("left"):
            snake.push(snake[snake.length-1]-1);
            snake.shift();
            break;
        case("up"):
            snake.push(snake[snake.length-1]-30);
            snake.shift();
    }
    // ----------------------
    // log(snake);
    fields.forEach(element=> element.style.backgroundColor = 'black');
    drawApple();
    drawSnake();
    eat();
    
    // --------------------------------------------------------------------------------------------------------------log
    // log(snake);
}

//jestlize se snake dotkne "borderu", v nasledujícím intervalu se do array "snake" pridavaji indexy s hodnotou -30 .. 

function compareNums(a,b) {
    return a - b
}

function transfer() {
    if (last%30==0) {
        last = last-30;
        snake.push(last);
        snake.sort(compareNums);
        log(last);
    }
}

//------------------------------------------------------
function speedPlus() {
    if (speed >150) {
        speed -=25;
        log("snake speed is: "+speed)
    } else if(speed>50) {
        speed -=5
    } else {
        speed=speed
    }
}
// vytvoreni promene pro speed a tak aby se dalo dosadit do snake app
let speed = 225;
let intervalAction = false;
let myInterval;
function interval() {
    myInterval = setInterval(moveSnake, speed);
    intervalAction = true;
}
document.body.onkeyup = (e)=> {
    if (e.keyCode==13) {
        starto()
        log("something interesting")
    } else if (e.keyCode==32) {
        pauso()
        log("nothing interesting")
    }
}

const start = document.querySelector(".start");
const pause = document.querySelector(".pause");

function starto() {
    if (intervalAction === false)
    interval();
}
function pauso() {
    if (intervalAction==true) {
        clearInterval(myInterval);
        intervalAction = false;
    }
}
start.addEventListener('click', starto);
pause.addEventListener('click', pauso);

window.addEventListener("keydown", e => {
    if (e.keyCode === 40 & direction!="up") {
      direction = "down";
      directionPlus = false;
      directionMinus = true;
    } else if(e.keyCode === 39 & direction!="left") {
        direction = "right"
        directionPlus = true;
        directionMinus = false;
    } else if(e.keyCode === 38 & direction!="down") {
        direction = "up";
        directionPlus = true;
        directionMinus = false;
    } else if(e.keyCode === 37 & direction!="right") {
        direction = "left"
        directionPlus = false;
        directionMinus = true;
    } 
// ----------------------
  });

// 
// bugs: border fields problem, -x direction eat(), -y direction eat(), eat() in other cases, start/stop listeners

// function gameover(), save score to localstorage

// ..