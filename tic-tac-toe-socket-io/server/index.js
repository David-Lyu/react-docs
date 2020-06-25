require('dotenv/config')
const express = require('express')
const app = express();
const path = require("path");
const { Socket } = require('dgram');

const publicPath = path.join(__dirname, 'public/');
const staticMiddleware = express.static(publicPath);

app.use(staticMiddleware)

const http = require("http").createServer(app);
const io = require('socket.io')(http);

io.on("connection", (socket) => {
    socket.emit("message", "hello")
})

http.listen(process.env.PORT, ()=>{
    console.log("listening on port ", process.env.PORT)
})