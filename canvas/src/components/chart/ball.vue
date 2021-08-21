<template>
    <div class="canvas-container">
        <div class="canvas-content">
            <canvas
                :id="id"
                class="canvas-item"
                :style="`width:${width}px;height:${height}px`"
                :width="canvasWidth"
                :height="canvasHeight"
                @mousedown="() => {}"
                @mouseup="() => {}"
                @mousemove="() => {}"
            />
        </div>
    </div>
</template>

<script>
import { Ball } from './ball';

export default {
    name: 'BarLineGroup',
    props: {
        option: {
            type: Object,
            default: () => ({}),
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            id: Math.random().toString(36).substr(2),
            context: {},
            canvasWidth: this.width,
            canvasHeight: this.height,
            chart: null,
            ratio: 1,
        };
    },
    async mounted() {
        const canvas = document.getElementById(this.id);
        this.context = canvas.getContext('2d');
        this.ratio = this.getPixelRatio(this.context);
        canvas.width = this.canvasWidth * this.ratio; // 实际渲染像素
        canvas.height = this.canvasHeight * this.ratio; // 实际渲染像素
        canvas.style.width = `${this.canvasWidth}px`; // 控制显示大小
        canvas.style.height = `${this.canvasHeight}px`; // 控制显示大小
        canvas.getContext('2d').setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        await this.initCanvas();
    },
    watch: {
        option() {
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.ratio = this.getPixelRatio(this.context);
            const canvas = document.getElementById(this.id);
            canvas.width = this.canvasWidth * this.ratio; // 实际渲染像素
            canvas.height = this.canvasHeight * this.ratio; // 实际渲染像素
            canvas.style.width = `${this.canvasWidth}px`; // 控制显示大小
            canvas.style.height = `${this.canvasHeight}px`; // 控制显示大小
            canvas.getContext('2d').setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
            this.initCanvas();
        },
    },
    methods: {
        initCanvas() {
            setTimeout(() => {
                const option = Object.assign(this.option, {
                    ctx: this.context,
                    width: this.canvasWidth,
                    height: this.canvasHeight,
                    x: 30,
                    y: 170,
                });
                this.chart = new Ball(option);
            }, 100);
        },
        getPixelRatio(context) {
            const backingStore = context.backingStorePixelRatio
                || context.webkitBackingStorePixelRatio
                || context.mozBackingStorePixelRatio
                || context.msBackingStorePixelRatio
                || context.oBackingStorePixelRatio
                || context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        },
    },
};
</script>

<style lang="less" scoped>
</style>