let allPoints = [];
let epsilon = 0;

function setup() {
  canvas = createCanvas(1200, 600);
  canvas.parent("canvas-container");

  //collecting e^(-x) * cos(2*pi*x) graph
  for(let x=0; x<width; x++){
    let xval = map(x, 0, width, 0, 5);
    let yval = exp(-xval) * cos(TWO_PI*xval);
    let y = map(yval, -1, 1, height, 0);
    allPoints.push(createVector(x, y));
  }
}

function draw() {
  background(0);

  let rdpPoints = [];
  let startIndex = 0;
  let endIndex = allPoints.length -1;
  let startPoint = allPoints[startIndex];
  let endPoint = allPoints[endIndex];
  rdpPoints.push(startPoint);
  rdp(startIndex, endIndex, rdpPoints);
  rdpPoints.push(endPoint);

  epsilon += 0.01;
  if(epsilon > 100){
    noLoop();
  }

  //drawing e^(-x) * cos(2*pi*x) graph
  stroke(255, 0, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(let p of allPoints){
    vertex(p.x, p.y);
  }
  endShape();

  //drawing rdp line simplified graph
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(let p of rdpPoints){
    vertex(p.x, p.y);
  }
  endShape();

  //displaying epsilon and #rdp Points
  fill(255);
  noStroke();
  textSize(24);
  text('epsilon: ' + nf(epsilon, 2, 2), 20, 25);
  text('n: ' + rdpPoints.length, 20, 50);
}

function findFurthestPoint(points, a, b){
  let furthestDistance = -1;
  let furthestIndex = -1;
  let startPoint = points[a];
  let endPoint = points[b];
  for(let i=a+1; i<b; i++){
    let distance = perpLineDist(points[i], startPoint, endPoint);
    if(distance > furthestDistance){
      furthestDistance = distance;
      furthestIndex = i;
    }
  }
  if(furthestDistance > epsilon){
    return furthestIndex;
  } else {
    return -1;
  }
}

function perpLineDist(pointC, pointA, pointB){
  let normalPoint = scalarProjection(pointC, pointA, pointB);
  return p5.Vector.dist(pointC, normalPoint);
}

function rdp(startIndex, endIndex, rdpPoints){
  let nextIndex = findFurthestPoint(allPoints, startIndex, endIndex);
  if (nextIndex > 0) {
    if (startIndex != nextIndex) {
      rdp(startIndex, nextIndex, rdpPoints);
    }
    rdpPoints.push(allPoints[nextIndex]);
    if (endIndex != nextIndex) {
      rdp(nextIndex, endIndex, rdpPoints);
    }
  }
}

function scalarProjection(pointP, pointA, pointB){
  let ap = createVector(pointP.x-pointA.x, pointP.y-pointA.y);
  let ab = createVector(pointB.x-pointA.x, pointB.y-pointA.y);
  ab.normalize();
  ab.mult(ap.dot(ab));
  let normalPoint = createVector(pointA.x+ab.x, pointA.y+ab.y);
  return normalPoint;
}
