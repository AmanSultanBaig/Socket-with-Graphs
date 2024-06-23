const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
let timeChanges;

const socketServer = new socketIO.Server({
  cors: {
    origin: "*",
  },
});

socketServer.on("connection", (socket) => {
  console.log("socket connected!");
  if (timeChanges) clearInterval(timeChanges);
  setInterval(() => {
    socket.emit("chart-change", new Date());
  }, 1000);
});

const httpServer = http.createServer(app);
httpServer.listen(5000, (__) =>
  console.log("App is running on http://localhost:5000 !")
);
