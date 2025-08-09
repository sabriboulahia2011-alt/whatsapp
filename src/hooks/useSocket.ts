import { useEffect } from "react";
import { socket } from "@/lib/socket";
import type { Message } from '@/utils/types';

export function useSocket({
  onMessage,
  chatId,
}: {
  onMessage: (msg: Message) => void;
  chatId: string | null;
}) {
  useEffect(() => {
    if (!chatId) return;

    socket.connect();

    // Join the chat room
    socket.emit("join", { chatId });

    // Listen for new messages
    socket.on("message", onMessage);

    return () => {
      socket.emit("leave", { chatId });
      socket.off("message", onMessage);
      socket.disconnect();
    };
  }, [chatId, onMessage]);
}
