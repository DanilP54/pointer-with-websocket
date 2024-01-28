export default class Tool {
    constructor(canvas) {
        this.canvas = canvas
        console.log(canvas)
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    set fillColor(color) {
        this.ctx.fillStyle = color
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set leneWidth(width) {
        this.ctx.lineWidth = width
    }
    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
    }
}