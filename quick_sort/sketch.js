

var values = [];
var flag = true;
w = 7;

function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas-container");

    for (var i=0; i < width/w; i++) {
        values.push(random(height));
    }
    quickSort(values, 0, values.length-1);
}

async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    } 
    var index = await partition(arr, start, end);
    await quickSort(arr, start, index-1);
    await quickSort(arr, index+1, end);
}

async function partition(arr, start, end) {
    var pivot_index = start;
    var pivot_value = arr[end];
    for (var i=start; i<end; i++) {
        if (arr[i] < pivot_value) {
            await swap(arr, i, pivot_index);
            pivot_index++;
        }
    }
    await swap(arr, pivot_index, end);
    return pivot_index;
}

function draw() {
    background(0);

    for (var i=0; i < values.length; i++) {
        rect(i*w, height-values[i], w, values[i]);
    }
}

async function swap(arr, x, y) {
    await sleep(20);
    var temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}