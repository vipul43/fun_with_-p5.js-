class Particle {
    constructor() {
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        for(let i=0; i<360; i++){
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }
    update(x, y){
        this.pos.set(x, y);
    }
    look(bounds) {
        for(let ray of this.rays){
            let recordDistance = Infinity;
            let closestPoint = null;
            for(let bound of bounds){
                let point = ray.cast(bound);
                if(point) {
                    let distance = p5.Vector.dist(this.pos, point);
                    if(distance < recordDistance){
                        recordDistance = distance;
                        closestPoint = point;
                    }
                }
            }
            if(closestPoint){
                stroke(255, 255, 255, 90);
                strokeWeight(2);
                line(this.pos.x, this.pos.y, closestPoint.x, closestPoint.y);
            }
        }
    }
    show() {
        stroke(255);
        fill(255);
        ellipse(this.pos.x, this.pos.y, 8, 8);
        for(let ray of this.rays){
            ray.show();
        }
        // ray.show();
        // ray.lookAt(mouseX, mouseY);

        // let point = ray.cast(bound);
        // if(point){
        //     fill(255);
        //     ellipse(point.x, point.y, 8, 8);
        // }
    }
}