class Block {
    constructor(x, w, v, m, constraint){
        this.x = x;
        this.y = height-w;
        this.w = w;
        this.v = v;
        this.m = m;
        this.xConstraint = constraint;
    }
    hitWall() {
        return (this.x <= 0);
    }
    reverse() {
        this.v *= -1;
    }
    collide(other) {
        return !(this.x + this.w < other.x || this.x > other.x + other.w);
    }
    bounce(other){
        //this -> 1
        //other -> 2
        let sumM = this.m + other.m;
        let newV = (((this.m - other.m)/sumM) * this.v)+ (((2*other.m)/sumM) * other.v)
        return newV;
    }
    update() {
        this.x += this.v;
    }
    show(){
        const x = constrain(this.x, this.xConstraint, width);
        image(block, x, this.y, this.w, this.w);
    }
}