
let video;
let classifier;
let label='cant detect...😅';

function preload() {
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dNYG3raeN/'+'model.json');
}

function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas-container");

    video = createCapture(VIDEO);
    video.hide()

    classifyVideo();

}

function classifyVideo() {
    classifier.classify(video, gotResults);
}

function gotResults(error, results) {
    if(error){
        console.log(error);
        return;
    }
    if(results[0].confidence>=0.6){
        label = results[0].label + " with confidence " + results[0].confidence;
    } else {
        label = 'cant detect...😅';
    }
    classifyVideo();
}

function draw() {
    background(51);
    image(video, 0, 0);

    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width/2, height-64);

    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255);
    text('MAKE SURE YOU FOLLOW THESE', 900, 46);
    text('POSE IN ADEQUATE LIGHTING CONDITIONS', 900, 76);
    text('STAY STILL TO GET CORRECT DETECTION', 900, 106);
    text('DETECTS SEVEN PERSONS, ONE OF WHICH MIGHT BE YOU', 900, 136);
    text('STAY STILL TO GET CORRECT DETECTION', 900, 166);
    text('IF NO PERSON IS IN THE FRAME THEN IT DETECTS nobody', 900, 196);
    text('CONFIDENCE SCORE OF DETECTION IS ALSO DISPLAYED', 900, 226);
    text('YOU FOLLOWED ALL THESE...STILL NOT DETECTING YOU', 900, 256);
    text('THEN DM ME MORE PICTURES OF YOURS😇', 900, 286);
    text('HAPPY CLASSIFYING👋', 900, 316)
}