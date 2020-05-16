

var values = [];


function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas-container");
    for (var i=0; i < width; i++) {
        values.push(random(height));
    }
}

function draw() {
    background(0);
    for (var i=0; i < values.length; i++) {
        stroke(255);
        line(i, height, i, height-values[i]);
    }

}