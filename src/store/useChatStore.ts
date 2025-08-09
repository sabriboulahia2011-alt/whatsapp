import { create } from 'zustand';
import type { User } from '@/utils/types';

interface Message {
  id: string;
  content?: string;
  type: 'text' | 'image' | 'video' | 'file';
  chatId: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  reactions?: Record<string, string[]>;
}

interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  users: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

interface ChatStore {
  chats: Chat[];
  messages: Message[];
  setChats: (chats: Chat[]) => void;
  setMessages: (messages: Message[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  messages: [],
  setChats: (chats) => set({ chats }),
  setMessages: (messages) => set({ messages }),
})); 