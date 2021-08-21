import {
    // sin,
    // cos,
    // pow,
    // sqrt,
} from '../../utilBall';
class Ball {
    constructor(o) {
        this.option = o; // 传入的全部参数
        this.ctx = o.ctx; // 画布
        this.width = o.width; // 画布宽
        this.height = o.height; // 画布高
        this.color = o.color || '#37C2BC'; // 颜色数组
        this.x = 0; // 圆心X坐标
        this.y = 0; // 圆心Y坐标
        this.r = 20; // 半径
        this.timer = null
        this.num = 0
        this.init();
    }
    init() {
        this.animation(this.ctx)
    }
    draw(ctx) {
        ctx.clearRect(0, 0, this.option.width, this.option.height);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }
    update(ctx) {
        this.x = this.x + 1;
        this.y = this.y + 1;
        this.draw(ctx);
    }
    animation(ctx) {
        this.update(ctx);
        this.timer = setTimeout(() => {
            this.animation(ctx);
        }, 1000 / 60);
    }
}
export {
    Ball
};
