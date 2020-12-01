let points = [];
let num = 20;
let leftPoint, currPoint, checkingIndex, nextIndex=-1;
let hull = [];
function setup() {
  canvas = createCanvas(1200, 600);
  canvas.parent("canvas-container");

  for(let i=0; i<num; i++){
    points.push(createVector(random(width), random(height)));
  }
  points.sort((a,b) => {
    return a.x - b.x;
  })
  leftPoint = points[0];
  currPoint = leftPoint;
  hull.push(currPoint);

  nextPoint = points[1];
  checkingIndex = 2;
}

function draw() {
  background(0);

  //draw points
  stroke(255);
  strokeWeight(8);
  for(let i=0; i<points.length; i++){
    point(points[i].x, points[i].y);
  }

  //draw hull
  stroke(255, 0, 255);
  fill(255, 255, 255, 50);
  beginShape();
  for(let i=0; i<hull.length; i++){
    vertex(hull[i].x, hull[i].y);
  }
  endShape(CLOSE);

  //draw leftmost point
  stroke(255, 0, 0);
  point(leftPoint.x, leftPoint.y);

  //draw current point
  stroke(255, 0, 255);
  strokeWeight(20);
  point(currPoint.x, currPoint.y);

  stroke(0, 255, 0);
  strokeWeight(3);
  line(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y);

  stroke(255);
  let checkingPoint = points[checkingIndex];
  line(currPoint.x, currPoint.y, checkingPoint.x, checkingPoint.y);

  // let vectorA = p5.Vector.sub(nextPoint-currPoint);
  let vectorA = createVector(nextPoint.x-currPoint.x, nextPoint.y-currPoint.y);
  // let vectorB = p5.Vector.sub(checkingPoint-currPoint);
  let vectorB = createVector(checkingPoint.x-currPoint.x, checkingPoint.y-currPoint.y);
  let cross = vectorA.cross(vectorB);
  if(cross.z < 0){
    nextPoint = checkingPoint;
    nextIndex = checkingIndex;
  }
  checkingIndex++;
  if(checkingIndex===points.length){
    if(nextPoint === leftPoint){
      noLoop();
    }
    hull.push(nextPoint);
    currPoint = nextPoint;
    checkingIndex = 0;
    nextPoint = leftPoint;
  }
}
