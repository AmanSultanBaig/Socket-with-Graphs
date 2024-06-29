const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const { changeDataStats } = require("./data.service")

const app = express();
let timeChanges;
const httpServer = http.createServer(app);

const socketServer = new socketIO.Server(httpServer, {
  cors: {
    origin: "*",
  },
});

socketServer.on("connection", (socket) => {
  console.log("socket connected!");
  if (timeChanges) clearInterval(timeChanges);
  setInterval(() => {
    socket.emit("chart-change", changeDataStats());
  }, 5000);
});

httpServer.listen(5000, (__) =>
  console.log("App is running on http://localhost:5000 !")
);
