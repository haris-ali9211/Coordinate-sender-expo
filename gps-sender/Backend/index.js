const express = require("express");
const app = express();
const http = require("http");
const socketIO = require('socket.io');
const cors = require("cors");



const server = http.createServer(app);

const PORT = process.env.PORT || 5000;


const io = socketIO(server);
io.on('connection', socket => {
  var num = 0;
  num++;
  console.log('client connected on websocket', `${socket.id}`);
  setInterval(() => {
    io.emit('ping', { data: "saman from backend" });
  }, 10000);


  // =======
  //     io.emit('ping', { data: "haris" });
  //   }, 1000);
  // >>>>>>> Stashed changes
});

server.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
