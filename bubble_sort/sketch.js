

var values = [];
var a=0;
var flag = true;
var framrate_slider;
var w = 10;


function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas-container");

    input = createInput();
    input.parent("input-container");
    input.changed(getWidthAndValues);
    framrate_slider = createSlider(1, 30, 10, 1);
    framrate_slider.parent('slider-container');
}

function getWidthAndValues() {
    w = int(input.value());
    values.splice(0, values.length);
    for (var i=0; i < width/w; i++) {
        values.push(random(height));
    }
    a = 0;
    b = 0;
    loop();
}
function keyPressed() {
    if (key == ' ' && flag) {
        noLoop();
        flag = false;
    } else if (key == ' ' && !flag) {
        loop();
        flag = true;
    }
}

function draw() {
    background(0);
    frameRate(framrate_slider.value());
    if (a < values.length) {
        for (var b=0; b < values.length-a-1; b++) {
            if(values[b] > values[b+1]) {
                swap(values, b, b+1)
            }
        }
        a++;
    } else {
        noLoop();
    }

    for (var i=0; i < values.length; i++) {
        rect(i*w, height-values[i], w, values[i]);
    }
}

function swap(arr, x, y) {
    var temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}