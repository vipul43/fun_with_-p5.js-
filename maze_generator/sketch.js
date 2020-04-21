var cols;
var rows;
var w = 20; //dim of each cell
var grid = [];
var current;
var stack = [];

function setup() {
    canvas = createCanvas(680, 680);
    canvas.parent('canvas-container');
    //total cols and rows in the maze
    cols = floor(width/w);
    rows = floor(height/w);

    //array to keep all cells
    for (var j=0; j<rows; j++) {
        for (var i=0; i<cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell)
        }
    }
    current = grid[0];
}
function keyPressed() {
    if (key==' ') {
        noLoop();
    } 
    if (keyCode==UP_ARROW) {
        loop();
    }

}
function draw() {
    background(51);
    //drawing cells
    for (var i=0; i<grid.length; i++) {
        grid[i].show();
    }
    //step-1
    current.visited = true;
    //extra-feature
    current.highlight()
    //step-2-1-1
    var next = current.checkNeighbors();
    if (next) {
        stack.push(current);
        //step-2-1-3
        removeWalls(current, next);
        //step-2-1-4
        next.visited = true;
        current = next;
    } else if (stack.length>0) {
        current = stack.pop();
    }
}
function removeWalls(a, b) {
    var x_diff = a.i - b.i;
    if (x_diff === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x_diff === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y_diff = a.j - b.j;
    if (y_diff === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y_diff === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function index(i, j) {
    if( i<0 || j<0 || i>cols-1 || j>rows-1) {
        return -1;
    }
    return i + j*cols;
}
//constructor function
function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];

    this.visited = false;

    //function to draw one cell
    this.show = function() {
        //position of current cell
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        // rect(x, y, w, w);
        if (this.walls[0]) {
            line(x, y, x+w, y);
        }   
        if (this.walls[1]) {
            line(x+w, y, x+w, y+w);
        }
        if (this.walls[2]) {
           line(x+w, y+w, x, y+w);
        }
        if (this.walls[3]) {
            line(x, y+w, x, y);
        }

        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    }

    this.checkNeighbors = function() {
        var neighbors = [];

        var top = grid[index(i, j-1)]
        var right = grid[index(i+1, j)]
        var bottom = grid[index(i, j+1)]
        var left = grid[index(i-1, j)]

        if(top && !top.visited) {
            neighbors.push(top);
        }
        if(right && !right.visited) {
            neighbors.push(right);
        }
        if(bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if(left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            return random(neighbors);
        } else {
            return undefined;
        }
        
    }

    this.highlight = function() {
        var x = this.i*w;
        var y = this.j*w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);
    }

}