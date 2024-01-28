import {makeAutoObservable} from "mobx";

class ToolState {

    tool = null
    constructor() {

        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool;
    }
    setFillColor(color) {
        this.tool.fillColor = color
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color
    }
    setLineWidth(width) {
        // debugger
        console.log(width)
        this.tool.ctx.lineWidth = width
    }
}

export default new ToolState()