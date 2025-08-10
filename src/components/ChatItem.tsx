
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Pin, 
  MoreVertical, 
  Check, 
  CheckCheck,
  Volume2,
  VolumeX 
} from 'lucide-react';

interface ChatItemProps {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
  isPinned: boolean;
  isTyping: boolean;
  lastMessageStatus: 'sent' | 'delivered' | 'read';
  isGroup: boolean;
  isMuted: boolean;
  onClick?: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  id,
  name,
  lastMessage,
  timestamp,
  unreadCount,
  avatar,
  isOnline,
  isPinned,
  isTyping,
  lastMessageStatus,
  isGroup,
  isMuted,
  onClick
}) => {
  const renderMessageStatus = () => {
    if (isGroup) return null;
    
    switch (lastMessageStatus) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer active:bg-gray-100 dark:active:bg-gray-700"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar with status indicator */}
        <div className="relative flex-shrink-0">
          <Avatar className="w-12 h-12 ring-2 ring-transparent group-hover:ring-gray-200 transition-all">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </Avatar>
          
          {/* Online status for individual chats */}
          {!isGroup && isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          )}
          
          {/* Group indicator */}
          {isGroup && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        {/* Chat info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <h3 className={`font-medium truncate ${
                unreadCount > 0 
                  ? 'text-gray-900 dark:text-white font-semibold' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {name}
              </h3>
              
              {/* Status indicators */}
              <div className="flex items-center space-x-1 flex-shrink-0">
                {isPinned && (
                  <Pin className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                )}
                {isMuted && (
                  <VolumeX className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
            
            {/* Timestamp and message status */}
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <span className={`text-xs ${
                unreadCount > 0 
                  ? 'text-green-600 dark:text-green-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {timestamp}
              </span>
              {renderMessageStatus()}
            </div>
          </div>
          
          {/* Last message and unread count */}
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {isTyping ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                    <div 
                      className="w-1 h-1 bg-green-500 rounded-full animate-bounce" 
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div 
                      className="w-1 h-1 bg-green-500 rounded-full animate-bounce" 
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    typing...
                  </span>
                </div>
              ) : (
                <p className={`text-sm truncate ${
                  unreadCount > 0 
                    ? 'text-gray-900 dark:text-gray-100 font-medium' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {lastMessage}
                </p>
              )}
            </div>
            
            {/* Unread badge */}
            {unreadCount > 0 && (
              <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full ml-2 animate-pulse">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            // Handle more actions
          }}
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 bg-green-500/5 opacity-0 group-active:opacity-100 transition-opacity duration-75 pointer-events-none"></div>
    </div>
  );
};

export default ChatItem;
