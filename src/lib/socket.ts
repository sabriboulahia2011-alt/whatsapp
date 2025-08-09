import { io, Socket } from "socket.io-client";

const URL = process.env.NODE_ENV === "production"
  ? undefined
  : "http://localhost:4000"; // Adjust if your backend runs elsewhere

export const socket: Socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
});
