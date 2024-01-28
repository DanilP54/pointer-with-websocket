import Tool from "./Tool.js";
export default class Brush extends Tool {
    constructor(canvas) {
        console.log(canvas)
        super(canvas)
        this.listen()
    }
    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    }
    mouseUpHandler(e) {
        this.mouseDown = false
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }
    draw(x,y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        console.log(1)
    }
}