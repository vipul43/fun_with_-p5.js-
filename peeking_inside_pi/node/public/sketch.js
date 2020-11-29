let searchBox, indexP;

function setup() {
  // canvas = createCanvas(1200, 600);
  // canvas.parent("canvas-container");
  noCanvas();
  searchBox = createInput('');
  searchBox.input(searchInDigits);
  indexP = createP('Try entering non-negative integers');
}

function searchInDigits(){
  indexP.html('Searching...');
  let pattern = searchBox.value();
  let url = `http://localhost:3000/pi/${pattern}`;
  loadJSON(url, gotResults);
}

function gotResults(data){
  indexP.html(data.index);
}