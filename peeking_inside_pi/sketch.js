let pi_million, digits, searchBox, indexP;
function preload(){
  pi_million = loadStrings('https://raw.githubusercontent.com/CodingTrain/website/main/CodingChallenges/CC_156_Pi_Digits/P5/pi-million.txt');
}

function setup() {
  // canvas = createCanvas(1200, 600);
  // canvas.parent("canvas-container");
  noCanvas();
  digits = pi_million[0];
  searchBox = createInput('');
  searchBox.input(searchInDigits);
  indexP = createP('Try entering non-negative integers');
}

function indexOf(pattern, string){
  //search pattern in string and return its index if it exists, else return -1;
  let start = pattern.charAt(0);
  for(let i=0; i<string.length; ++i){
    if(string.charAt(i)===start){
      let found = true;
      for(let j=1; j<pattern.length; ++j){
        if(string.charAt(i+j)!==pattern.charAt(j)){
          found = false;
          break;
        }
      }
      if(found){
        return i;
      }
    }
  }
  return -1;
}

function searchInDigits(){
  indexP.html('Searching...');
  let pattern = searchBox.value();
  // let index = digits.indexOf(pattern);
  let index = indexOf(pattern, digits);
  if(index!=-1){
    indexP.html(index-1);
  } else {
    indexP.html("Not Found");
  }
}