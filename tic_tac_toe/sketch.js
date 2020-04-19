let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
var players = ['X', 'O'];
var available = [];
var indices = [];
//game always begins with 'X' player 
var currentPlayerIndex = 0;
function setup() {
    createCanvas(500, 500);
    for (var j=0; j<3; j++) {
        for (var i=0; i<3; i++) {
            available.push([i, j]);     
        }
    }
}

function nextTurn(index) {
    //select --> j, i
    // choosing the index by keyboard keys q, w, e, a, s, d, z, x, c
    if (!indices.includes(index)) {
        var spot = available[index];
        //useful to check for the winning, tie conditions

        var i = spot[0];
        var j = spot[1];
        board[i][j] = players[currentPlayerIndex];
        currentPlayerIndex = (currentPlayerIndex+1)%players.length;
        indices.push(index);
    }

}

function keyPressed() {
    if(key == 'q') {
        nextTurn(0);
    } else if (key == 'w') {
        nextTurn(3);
    } else if (key == 'e') {
        nextTurn(6);
    } else if (key == 'a') {
        nextTurn(1);
    } else if (key == 's') {
        nextTurn(4);
    } else if (key == 'd') {
        nextTurn(7);
    } else if (key == 'z') {
        nextTurn(2);
    } else if (key == 'x') {
        nextTurn(5);
    } else if (key == 'c') {
        nextTurn(8);
    }
    
}

function equals(a, b, c) {
    if (a==b && b==c && a!='') {
        return true;
    }
    return false;
}
function checkWinner() {
    var winner  = null;
    //horizontal checking
    for (var i=0; i<3; i++) {
        if (equals(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }
    //vertical checking
    for (var i=0; i<3; i++) {
        if (equals(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }
    //diagonal checking
    if(equals(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if(equals(board[0][2], board[1][1], board[2][0])) {
        winner = board[0][2];
    }
    //tie checking
    if(winner==null && indices.length==9) {
        return 'TIE'
    } else {
        return winner;
    }
}
function draw() {
    background(200);
    var w = width/3;
    var h = height/3;
    strokeWeight(4);
    //drawing board
    //vertical lines
    line(w, 0, w, 3*h);
    line(2*w, 0, 2*w, 3*h);
    //horizontal lines
    line(0, h, 3*w, h);
    line(0, 2*h, 3*w, 2*h);

    for (var j=0; j<3; j++) {
        for (var i=0; i<3; i++) {
            //moving x, y to the center of spot i.e. wxh box
            var x = i * w + w/2;
            var y = j * h + h/2;
            var spot = board[j][i];
            if(spot == players[0]) {
                //draw a 'X' on the canvas 
                //line from top-left to bottom-right of the spot
                var r = w/4;
                line(x-r, y+r, x+r, y-r);
                //line from bottom-left to top-right of the spot
                line(x-r, y-r, x+r, y+r);
            } else if(spot == players[1]) {
                //draw a 'O' on the canvas
                //draw circle with center x, y which is also
                //center of the square and radius w/2 or h/2
                noFill();
                ellipse(x, y, w/2);
            }
        }
    }
    var result = checkWinner();
    if (result != null) {
        noLoop();
        createP(result).style('color', '0').style('font-size', '32pt');
        console.log(result);
    }

}