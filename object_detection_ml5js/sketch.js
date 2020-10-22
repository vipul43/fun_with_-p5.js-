let img;
let detector;
function preload() {
  img = loadImage("https://raw.githubusercontent.com/vipul43/fun_with_-p5.js-/master/object_detection_ml5js/dog.jpg");
  // detector = ml5.objectDetector('cocossd');
  // console.log(detector);
}

function setup() {
  canvas = createCanvas(1200, 600);
  canvas.parent("canvas-container");
  image(img, 0, 0);
}

// function draw() {
//   background(51);
// }
