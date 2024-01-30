import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import {useEffect, useRef} from "react";
import canvasState from "../store/canvasState.js";
import toolState from "../store/toolState.js";
import Brush from "../tools/Brush.js";
import ModalComponents from "./ModalComponents.jsx";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect.js";
import axios from "axios";


const Canvas = observer(() => {
    const canvasRef = useRef()
    const userId = useParams().id
    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:5000/image?id=${userId}`)
            .then(res => {
                const img = new Image()
                img.src = res.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)

                }
            })
    }, []);



    useEffect(() => {
        if(canvasState.username) {
            const socket = new WebSocket('ws://localhost:5000/')
            canvasState.setSocket(socket)
            canvasState.setSessionId(userId)
            toolState.setTool(new Brush(canvasRef.current, socket, userId))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: userId,
                    username: canvasState.username,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(`User is connection ${msg.username}`)
                        break
                    case 'draw':
                        drawHandler(msg)
                        break

                }
            }
        }

    }, [canvasState.username]);

    const drawHandler = (msg) => {
        const figure = msg.figure
        let ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y)
                break
            case 'rect':
                Rect.staticDraw(ctx, figure.x,figure.y,figure.w, figure.h, figure.color)
                break
            case 'finish':
                ctx.beginPath()
                break
        }

    };

    function mouseDownHandler() {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${userId}`, {img: canvasRef.current.toDataURL()})
            .then(res => console.log(res.data))
    }
    return (
        <div  className="canvas">
            <ModalComponents />
            <canvas
                onMouseDown={mouseDownHandler}
                ref={canvasRef}
                width={600}
                height={400}
            />
        </div>
    )
})

export default Canvas