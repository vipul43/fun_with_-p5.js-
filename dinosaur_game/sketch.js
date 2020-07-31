
let dino;
let dImg;
let oImg;
let bImg;
let obstacles = [];
let soundClassifier;
let score=0;

function preload() {
    // dImg = loadImage('dino.png');
    // oImg = loadImage('cactus.jpg');
    // bImg = loadImage('dino_background.jpg');
    const options = { probabilityThreshold: 0.90 };
    soundClassifier=ml5.soundClassifier('SpeechCommands18w');
}

function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas-container");
    dino = new Dino();
    soundClassifier.classify(gotCommand);
}
function gotCommand(error, results) {
    if(error){
        console.error('error');
    }
    if(results[0].label=='up'){
        dino.jump();
    }
    if(results[0].label=='right'){
        dino.moveRight();
    }
    if(results[0].label=='left'){
        dino.moveLeft();
    }
    results.splice(0, results.length);
}
function keyPressed() {
    if(key==' '){
        dino.jump();
    }
    if(keyCode==LEFT_ARROW){
        dino.moveLeft();
    }
    if(keyCode==RIGHT_ARROW){
        dino.moveRight();
    }
}
function displayGameOverScreen() {
    textSize(128);
    textAlign(CENTER, CENTER);
    fill(0);
    text('GAME OVER', 600, 20+300);
}
function displayScore(score) {
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(140);
    text("Score: "+score.toString(), 1000, 20);
}
function updateScore(obstacle, dino){
    if(obstacle.x>dino.x){
        score+=1;
    }
}
function draw() {
    if(random(1)<0.005){
        obstacles.push(new Obstacle());
    }
    background(220);
    noStroke();
    fill(255, 0, 0);
    for(let o of obstacles){
        o.move();
        o.show();
        if(dino.hits(o)){
            displayGameOverScreen();
            noLoop();
        } else {
            updateScore(o, dino);
        }
    }
    displayScore(score);
    fill(random(0, 256), random(0, 256), random(0, 256));
    dino.show();
    dino.move();
}