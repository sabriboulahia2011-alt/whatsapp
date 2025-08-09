import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectSignalingServer(roomId: string): Socket {
  if (!socket) {
    socket = io("https://your-signaling-server-url", { transports: ["websocket"] });
  }
  socket.emit("join", roomId);
  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}
