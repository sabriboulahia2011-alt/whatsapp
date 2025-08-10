
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Send, Phone, Video, MoreVertical, ArrowLeft, Search } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'other'
  timestamp: Date
}

interface Chat {
  id: string
  name: string
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

  const chats: Chat[] = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'Thanks for the help!',
      timestamp: '9:45 AM',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Team Group',
      lastMessage: 'Meeting at 3 PM today',
      timestamp: 'Yesterday',
      unreadCount: 5,
      isOnline: true
    }
  ]

  const sampleMessages: Message[] = [
    {
      id: '1',
      content: 'Hey there! How are you doing?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      content: 'I\'m doing great! Thanks for asking.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000)
    }
  ]

  useEffect(() => {
    if (selectedChat) {
      setMessages(sampleMessages)
    }
  }, [selectedChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
  }

  return (
    <div className="flex h-screen max-w-7xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 m-4">
      {/* Chat List */}
      <div className={`w-full md:w-80 bg-gray-50/50 dark:bg-gray-800/50 border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Search */}
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-200/30 dark:border-gray-700/30 cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-white/70 dark:bg-gray-700/70' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {chat.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Content */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedChat(null)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {selectedChat.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{selectedChat.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedChat.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-sm'
                      : 'bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Choose from your existing conversations
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
