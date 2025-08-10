
'use client'

import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MessageCircle, 
  Archive, 
  Users, 
  Phone,
  MoreVertical,
  Pin,
  Check,
  Settings,
  UserPlus,
  Filter
} from 'lucide-react'
import Link from 'next/link'

interface ChatItem {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  avatar: string
  isOnline: boolean
  isPinned: boolean
  isTyping: boolean
  lastMessageStatus: 'sent' | 'delivered' | 'read'
  isGroup: boolean
  isMuted: boolean
}

export default function ChatList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all')
  const [showArchived, setShowArchived] = useState(false)
  
  const [chats] = useState<ChatItem[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      lastMessage: 'That sounds really cool! I\'d love to try it out when it\'s ready.',
      timestamp: '2:35 PM',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      isPinned: true,
      isTyping: false,
      lastMessageStatus: 'read',
      isGroup: false,
      isMuted: false
    },
    {
      id: '2',
      name: 'Design Team',
      lastMessage: 'John: The new designs look amazing! 🎨',
      timestamp: '1:22 PM',
      unreadCount: 3,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3847ae62b5fa?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      isPinned: true,
      isTyping: true,
      lastMessageStatus: 'delivered',
      isGroup: true,
      isMuted: false
    },
    {
      id: '3',
      name: 'Alex Chen',
      lastMessage: 'Sure! Let\'s schedule a call for tomorrow',
      timestamp: '11:45 AM',
      unreadCount: 1,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      isPinned: false,
      isTyping: false,
      lastMessageStatus: 'sent',
      isGroup: false,
      isMuted: false
    },
    {
      id: '4',
      name: 'Family Group',
      lastMessage: 'Mom: Don\'t forget about dinner this Sunday!',
      timestamp: '10:30 AM',
      unreadCount: 5,
      avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      isPinned: false,
      isTyping: false,
      lastMessageStatus: 'read',
      isGroup: true,
      isMuted: true
    },
    {
      id: '5',
      name: 'Emily Rodriguez',
      lastMessage: 'Thanks for the help with the project!',
      timestamp: 'Yesterday',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      isPinned: false,
      isTyping: false,
      lastMessageStatus: 'read',
      isGroup: false,
      isMuted: false
    },
    {
      id: '6',
      name: 'Project Alpha',
      lastMessage: 'Mike: The client approved the proposal! 🎉',
      timestamp: 'Yesterday',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      isPinned: false,
      isTyping: false,
      lastMessageStatus: 'delivered',
      isGroup: true,
      isMuted: false
    },
    {
      id: '7',
      name: 'Mark Thompson',
      lastMessage: 'See you at the meeting tomorrow!',
      timestamp: 'Monday',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      isPinned: false,
      isTyping: false,
      lastMessageStatus: 'read',
      isGroup: false,
      isMuted: false
    }
  ])

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (activeTab) {
      case 'unread':
        return matchesSearch && chat.unreadCount > 0
      case 'groups':
        return matchesSearch && chat.isGroup
      default:
        return matchesSearch
    }
  })

  const pinnedChats = filteredChats.filter(chat => chat.isPinned)
  const unpinnedChats = filteredChats.filter(chat => !chat.isPinned)
  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0)

  const renderChatItem = (chat: ChatItem) => (
    <div
      key={chat.id}
      className="group px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer relative"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-full h-full object-cover"
            />
          </Avatar>
          {chat.isOnline && !chat.isGroup && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          )}
          {chat.isGroup && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2 min-w-0">
              <h3 className={`font-medium truncate ${
                chat.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-900'
              }`}>
                {chat.name}
              </h3>
              <div className="flex items-center space-x-1 flex-shrink-0">
                {chat.isPinned && (
                  <Pin className="w-3 h-3 text-gray-400" />
                )}
                {chat.isMuted && (
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <span className={`text-xs ${
                chat.unreadCount > 0 ? 'text-green-600 font-medium' : 'text-gray-500'
              }`}>
                {chat.timestamp}
              </span>
              {!chat.isGroup && chat.lastMessageStatus && (
                <div className={`w-4 h-4 ${
                  chat.lastMessageStatus === 'read' ? 'text-blue-500' : 
                  chat.lastMessageStatus === 'delivered' ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  <Check className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {chat.isTyping ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">typing...</span>
                </div>
              ) : (
                <p className={`text-sm truncate ${
                  chat.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                }`}>
                  {chat.lastMessage}
                </p>
              )}
            </div>
            
            {chat.unreadCount > 0 && (
              <Badge className="bg-green-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full ml-2">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <UserPlus className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-green-500 focus:ring-green-500/20 rounded-lg"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'all', label: 'All', count: chats.length },
            { key: 'unread', label: 'Unread', count: chats.filter(c => c.unreadCount > 0).length },
            { key: 'groups', label: 'Groups', count: chats.filter(c => c.isGroup).length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-1 text-xs ${
                  activeTab === tab.key ? 'text-green-500' : 'text-gray-400'
                }`}>
                  ({tab.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Archive section */}
        {!showArchived && (
          <button
            onClick={() => setShowArchived(true)}
            className="w-full mt-4 flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Archive className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Archived</span>
            <span className="text-xs text-gray-500 ml-auto">3</span>
          </button>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
            <p className="text-gray-500 text-sm">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a new conversation to get started'}
            </p>
          </div>
        ) : (
          <div>
            {/* Pinned Chats */}
            {pinnedChats.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center">
                    <Pin className="w-3 h-3 mr-1" />
                    Pinned
                  </h4>
                </div>
                {pinnedChats.map(renderChatItem)}
              </div>
            )}
            
            {/* Regular Chats */}
            {unpinnedChats.length > 0 && (
              <div>
                {pinnedChats.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      All Chats
                    </h4>
                  </div>
                )}
                {unpinnedChats.map(renderChatItem)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-6">
        <Button
          size="icon"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Unread badge in corner */}
      {totalUnread > 0 && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-red-500 text-white text-xs">
            {totalUnread > 99 ? '99+' : totalUnread}
          </Badge>
        </div>
      )}
    </div>
  )
}
