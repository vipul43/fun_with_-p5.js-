let data;
let model;
let labelList = [
  "red-ish",
  "green-ish",
  "blue-ish",
  "orange-ish",
  "yellow-ish",
  "pink-ish",
  "purple-ish",
  "brown-ish",
  "grey-ish",
];

let xs;
let ys;
let lossP;
let vallossP;
let labelP;
let epochP;
let statusP;
let rslider, gslider, bslider;

function preload() {
  const url =
    "https://gist.githubusercontent.com/vipul43/ee3e46d5057c9fa4ab32279c458dac8a/raw/db5a5ee837c90174ad89cd3c99889cb25ab45d7e/colorData.json";
  data = loadJSON(url);
}

function setup() {
  canvas = createCanvas(600, 400);
  canvas.parent("canvas-container");

  statusP = createP("Status");
  lossP = createP("Training Loss");
  vallossP = createP("Validation Loss");
  epochP = createP("Epoch");
  labelP = createP("Prediction");

  rslider = createSlider(0, 255, 255);
  gslider = createSlider(0, 255, 255);
  bslider = createSlider(0, 255, 0);

  // getting data
  let colors = [];
  let labels = [];
  for (let record of data.entries) {
    let col = [record.r / 255, record.g / 255, record.b / 255];
    colors.push(col);
    labels.push(labelList.indexOf(record.label));
  }

  xs = tf.tensor2d(colors);
  let labelstensor = tf.tensor1d(labels, "int32");
  ys = tf.oneHot(labelstensor, 9);
  labelstensor.dispose();

  // Building model
  model = tf.sequential();
  let hidden = tf.layers.dense({
    inputShape: [3],
    units: 16,
    activation: "sigmoid",
  });
  model.add(hidden);
  let output = tf.layers.dense({
    units: 9,
    activation: "softmax",
  });
  model.add(output);

  let learning_rate = 0.2;
  let optimizer = tf.train.sgd(learning_rate);

  model.compile({
    optimizer: optimizer,
    loss: "categoricalCrossentropy",
  });
  train().then((results) => {
    console.log(results.history.loss);
  });
}

async function train() {
  const options = {
    epochs: 5,
    validationSplit: 0.1,
    shuffle: true,
    callbacks: {
      onTrainBegin: () => statusP.html("training..."),
      onTrainEnd: () => statusP.html("trained"),
      onBatchEnd: tf.nextFrame,
      onEpochEnd: (num, logs) => {
        epochP.html("Epoch: " + num);
        lossP.html("Training Loss: " + logs.loss);
        vallossP.html("Validation Loss: " + logs.val_loss);
      },
    },
  };
  return await model.fit(xs, ys, options);
}

function draw() {
  let r = rslider.value();
  let b = bslider.value();
  let g = gslider.value();
  background(r, g, b);

  tf.tidy(() => {
    const xs = tf.tensor2d([[r / 255, g / 255, b / 255]]);
    let results = model.predict(xs);
    let index = results.argMax((axis = 1)).dataSync()[0];
    labelP.html("Prediction:" + labelList[index]);
  });
}
