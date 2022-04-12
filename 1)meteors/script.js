// ------------------------------------------------------------/
// Game: Space War 
// Last update: 12.04.2022
// Wengison
// ------------------------------------------------------------
//#1 Gameboard 600xfield (grid layout)
let gameboard = document.querySelector("#gameboard");
for (i=0;i<600;i++) {
    let field = document.createElement('div');
    gameboard.appendChild(field);
    field.className = 'field';
}
//Main vars
const fields = document.querySelectorAll(".field");
let ship = [570,589,590,591];
let gameoverValue = false;
// ------------------------------------------------------------
//#2 Ship actions
function shipDraw() {
    ship.forEach(f=>fields[f].style.backgroundColor = 'blue');
    ship[1]==579? fields[ship[1]].style.backgroundColor = 'black': false;
}
function shipUnDraw() {
    ship.forEach(f=>f==600?false:fields[f].style.backgroundColor = 'black');
}
function shipMove(direction) {
    // console.log(direction);
    let newShip = [];
    ship.forEach(el=> {
        direction=='right'? el+=1:el-=1;
        newShip.push(el);
    });
    ship=newShip;
    ship.sort((x,y)=>x-y);
}
//Ship - keyboard control
document.addEventListener('keydown', (e)=> {
    if(e.keyCode=='39'& ship[3]<600) {
        if(ship[3]==599) {
            ship.pop();
        }
        shipUnDraw();
        shipMove('right');
        shipDraw();
    } else if (e.keyCode=='37'& ship[1]>579) {
        if(ship[2]==599) {
            ship.push(600);
        }
        shipUnDraw();
        shipMove('left');
        shipDraw();
    }
})
// ------------------------------------------------------------
//#3 Meteor actions
let meteor = false;
function meteorCreate() {
    meteor = Math.floor(Math.random()*20);
}
function meteorFall() {
    if (meteor<600) {
        meteor +=20;
    } else meteor -=20
}
function meteorDraw() {
    fields[meteor].style.backgroundColor = 'orange';

}
function meteorDesctruction() {
    if (meteor>599) {
        gameover();
    }
}
//---- ----
function action() {
    colision();
    meteorDesctruction();
    if (gameoverValue==false) {
        meteor==false? meteorCreate() : meteor;
        fields.forEach(f=>f.style.backgroundColor = 'black');
        // if(buletExist==true) {
        //     buletDraw()
        // }
        shipDraw()
        meteorDraw();
        meteorFall();
    }
}
let speed = 70;
let interval1 = setInterval(action, speed);
function stopInterval1() {
    clearInterval(interval1);
}
// ------------------------------------------------------------
//#4 Ship fire (bullet)
//---- ----
document.addEventListener('keydown', (e)=> {
    if(e.keyCode=='32') {
        shipFire();
    }})
//---- ----
let buletId = 0;
let direction;
let topZone = []  // 0-19
for(i=0;i<20;i++) {
    topZone.push(i)
};
//---- ----
function shipFire() {
    buletId += 1;
    direction = ship[0]-20;
    let bulet = new Bulet(buletId,direction,0);
    function actions3() {
        bulet.undraw();
        bulet.move();
        bulet.draw();
        colision();
    }
    if (buletId<2) {
        const buletAction = setInterval(actions3,15);
    } 
}
//---- ----
class Bulet {
    constructor(id, direction, position) {
        this.id = id;
        this.direction = direction;
        this.position = position;
    }
    undraw() {
        fields[direction].style.backgroundColor = 'black';
        fields[direction].classList.remove('buletArea');
    }
    move() {
        if(direction>20) {
            direction-=20;
        }
    }
    draw() {
        if(direction>20) {
            fields[direction].classList.add('buletArea');
            let bulet = document.createElement('div');
            bulet.className = 'bulet';
            document.querySelector('.buletArea').appendChild(bulet);
            setTimeout(() => {
                bulet.remove();
            }, 500);
            // fields[direction].style.backgroundColor = 'red';
        }
    }
}
//---- ----
function colision() {
    if(direction==meteor||direction+20==meteor) {
        meteor = false;
        scorePlus();
    }
}
setInterval(colision,10);
// ------------------------------------------------------------
//#5 Score
let score = 0;
function scorePlus() {
    score+=1;
}
//..
// ------------------------------------------------------------
//#Gameover
function gameover() {
    stopInterval1();
    fields.forEach(el=>el.remove());
    let over = document.createElement('div');
    over.className = 'gameover';
    gameboard.appendChild(over);
    gameboard.style.display = 'flex';
    over.innerHTML = 'Game over';
    gameoverValue = true;
    // if(buletExist = true) {
    //     clearInterval(buletInterval);
    // }
    console.log('Your score: '+ score);
}
//The end

// ------------------------------------------------------------// ------------------------------------------------------------
