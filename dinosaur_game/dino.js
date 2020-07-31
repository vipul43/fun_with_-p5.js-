class Dino{
    constructor() {
        this.r = 50;
        this.x = this.r;
        this.y = height-(this.r/2);
        this.vy=0;
        this.gravity=2;
    }
    jump() {
        if(this.y==height-(this.r/2)){
            this.vy=-30;
        }
    }
    hits(obstacle) {
        return collideRectRect(this.x, this.y, this.r/2, this.r/2, obstacle.x, obstacle.y, obstacle.r/2, obstacle.r/2);
    }
    move() {
        this.y+=this.vy;
        this.vy+=this.gravity;
        this.y=constrain(this.y, this.r/2, height-(this.r/2));
    }
    moveRight() {
        this.x+=50;
        this.x=constrain(this.x, this.r/2, width-(this.r/2));
    }
    moveLeft() {
        this.x-=50;
        this.x=constrain(this.x, this.r/2, width-(this.r/2));
    }
    show() {
        circle(this.x, this.y, this.r);
        // rect(this.x, this.y, this.r, this.r);
    }
}