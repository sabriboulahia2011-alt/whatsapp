// User Object
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  role: 'standard' | 'premium' | 'admin';
  status?: string;
  createdAt: string;
  updatedAt: string;
}

// Chat Object
export interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  users: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// Message Object
export interface Message {
  starred?: boolean;
  id: string;
  content?: string;
  type: 'text' | 'image' | 'video' | 'file';
  chatId: string;
  senderId: string;
  sender: User;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  reactions?: Record<string, string[]>;
} 