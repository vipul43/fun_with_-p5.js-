class Obstacle {
    constructor() {
        this.r = 50;
        this.x = width;
        this.y = height - (this.r/2);
    }
    move() {
        this.x-=10;

    }
    show() {
        circle(this.x, this.y, this.r);
    }
}