import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';

interface User {
  id: string;
  name?: string;
  avatar?: string | null;
}

interface Message {
  id: string;
  content?: string;
  type: 'text' | 'image' | 'video' | 'file' | 'folder' | 'location';
  chatId: string;
  senderId: string;
  sender: User;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  reactions?: Record<string, string[]>;
  status?: 'sent' | 'delivered' | 'read';
  starred?: boolean;
}

interface MessageItemProps {
  message: Message;
}

const formatTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const statusIcon = (status?: string) => {
  switch (status) {
    case 'read':
      return <span title="Read" className="text-blue-500 ml-1">✔✔</span>;
    case 'delivered':
      return <span title="Delivered" className="text-gray-400 ml-1">✔✔</span>;
    case 'sent':
      return <span title="Sent" className="text-gray-400 ml-1">✔</span>;
    default:
      return null;
  }
};

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const currentUser = useUserStore((s) => s.user);
  const isMine = currentUser?.id === message.senderId;
  return (
    <div
      className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
      aria-live="polite"
    >
      {!isMine && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={message.sender.avatar || undefined} alt={message.sender.name || 'User'} />
          <AvatarFallback>{message.sender.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
      )}
      <Card
        className={`max-w-xs md:max-w-md px-0 py-0 rounded-2xl shadow-md relative transition-all duration-300 group ${isMine
          ? 'bg-gradient-to-br from-blue-500 to-blue-400 text-white rounded-br-sm'
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'} border-0`}
        style={{ wordBreak: 'break-word' }}
      >
        <CardContent className="p-4">
          {message.type === 'text' && (
            <span className="whitespace-pre-line break-words text-base leading-relaxed">{message.content}</span>
          )}
          {message.type === 'image' && message.content && (
            <Image src={message.content} alt="Image" width={200} height={200} className="rounded-lg mt-1 shadow-lg" />
          )}
          {/* Video/file preview support (future) */}
          {/* Reactions */}
          {message.reactions && Object.keys(message.reactions).length > 0 && (
            <div className="flex gap-1 mt-1">
              {Object.entries(message.reactions).map(([emoji, users]) => (
                <span key={emoji} className="text-lg bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5 shadow text-gray-800 dark:text-gray-200">
                  {emoji} <span className="text-xs">{users.length}</span>
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-80">
            <span>{formatTime(message.createdAt)}</span>
            {isMine && statusIcon(message.status)}
          </div>
          {message.starred && (
            <span className="absolute top-1 right-2 text-yellow-400 animate-pulse" title="Starred">★</span>
          )}
          {/* Hover actions (future: reply, react, more) */}
          <div className="absolute hidden group-hover:flex gap-2 top-1 left-2 z-10">
            {/* Example: <button className="text-xs text-blue-500">Reply</button> */}
          </div>
        </CardContent>
      </Card>
      {isMine && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={message.sender.avatar || undefined} alt={message.sender.name || 'User'} />
          <AvatarFallback>{message.sender.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default MessageItem;