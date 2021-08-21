const PI = 3.1415;
function sin(angel) {
    return Math.sin(angel);
}
function cos(angel) {
    return Math.cos(angel);
}
function pow(num, sit) {
    return Math.pow(num,sit);
}
function sqrt(num) {
    return Math.sqrt(num)
}
function getDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
}
function touchFloor(y, floorY) { // 是否碰撞地面
    return y < floorY
}
function getPos(pos, Speed, t) {
    return pos + Speed * t;
}
function getSpeed(speed,slowSpeed,t) {
    return speed -slowSpeed*t
}

export {
    PI,
    getDistance,
    touchFloor,
    getPos,
    sin,
    cos,
    pow,
    sqrt,
    getSpeed,
}