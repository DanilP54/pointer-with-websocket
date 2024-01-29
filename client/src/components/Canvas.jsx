import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import canvasState from "../store/canvasState.js";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import ModalComponents from "./ModalComponents.jsx";
import {useParams} from "react-router-dom";


const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
        // toolState.setTool(new Rect(canvasRef.current))
    }, []);

    const userId = useParams().id

    useEffect(() => {
        if(canvasState.username) {
            const socket = new WebSocket('ws://localhost:5000/')
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id: userId,
                    username: canvasState.username,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event) => {
                console.log(event.data)
            }
        }

    }, [canvasState.username]);

    function mouseDownHandler() {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
    return (
        <div  className="canvas">
            <ModalComponents />
            <canvas
                onMouseDown={mouseDownHandler}
                ref={canvasRef}
                width={600}
                height={400} />
        </div>
    )
})

export default Canvas