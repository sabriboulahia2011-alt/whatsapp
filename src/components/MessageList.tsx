import React from 'react';
import MessageItem from './MessageItem';
import type { Message, User } from '@/utils/types';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  error: string;
  showStarredOnly: boolean;
  allUsers: User[];
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading, error, showStarredOnly, allUsers }) => (
  <Card className="flex-1 overflow-y-auto mb-4 bg-gray-50 dark:bg-gray-900 rounded p-2 border-0 shadow-none">
    <CardContent className="p-0">
      {loading ? (
        <Alert className="mb-2">
          <AlertDescription>Loading messages...</AlertDescription>
        </Alert>
      ) : error ? (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : messages.length === 0 ? (
        <div className="text-gray-400 p-4">No messages yet. Say hello!</div>
      ) : (
        <ul className="space-y-2">
          {(showStarredOnly ? messages.filter((msg) => msg.starred) : messages).map((msg) => (
            <li key={msg.id} className="bg-white dark:bg-gray-800 rounded shadow animate-fade-in">
              <MessageItem message={{
                ...msg,
                starred: typeof msg.starred === 'boolean' ? msg.starred : undefined,
                sender: allUsers.find(u => u.id === msg.senderId) || { id: msg.senderId, name: 'Unknown', avatar: null },
              }} />
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

export default MessageList;