const express = require("express");
const app = express();
const http = require("http");
const socketIO = require('socket.io');
const cors = require("cors");



const server = http.createServer(app);

const PORT = process.env.PORT || 5000;


const io = socketIO(server);
io.on('connection', socket => {
  console.log('client connected on websocket');

  setInterval(() => {
    io.emit('ping', { data: (new Date()) / 1 });
  }, 1000);
});

server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
