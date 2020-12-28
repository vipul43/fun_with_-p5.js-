let doodleClassifier;
let resultsDiv;

function setup() {
  canvas = createCanvas(400, 400);
  // canvas.parent("canvas-container");
  clearCanvas();
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv('model loading...');
}

function draw() {
  if(mouseIsPressed){
    stroke(0);
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function clearCanvas(){
  background(255);
  noFill();
  stroke(0);
  strokeWeight(1);
  square(0, 0, 400);
}

function keyPressed(){
  if(key==' '){
    clearCanvas();
  }
}

function modelReady(){
  console.log('Doodle Net model is loaded');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results){
  if(error){
    console.log(error);
    return;
  }
  let displayResults = `${results[0].label} ${nf(100*results[0].confidence, 2, 1)}%<br/>${results[1].label} ${nf(100*results[1].confidence, 2, 1)}%`
  resultsDiv.html(displayResults);
  doodleClassifier.classify(canvas, gotResults);
}
