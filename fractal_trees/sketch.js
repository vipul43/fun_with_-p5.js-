var len = 100;
function setup() {
  // put setup code here
  createCanvas(700, 700);
  slider = createSlider(0, TWO_PI, PI/6, 0.01);
}

function draw() {
  // put drawing code here
  // textAlign(CENTER, TOP);
  var angle = slider.value();
  background(51);
  fill(255);
  textSize(26);
  textAlign(CENTER, TOP);
  text("FRACTAL TREE", 350, 50);
  textSize(14);
  textAlign(LEFT);
  text("angle: ", 40, 100);
  text((180/PI)*angle, 60, 120);
  stroke(255);
  translate(350, height)
  fractalTree(len, angle);
}

//fractal tree construction recursion function
function fractalTree(len, angle) {
  if(len > 5) {
    line(0, 0, 0, -len);
    translate(0, -len);
    push();
    rotate(angle);
    fractalTree(len*0.8, angle);
    pop();
    push();
    rotate(-angle);
    fractalTree(len*0.8, -angle);
    pop();
  }
}