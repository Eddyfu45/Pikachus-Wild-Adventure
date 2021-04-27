// GLOBAL DOM VARIABLES
const level = document.getElementById('level');
const lives = document.getElementById('lives');
const game = document.getElementById('game');
let interval;
const rattataArray = [];

const ctx = game.getContext('2d');
// ====================== SETUP FOR CANVAS RENDERING ======================= //
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

function clearCanvas() {
    ctx.clearRect(0, 0, game.width, game.height);
}

// ====================== ENTITIES ======================= //

class Pokemon{
    constructor (x ,y ,color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Pikachu extends Pokemon {
    constructor (x, y, color, width, height, lives){
        super(x, y, color, width, height);
        this.lives = lives;
    }
}

class Rattata extends Pokemon {
    spawnRattatas() {
        for (i = 0; i < 10; i++) {
            rattataArray.push(new Rattata((Math.random() * game.width), 10, "purple", 30, 30));
            rattataArray[rattataArray.length - 1].render();
        }
    }
}

function moveRattatas() {
    rattataArray.forEach(element => {
        element.y += 50;            
    });
}

function spawnRattatas() {
    rattataArray = [];
    for (i = 0; i < 10; i++) {
        rattataArray[i] = new Pokemon((Math.random() * game.width), 10, "purple", 30, 30);
        rattataArray[i].render();
    }
}


// ====================== HELPER FUNCTIONS ======================= //
// SANDBOX FOR TESTING PAINTING TECHNIQUES 

function changeScenery(level) {
    if (level == 1) {
        game.style.backgroundImage = "url('img/Pokemon Field Background.png')";
    }
}

// //  GUI 


// //  KEYBOARD INTERACTION LOGIC 

function movementHandler(e){
    if ((e.which == 83) && (player.y < 360)) {
        player.y += 10;
    }
    else if ((e.which == 87) && (player.y > 0)) {
        player.y -= 10;
    }
    else if ((e.which == 68) && (player.x < 760)) {
        player.x += 10;
    }
    else if ((e.which == 65) && (player.x > 0)) {
        player.x -= 10;
    }
}


// // ====================== GAME PROCESSES ======================= //

function gameLoop() {
    clearCanvas();
    level.textContent = `Level ${levelNum}`;
    lives.textContent = `Lives: ${livesNum}`;
    // if (rattata.alive) {
    //     rattata.render();
    //     if (detectHit(pikachu, rattata)){
    //         rattata.alive = false;
    //     }
    // }
    player.render();
}

function enemyLoop() {
    if (level == 1){
        spawnRattatas();
    }
}

// // ====================== COLLISION DETECTION ======================= //

function detectHit(p1, p2){
    const test = (
        p1.y +p1.height > p2.y &&
        p1.y < p2.y + p2.height &&
        p1.x + p1.width > p2.x &&
        p1.x < p2.x + p2.width
    );
    return test;
}

// // // ====================== PAINT INTIAL SCREEN ======================= //

// // // EVENT LISTENER

begin.addEventListener("click", function() {
    levelNum = 1;
    livesNum = 6;
    changeScenery(1);
    player = new Pikachu((game.width/2), 345, "yellow", 30, 30);
    document.addEventListener('keydown', movementHandler);
    const runGame = setInterval(gameLoop, 60);
    const enemySpawn = setInterval(enemyLoop, 5000);
    const enemyMove = setInterval(moveRattatas, 240);
})


// // KEYPRESS LISTENER

// // CODE STASH

// // game.addEventListener('click', function(e) {

// //     clearCanvas();

// //     randomCrawler.render();
// //     crawlerArray.push(randomCrawler);
// //     console.log(crawlerArray.length,"<<<crawlers in here");
// //     crawlerArray.forEach(crawler => {
// //         crawler.render();
// //     })
// // })
