import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket: Socket) => {
  socket.on("join", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("ready");
  });

  socket.on("offer", (offer: object, roomId: string) => {
    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", (answer: object, roomId: string) => {
    socket.to(roomId).emit("answer", answer);
  });

  socket.on("candidate", (candidate: object, roomId: string) => {
    socket.to(roomId).emit("candidate", candidate);
  });
});

server.listen(3001, () => {
  console.log("Signaling server running on port 3001");
});
