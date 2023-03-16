const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require('mongoose');
const route = require("./route/route");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://devendra_29:I28Cx63EjuXQjHtQ@devendra.ytysqub.mongodb.net/projectraft")
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use('/', route);

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});



