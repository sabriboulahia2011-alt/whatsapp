'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Send, Smile, Paperclip, Mic, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react'
import MessageInput from '@/components/MessageInput'
import ChatItem from '@/components/ChatItem'

interface Message {
  id: string
  content: string
  sender: 'user' | 'other'
  timestamp: Date
  type: 'text' | 'image' | 'file'
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample chats data
  const chats: Chat[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Thanks for the help!',
      timestamp: '9:45 AM',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Development Team',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Meeting at 3 PM today',
      timestamp: 'Yesterday',
      unreadCount: 5,
      isOnline: true
    }
  ]

  // Sample messages for selected chat
  const sampleMessages: Message[] = [
    {
      id: '1',
      content: 'Hey there! How are you doing?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text'
    },
    {
      id: '2',
      content: 'I\'m doing great! Thanks for asking. How about you?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text'
    },
    {
      id: '3',
      content: 'All good here! Are we still on for the meeting tomorrow?',
      sender: 'other',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text'
    }
  ]

  useEffect(() => {
    if (selectedChat) {
      setMessages(sampleMessages)
    }
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !selectedChat) return

    const newMsg: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
  }

  return (
    <div className="flex h-[calc(100vh-120px)] rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/20 backdrop-blur-xl">
      {/* Chat List Sidebar */}
      <div className={`w-full md:w-80 lg:w-96 glass border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => setSelectedChat(chat)}
            />
          ))}
        </div>
      </div>

      {/* Chat Content */}
      {selectedChat ? (
        <div className={`flex-1 flex flex-col ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className="p-4 glass border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedChat(null)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedChat.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                {selectedChat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{selectedChat.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedChat.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
              >
                <div
                  className={`max-w-xs lg:max-w-sm xl:max-w-md px-4 py-2 rounded-2xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-sm'
                      : 'glass border border-white/20 dark:border-gray-700/20 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 glass border-t border-gray-200/50 dark:border-gray-700/50">
            <MessageInput
              value={newMessage}
              onChange={setNewMessage}
              onSend={handleSendMessage}
              placeholder="Type a message..."
            />
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/25">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Choose from your existing conversations, or start a new one
            </p>
          </div>
        </div>
      )}
    </div>
  )
}