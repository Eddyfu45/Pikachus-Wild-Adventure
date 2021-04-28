// GLOBAL DOM VARIABLES
var level = document.getElementById('level');
var lives = document.getElementById('lives');
const game = document.getElementById('game');
let speed = 5;
let enemyArray = [];

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

function spawnEnemy() {
    if ((levelNum == 1) && (timer % 80 == 0)) { // Caterpie
        for (i = 0; i < 25; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "green", 15, 15));
        }
    }
    else if ((levelNum == 2) && (timer % 80 == 0)) { // Pidgeotto
        for (i = 0; i < 20; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "purple", 20, 20));
        }
    }
    else if ((levelNum == 3) && (timer % 80 == 0)) { // Eevee
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "brown", 25, 25));
        }
    }
    else if ((levelNum == 4) && (timer % 80 == 0)) { // Poliwhirl
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "blue", 25, 25));
        }
    }
    else if ((levelNum == 5) && (timer % 80 == 0)) { // Gyrados
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "lightblue", 20, 20));
        }
    }
    else if ((levelNum == 6) && (timer % 80 == 0)) { // Zapdos
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "darkyellow", 20, 20));
        }
    }
    else if ((levelNum == 7) && (timer % 80 == 0)) { // Moltres
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "red", 20, 20));
        }
    }
    else if ((levelNum == 8) && (timer % 80 == 0)) { // Articuno
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "lightblue", 20, 20));
        }
    }
    else if ((levelNum == 9) && (timer % 80 == 0)) { // Ho-Oh
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "orange", 20, 20));
        }
    }
    else if ((levelNum == 10) && (timer % 80 == 0)) { // Lugia
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * game.width), 10, "silver", 20, 20));
        }
    }
}

function moveEnemy() {
    enemyArray.forEach(element => {
        element.y += speed;            
    });
}

function renderEnemies() {
    for (i = 0; i < enemyArray.length; i++) {
        if (enemyArray[i].alive == true) {
            enemyArray[i].render();
        }
    }
}

// ====================== HELPER FUNCTIONS ======================= //
// SANDBOX FOR TESTING PAINTING TECHNIQUES 

function changeScenery() {
    if (levelNum == 1) {
        game.style.backgroundImage = "url('img/Pokemon Forest Background.png')";
    }
    else if (levelNum == 2) {
        game.style.backgroundImage = "url('img/Pokemon Field Background.png')";
    }
    else if (levelNum == 3) {
        game.style.backgroundImage = "url('img/Pokemon City Background.png')";
    }
    else if (levelNum == 4) {
        game.style.backgroundImage = "url('img/Pokemon River Background.png')";
    }
    else if (levelNum == 5) {
        game.style.backgroundImage = "url('img/Pokemon Lake Background.jpeg')";
    }
    else if (levelNum == 6) {
        game.style.backgroundImage = "url('img/Pokemon Power Plant Background.jpeg')";
    }
    else if (levelNum == 7) {
        game.style.backgroundImage = "url('img/Pokemon Volcano Background.jpeg')";
    }
    else if (levelNum == 8) {
        game.style.backgroundImage = "url('img/Pokemon Snow Background.jpeg')";
    }
    else if (levelNum == 9) {
        game.style.backgroundImage = "url('img/Pokemon Mountain Background.jpeg')";
    }
    else if (levelNum == 10) {
        game.style.backgroundImage = "url('img/Pokemon Beach Background.jpeg')";
    }
}

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

function nextLevel() {
    if ((timer % 500 == 0) && (timer > 0)) {
        levelNum += 1;
        changeScenery();
        enemyArray = [];
        speed += 2;
    }
}

function gameLoop() {
    clearCanvas();
    nextLevel();
    level.textContent = `Level ${levelNum}`;
    spawnEnemy(10);
    renderEnemies();
    moveEnemy();
    player.render();
    detectHit();
    lives.textContent = `Lives: ${livesNum}`;
    timer += 1;
    console.log(timer);
}

// function defeatScreen(){

// }

// // ====================== COLLISION DETECTION ======================= //

function detectHit(){
    for (i = 0; i < enemyArray.length; i++) {
        const detection = (player.y +player.height > enemyArray[i].y &&
            player.y < enemyArray[i].y + enemyArray[i].height &&
            player.x + player.width > enemyArray[i].x &&
            player.x < enemyArray[i].x + enemyArray[i].width)
        if (detection && (enemyArray[i].alive == true)) {
                enemyArray[i].alive = false;
                livesNum -= 1;
                // if (livesNum == 0) {
                //     defeatScreen();
                // }
            }
    }
}

// // // EVENT LISTENER

begin.addEventListener("click", function() {
    livesNum = 6;
    levelNum = 1;
    timer = 0;
    changeScenery();
    player = new Pikachu((game.width/2), 345, "yellow", 20, 20);
    document.addEventListener('keydown', movementHandler);
    const runGame = setInterval(gameLoop, 60);
})
