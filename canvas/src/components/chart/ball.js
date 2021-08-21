import {
    // sin,
    // cos,
    pow,
    sqrt,
} from './utilBall';

// const PI = 3.1415;
// const downSpeed = 0.5;
const G = 9
class Ball {
    constructor(o) {
        this.option = o;
        this.ctx = o.ctx; // 画布
        this.width = o.width; // 画布宽
        this.height = o.height; // 画布高
        this.color = o.color || '#37C2BC'; // 颜色数组
        this.x = o.x || 60;
        this.y = o.y || 60;
        this.r = o.r || 20;
        this.speed = o.speed|| 140;
        this.speedVec = o.speedVec || [20, 20];
        this.speedX = this.speed * this.speedVec[1] / sqrt(pow(this.speedVec[0], 2) + pow(this.speedVec[1], 2));
        this.speedY = -this.speed * this.speedVec[0] / sqrt(pow(this.speedVec[0], 2) + pow(this.speedVec[1], 2));
        this.num = 20
        this.animationConfig = { // 动画配置参数
            frames: 60, // 帧率
            step: 2, // 步长
            timer: null, // requestAnimation对象
        };
        this.sumT = 0;
        this.animationConfig.step = 1 / this.animationConfig.frames;
        this.init();
    }
    init() {
        this.animation(this.ctx)
        // this.draw(this.ctx)
    }
    draw(ctx) {
        ctx.clearRect(0, 0, this.option.width, this.option.height);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0,830)
        ctx.lineTo(2200,830)
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
        
        ctx.closePath();
    }
    updateX(x, t) {
        if(this.num<0) {
            this.speedX = this.speedX>0?this.speedX-1:0
        }
        return x + this.speedX * t
    }
    updateY(y, t) {
        if(this.num<0){
            return y
        }
        this.moveY = this.speedY * t + 1 / 2 * G * pow(this.sumT, 2)
        this.sumT += t
        return y + this.moveY
    }
    update(ctx) {
        this.x = this.updateX(this.x,0.016);
        this.y = this.updateY(this.y,0.016);
        this.draw(ctx);
    }
    animation(ctx) {
        if((this.y+this.r)>830 && this.moveY > 0) {
            this.y = 830-this.r;
            this.speedY = -this.sumT*G*this.num
            this.num-=4
            this.sumT = 0;
        }
        this.update(ctx);
        this.animationConfig.timer = setTimeout(() => {
            this.animation(ctx);
        }, 1000/60);
    }
}
export {
    Ball
};
