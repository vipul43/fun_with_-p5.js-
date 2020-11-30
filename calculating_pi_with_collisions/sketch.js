let block, sound;
let block1, block2;
let count = 0, digits=3;
let timeSteps;
function preload(){
  block = loadImage('https://raw.githubusercontent.com/CodingTrain/website/main/CodingChallenges/CC_139_Pi_Collisions/P5/block.png');
  sound = loadSound('https://raw.githubusercontent.com/CodingTrain/website/main/CodingChallenges/CC_139_Pi_Collisions/P5/clack.wav');
}
function setup() {
  canvas = createCanvas(1200, 600);
  canvas.parent("canvas-container");

  timeSteps = min(pow(10, digits-1), 50000000);
  let m2 = pow(100, digits-1);
  block1 = new Block(100, 20, 0, 1, 0);
  block2 = new Block(200, 150, -5.0/timeSteps, m2, 20);

  countDiv = createDiv(count);
  countDiv.style('font-size', '72pt');
}

function draw() {
  background(51);
  let isThereSound = false;
  for(let i=0; i<timeSteps; i++){
    if(block1.collide(block2)){
      let v1 = block1.bounce(block2);
      let v2 = block2.bounce(block1);
      block1.v = v1;
      block2.v = v2;
      isThereSound = true;
      count++;
    }
    if(block1.hitWall()){
      block1.reverse();
      isThereSound = true;
      count++;
    }
    block1.update();
    block2.update();
  }
  if(isThereSound){
    sound.play();
  }
  block1.show();
  block2.show();

  countDiv.html(nf(count, digits));
}
