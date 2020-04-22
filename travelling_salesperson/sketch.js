var cities = [];
var total_cities = 10;
var size_of_node = 8;
var flag = true;
var recordDistance;
var bestEver;

var percent;

var framerate_slider;

var order = [];

var total_permutations = 0; 
var count = 1;

function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent('canvas-container');

    framerate_slider = createSlider(1, 60, 20, 2);
    framerate_slider.position(120, 740);
    framerate_slider.parent('slider-container');

    for (var i=0; i<total_cities; i++) {
        var v = createVector(floor(random(width/2)), floor(random(height)));
        cities.push(v);
        order.push(i);
    }
    
    var d = calcPathDistance(cities, order);
    recordDistance = d;
    bestEver = order.slice();

    total_permutations = factorial(total_cities);

}

function keyPressed() {
    if(key==' ' && flag && (percent!=100)){
        noLoop();
        flag = false;
    } else if (key==' ' && !flag && (percent!=100)) {
        loop();
        flag = true;
    }
}

function draw() {
    frameRate(framerate_slider.value());
    console.log(framerate_slider);

    background(0);

    displayPercent(count);

    //drawing vertices
    stroke(255);
    strokeWeight(5);
    fill(255);
    for (var i=0; i<cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, size_of_node, size_of_node);
    }

    //drawing edges
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (var i=0; i<order.length; i++) {
        var ind = order[i];
        vertex(cities[ind].x, cities[ind].y);
    }
    endShape();


    // drawing edges of best possible path so far
    translate(width/2, 0);

    line(0, 0, 0, height);

    strokeWeight(5);
    stroke(255, 0 ,255);
    fill(255);
    for (var i=0; i<cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, size_of_node, size_of_node);
    }

    stroke(255, 0, 255);
    noFill();
    beginShape();
    for (var i=0; i<order.length; i++) {
        var ind = bestEver[i];
        vertex(cities[ind].x, cities[ind].y);
    }
    endShape();

    var d = calcPathDistance(cities, order);
    if (d < recordDistance) {
        recordDistance = d;
        bestEver = order.slice();
        console.log(recordDistance);
    }
    displayBestDistance(recordDistance);

    count++;
    nextOrder();

}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j]
    a[j] = temp;
}

function calcPathDistance(points, order) {
    var sum = 0;
    for (var i=0; i<order.length-1; i++) {
        var cityA = points[order[i]];
        var cityB = points[order[i+1]];
        d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum+=d;
    }
    return sum;
}

function nextOrder() {
    //getting permutations in lexicograhic order
    //STEP-1
    var largestI = -1;
    for (var i=0; i<order.length-1; i++) {
        if (order[i]<order[i+1]) {
            largestI = i;
        }
    }
    if(largestI===-1) {
        noLoop();
        console.log('FINISHED');
    }
    //STEP-2
    var largestJ = -1;
    for (var j=0; j<order.length; j++) {
        if (order[largestI]<order[j]) {
            largestJ = j;
        }
    }
    //STEP-3
    swap(order, largestI, largestJ);
    //STEP-4
    var endArray = order.splice(largestI+1);
    endArray.reverse();
    order = order.concat(endArray);

}

function factorial(n) {
    if (n===1) {
        return 1;
    } else {
        return n*factorial(n-1);
    }
}

function displayPercent(count) {
    stroke(255);
    strokeWeight(1);
    textSize(24);
    fill(255);
    percent = 100 * (count/total_permutations);
    text(nf(percent, 0, 4) + "% completed", 0, 24);
}

function displayBestDistance(a) {
    stroke(255);
    strokeWeight(1);
    textSize(24);
    fill(255);
    text(nf(a, 0, 4) + "px best path", 0, 24);
}