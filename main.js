// GLOBAL DOM VARIABLES
var level = document.getElementById('level');
var lives = document.getElementById('lives');
const game = document.getElementById('game');
const begin = document.getElementById("begin");
let speed;
let playerSpeed = 10;
let livesNum;
let levelNum;
var runGame;
let timer;
let player;
let enemyArray = [];
let pikachuIcon = document.getElementById('Pikachu');
let caterpieIcon = document.getElementById('Caterpie');
let pidgeottoIcon = document.getElementById('Pidgeotto');
let eeveeIcon = document.getElementById('Eevee');
let poliwhirlIcon = document.getElementById('Poliwhirl');
let gyradosIcon = document.getElementById('Gyrados');
let zapdosIcon = document.getElementById('Zapdos');
let moltresIcon = document.getElementById('Moltres');
let articunoIcon = document.getElementById('Articuno');
let ho_ohIcon = document.getElementById('Ho-Oh');
let lugiaIcon = document.getElementById('Lugia');

const ctx = game.getContext('2d');
// ====================== SETUP FOR CANVAS RENDERING ======================= //
game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

function clearCanvas() {
    ctx.clearRect(0, 0, game.width, game.height);
}

// ====================== ENTITIES ======================= //

class Pokemon {
    constructor (x ,y , color, width, height, img){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.img = img;
        this.alive = true;
        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}

class Pikachu extends Pokemon {
    constructor (x, y, color, width, height, img){
        super(x, y, color, width, height, img);
        this.pikarender = function() {
            ctx.fillStyle = this.color;
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
    }
}

function spawnEnemy() {
    if ((levelNum == 1) && (timer % 80 == 0)) { // Caterpie
        for (i = 0; i < 25; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 15)), 10, "green", 15, 15, caterpieIcon));
        }
    }
    else if ((levelNum == 2) && (timer % 80 == 0)) { // Pidgeotto
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 30)), 10, "purple", 30, 30, pidgeottoIcon));
        }
    }
    else if ((levelNum == 3) && (timer % 80 == 0)) { // Eevee
        for (i = 0; i < 23; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 20)), 10, "brown", 20, 20, eeveeIcon));
        }
    }
    else if ((levelNum == 4) && (timer % 80 == 0)) { // Poliwhirl
        for (i = 0; i < 20; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 25)), 10, "blue", 25, 25, poliwhirlIcon));
        }
    }
    else if ((levelNum == 5) && (timer % 80 == 0)) { // Gyrados
        for (i = 0; i < 18; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 35)), 10, "lightblue", 35, 35, gyradosIcon));
        }
    }
    else if ((levelNum == 6) && (timer % 80 == 0)) { // Zapdos
        for (i = 0; i < 15; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 40)), 10, "darkyellow", 40, 40, zapdosIcon));
        }
    }
    else if ((levelNum == 7) && (timer % 80 == 0)) { // Moltres
        for (i = 0; i < 15; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 40)), 10, "red", 40, 40, moltresIcon));
        }
    }
    else if ((levelNum == 8) && (timer % 80 == 0)) { // Articuno
        for (i = 0; i < 15; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 40)), 10, "lightblue", 40, 40, articunoIcon));
        }
    }
    else if ((levelNum == 9) && (timer % 80 == 0)) { // Ho-Oh
        for (i = 0; i < 15; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 50)), 10, "orange", 50, 50, ho_ohIcon));
        }
    }
    else if ((levelNum == 10) && (timer % 80 == 0)) { // Lugia
        for (i = 0; i < 15; i++) {
                enemyArray.push(new Pokemon((Math.random() * (game.width - 50)), 10, "silver", 50, 50, lugiaIcon));
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
    else if (levelNum == 11) {
        game.style.backgroundImage = "url('img/Pikachu Victory.jpeg')";
        victory();
    }
}

// //  KEYBOARD INTERACTION LOGIC 

function movementHandler(e) {
    if ((e.which == 83) && (e.shiftKey) && (player.y < 350)) {
        player.y += 30;
    }
    else if ((e.which == 87) && (e.shiftKey) && (player.y > 20)) {
        player.y -= 30;
    }
    else if ((e.which == 68) && (e.shiftKey) && (player.x < 760)) {
        player.x += 30;
    }
    else if ((e.which == 65) && (e.shiftKey) && (player.x > 20)) {
        player.x -= 30;
    }
    else if ((e.which == 83) && (player.y < 370)) {
        player.y += 10;
    }
    else if ((e.which == 87) && (player.y > 0)) {
        player.y -= 10;
    }
    else if ((e.which == 68) && (player.x < 780)) {
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
    spawnEnemy();
    renderEnemies();
    moveEnemy();
    player.pikarender();
    detectHit();
    lives.textContent = `Lives: ${livesNum}`;
    defeatScreen();
    timer += 1;
}

function defeatScreen() {
    if (livesNum <= 0) {
        levelNum = 0;
        clearCanvas();
        clearInterval(runGame);
        game.style.backgroundImage = "url('img/Pikachu Defeat.png')";
        ctx.font = ("50pt Original Surfer");
        ctx.fillStyle = 'red';
        ctx.fillText("DEFEAT!", 280, 220);
    }
}

function victory() {
    levelNum = 0;
    clearCanvas();
    clearInterval(runGame);
    ctx.font = ("50 pt Original Surfer");
    ctx.fillStyle = 'red';
    ctx.fillText("You WIN!", 280, 220);
}

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
            }
    }
}

// // // EVENT LISTENER
begin.addEventListener("click", function() {
    begin.disabled = true;
    livesNum = 6;
    levelNum = 1;
    timer = 0;
    speed = 5;
    changeScenery();
    player = new Pikachu((game.width/2), 345, "yellow", 20, 20, pikachuIcon);
    document.addEventListener('keydown', movementHandler);
    runGame = setInterval(gameLoop, 60);
})


reset.addEventListener("click", function() {
    clearInterval(runGame);
    livesNum = 6;
    levelNum = 1;
    timer = 0;
    speed = 5;
    player.x = (game.width/2);
    player.y = 345;
    enemyArray = [];
    changeScenery();
    runGame = setInterval(gameLoop, 60);
})
