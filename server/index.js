const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.ws('/', (ws,req) => {

    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws,msg)
                break
        }
    })
})

app.post('/image', (req,res) => {
    try {

    } catch (e) {
        console.log(e)
        return res.status(500).json('.error')
    }
})
app.get('/image', (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        return res.status(500).json('.error')
    }
})
app.listen(PORT, () => console.log('All OK'))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws,msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}