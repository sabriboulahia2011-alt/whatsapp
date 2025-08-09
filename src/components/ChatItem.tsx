import React from 'react';
import type { User } from '@/utils/types';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  users: User[];
  createdAt: string;
  updatedAt: string;
}

interface ChatItemProps {
  chat: Chat;
  selected: boolean;
  onClick: () => void;
  unreadCount?: number;
  online?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, selected, onClick, unreadCount = 0, online = false }) => (
  <Card
    className={`relative p-4 rounded-xl shadow-md cursor-pointer transition-all duration-200 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-green-400 \
      ${selected ? 'bg-gradient-to-r from-green-200 to-green-100 dark:from-green-900 dark:to-green-800' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800'} border-0`}
    onClick={onClick}
    tabIndex={0}
    aria-selected={selected}
    role="option"
    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
  >
    {/* Avatar with online dot */}
    <span className="relative flex-shrink-0">
      <Avatar className="w-12 h-12">
        <AvatarImage src={undefined} alt={chat.name || 'U'} />
        <AvatarFallback>{chat.name ? chat.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}</AvatarFallback>
      </Avatar>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" title="Online" />
      )}
    </span>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="truncate font-semibold text-gray-900 dark:text-gray-100">{chat.name || 'Unnamed Chat'}</span>
        {chat.isGroup && <Badge className="ml-2" variant="secondary">Group</Badge>}
      </div>
      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
    {/* Unread badge */}
    {unreadCount > 0 && (
      <Badge className="ml-2 animate-bounceIn" variant="default" aria-label={`${unreadCount} unread messages`}>
        {unreadCount}
      </Badge>
    )}
  </Card>
);

export default ChatItem;