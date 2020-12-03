let walls = [];
let particle;
function setup() {
  canvas = createCanvas(1200, 600);
  canvas.parent("canvas-container");

  for(let i=0; i<5; i++) {
    walls.push(new Boundary(random(width), random(height), random(width), random(height)));
  }
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
  particle = new Particle();
}

function draw() {
  background(0);

  for(let wall of walls){
    wall.show();
  }
  particle.show();
  particle.update(mouseX, mouseY);
  particle.look(walls);
}
