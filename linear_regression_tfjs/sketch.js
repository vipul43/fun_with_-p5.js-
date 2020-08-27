let xs = [];
let pxs = [];
let ys = [];
let pys = [];
let m, b;
let pa, pb, pc, pd;

const learningRate = 0.5;
const plearningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);
const poptimizer = tf.train.adam(learningRate);

function setup() {
  canvas = createCanvas(1200, 600);
  canvas.parent("canvas-container");

  //linear regression
  m = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));
  //polynomial regression
  pa = tf.variable(tf.scalar(random(-1, 1)));
  pb = tf.variable(tf.scalar(random(-1, 1)));
  pc = tf.variable(tf.scalar(random(-1, 1)));
  pd = tf.variable(tf.scalar(random(-1, 1)));
}

function draw() {
  tf.tidy(() => {
    if (xs.length > 0) {
      const tfys = tf.tensor1d(ys);
      optimizer.minimize(() => loss(predict(xs), tfys));
    }
    if (pxs.length > 0) {
      const ptfys = tf.tensor1d(pys);
      poptimizer.minimize(() => loss(poly_predict(pxs), ptfys));
    }
  });

  background(51);
  titleDraw();
  strokeWeight(4);
  line(width / 2, 0, width / 2, height);

  stroke(255);
  strokeWeight(8);
  for (var i = 0; i < xs.length; ++i) {
    let x = map(xs[i], -1, 1, 0, width / 2);
    let y = map(ys[i], -1, 1, height, 0);
    point(x, y);
  }
  for (var i = 0; i < pxs.length; ++i) {
    let x = map(pxs[i], -1, 1, width / 2, width);
    let y = map(pys[i], -1, 1, height, 0);
    point(x, y);
  }

  // linear drawing
  const xvals = [-1, 1];
  const yvals = tf.tidy(() => predict(xvals));
  let x1 = map(xvals[0], -1, 1, 0, width / 2);
  let x2 = map(xvals[1], -1, 1, 0, width / 2);
  let y1 = map(yvals.dataSync()[0], -1, 1, height, 0);
  let y2 = map(yvals.dataSync()[1], -1, 1, height, 0);
  yvals.dispose();
  strokeWeight(2);
  line(x1, y1, x2, y2);

  //polynomial drawing
  const curveX = [];
  for (var x = -1; x <= 1; x += 0.05) {
    curveX.push(x);
  }
  const pyvals = tf.tidy(() => poly_predict(curveX));
  const curveY = pyvals.dataSync();
  pyvals.dispose();
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for (var i = 0; i < curveX.length; ++i) {
    let x = map(curveX[i], -1, 1, width / 2, width);
    let y = map(curveY[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width / 2 && mouseY >= 0 && mouseY <= height) {
    let x = map(mouseX, 0, width / 2, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    xs.push(x);
    ys.push(y);
  }
  if (
    mouseX >= width / 2 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    let x = map(mouseX, width / 2, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    pxs.push(x);
    pys.push(y);
  }
}

function predict(xs) {
  const tfxs = tf.tensor1d(xs);
  const ys = tfxs.mul(m).add(b);
  return ys;
}

function poly_predict(pxs) {
  const tfpxs = tf.tensor1d(pxs);
  const ys = tfpxs
    .pow(tf.scalar(3))
    .mul(pa)
    .add(tfpxs.square().mul(pb))
    .add(tfpxs.mul(pc))
    .add(pd);
  return ys;
}
function loss(pred, label) {
  return pred.sub(label).square().mean();
}

function titleDraw() {
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(255);
  strokeWeight(1);
  text("LINEAR REGRESSION", width / 4, 24);
  text("POLYNOMIAL REGRESSION", (3 / 4) * width, 24);
}
