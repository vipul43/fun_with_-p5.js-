class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir =p5.Vector.fromAngle(angle);
    }
    show() {
        stroke(255, 255, 255, 10);
        strokeWeight(2);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 20, this.dir.y * 20);
        pop();
    }
    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }
    cast(bound) {
        let x1 = bound.a.x;
        let y1 = bound.a.y;
        let x2 = bound.b.x;
        let y2 = bound.b.y;

        let x3 = this.pos.x;
        let y3 = this.pos.y;
        let x4 = this.pos.x + this.dir.x;
        let y4 = this.pos.y + this.dir.y;

        let denom = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
        if(denom==0){
            return;
        }
        let t = (x1-x3)*(y3-y4) - (y1-y3)*(x3-x4); t/=denom;
        let u = (x1-x2)*(y1-y3) - (y1-y2)*(x1-x3); u/=denom; u*=-1;
        if(t>0 && t<1 && u>0) {
            let retPoint = createVector();
            retPoint.x = x1 + t*(x2-x1);
            retPoint.y = y1 + t*(y2-y1);
            return retPoint;
        } else {
            return;
        }
    }
}