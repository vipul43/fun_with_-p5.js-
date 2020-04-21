
var drawing  = [];
var currentPath = [];
var isDrawing  = false;
function setup() {
    canvas = createCanvas(1440, 750);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    canvas.parent('canvas-container');
}

function startPath() {
    isDrawing = true
    currentPath = [];
    drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
}

function keyPressed() {
    if (key==' ') {
        drawing = []
    } else if (key=='u') {
        //undo
        drawing.splice(-1, 1)
    }
}
function draw() {
    background(51);
    textSize(32);
    text('DRAW', width/2-80, 40);


    if (isDrawing) {
        var point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i=0; i<drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (var j=0; j<path.length; j++) {
            vertex(path[j].x, path[j].y);
        }
        endShape();
    }
    

}