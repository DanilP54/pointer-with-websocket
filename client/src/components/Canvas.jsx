import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import canvasState from "../store/canvasState.js";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {

        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
        // toolState.setTool(new Rect(canvasRef.current))
    }, []);

    function mouseDownHandler() {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
    return (
        <div  className="canvas">
            <canvas
                onMouseDown={mouseDownHandler}
                ref={canvasRef}
                width={600}
                height={400} />
        </div>
    )
})

export default Canvas