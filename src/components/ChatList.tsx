import React, { useState } from 'react';
import ChatItem from './ChatItem';
import type { Chat as BaseChat } from '@/utils/types';
import { Input } from "@/components/ui/input";

// Extend Chat type for local stub/demo fields
interface Chat extends BaseChat {
  unreadCount?: number;
  online?: boolean;
}

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chat: Chat) => void;
  onlineUserIds?: string[];
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onSelectChat, onlineUserIds = [] }) => {
  const [search, setSearch] = useState('');
  const filteredChats = chats.filter(chat =>
    (chat.name || 'Unnamed Chat').toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Input
        type="text"
        className="w-full mb-3"
        placeholder="Search chats..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search chats"
      />
      <ul className="space-y-2">
        {filteredChats.map((chat) => {
          // For 1:1 chat, online if any user (not self) is online
          let online = false;
          if (!chat.isGroup && chat.users.length === 2) {
            online = chat.users.some(user => onlineUserIds.includes(user.id));
          } else if (chat.isGroup) {
            online = chat.users.some(user => onlineUserIds.includes(user.id));
          }
          return (
            <ChatItem
              key={chat.id}
              chat={chat}
              selected={selectedChatId === chat.id}
              onClick={() => onSelectChat(chat)}
              unreadCount={chat.unreadCount || 0}
              online={online}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ChatList;