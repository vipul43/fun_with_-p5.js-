const train_xs = tf.tensor2d([
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
]);
const train_ys = tf.tensor2d([[0], [1], [1], [0]]);

let model;
let resolution = 25;
let cols;
let rows;
let xs;

function setup() {
  canvas = createCanvas(700, 700);
  canvas.parent("canvas-container");

  cols = width / resolution;
  rows = height / resolution;

  let inputs = [];
  for (var i = 0; i < cols; ++i) {
    for (var j = 0; j < rows; ++j) {
      let x = i / cols;
      let y = j / rows;
      inputs.push([x, y]);
    }
  }
  xs = tf.tensor2d(inputs);

  model = tf.sequential();
  const hidden = tf.layers.dense({
    inputShape: [2],
    units: 16,
    activation: "sigmoid",
  });
  model.add(hidden);
  const output = tf.layers.dense({
    units: 1,
    activation: "sigmoid",
  });
  model.add(output);

  const optimizer = tf.train.adam(0.2);
  model.compile({
    optimizer: optimizer,
    loss: "meanSquaredError",
  });
  setTimeout(train, 10);
}

function draw() {
  background(51);

  tf.tidy(() => {
    let ys = model.predict(xs);
    let yvals = ys.dataSync();

    let index = 0;
    for (var i = 0; i < cols; ++i) {
      for (var j = 0; j < rows; ++j) {
        let br = yvals[index] * 255;
        fill(br);
        rect(i * resolution, j * resolution, resolution, resolution);
        fill(255 - br);
        textSize(8);
        textAlign(CENTER, CENTER);
        text(
          nf(yvals[index], 1, 2),
          i * resolution + resolution / 2,
          j * resolution + resolution / 2
        );
        index++;
      }
    }
  });
}

function trainModel() {
  return model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 1,
  });
}

function train() {
  trainModel().then((result) => {
    // console.log(result.history.loss[0]);
    setTimeout(train, 10);
  });
}
