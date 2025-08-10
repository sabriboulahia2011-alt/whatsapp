'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  ArrowLeft,
  Mic,
  Camera,
  Info,
  Star,
  Archive,
  Trash2
} from 'lucide-react'
import Link from 'next/link'
import ChatList from '@/components/ChatList'

interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file'
}

// Placeholder for emojis, replace with actual emoji data if needed
const EMOJIS = [
  '😀', '😂', '😊', '😍', '😭', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉',
  '🌸', '🌟', '🚀', '💡', '💰', '👑', '🙏', '👋', '✌️', '👌', '🤞', '✨'
];

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [selectedChat, setSelectedChat] = useState('1')
  const [showChatList, setShowChatList] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there! How are you doing?',
      sender: 'other',
      timestamp: '2:30 PM',
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just working on some projects. How about you?',
      sender: 'me',
      timestamp: '2:32 PM',
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      text: 'That sounds awesome! I\'d love to hear more about what you\'re working on.',
      sender: 'other',
      timestamp: '2:33 PM',
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      text: 'Sure! I\'m building a WhatsApp clone with Next.js. It\'s been really exciting to work with modern React patterns and Tailwind CSS.',
      sender: 'me',
      timestamp: '2:35 PM',
      status: 'delivered',
      type: 'text'
    },
    {
      id: '5',
      text: 'Wow, that\'s impressive! React and Next.js are such powerful tools. Are you using any specific UI libraries?',
      sender: 'other',
      timestamp: '2:37 PM',
      status: 'read',
      type: 'text'
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      status: 'sent',
      type: 'text'
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
    setShowEmojiPicker(false) // Close emoji picker on send

    // Simulate typing indicator and response
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const responses = [
          'That sounds really cool! I\'d love to try it out when it\'s ready.',
          'Amazing work! The UI looks very clean and professional.',
          'I\'m impressed by the attention to detail. Keep it up!',
          'This is exactly what I was looking for. Great job!'
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'other',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          status: 'read',
          type: 'text'
        }
        setMessages(prev => [...prev, response])
      }, 1500)
    }, 500)
  }
  
  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e as any); // Type assertion to satisfy onSubmit event type
    }
  };

  const renderMessage = (msg: Message, index: number) => {
    const isMyMessage = msg.sender === 'me';
    const messageClass = isMyMessage
      ? 'bg-green-500 text-white'
      : 'bg-white text-gray-900 border border-gray-200';
    const bubbleClass = isMyMessage ? 'rounded-2xl rounded-br-md' : 'rounded-2xl rounded-bl-md';
    const tailClass = isMyMessage ? 'border-l-green-500 border-b-green-500' : 'border-l-white border-b-white';

    return (
      <div
        key={msg.id}
        className={`flex items-end space-x-2 ${isMyMessage ? 'justify-end' : 'justify-start'}`}
      >
        {!isMyMessage && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <img src={currentContact.avatar} alt={currentContact.name} className="w-full h-full object-cover" />
          </Avatar>
        )}
        <div
          className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg shadow-sm relative flex flex-col ${messageClass} ${bubbleClass}`}
        >
          <p className="text-sm leading-relaxed break-words">{msg.text}</p>
          <div className={`flex items-center justify-end mt-1 space-x-1`}>
            <span className={`text-xs ${isMyMessage ? 'text-green-100' : 'text-gray-500'}`}>
              {msg.timestamp}
            </span>
            {isMyMessage && (
              <div className="flex">
                <div className={`w-4 h-4 ${
                  msg.status === 'read' ? 'text-blue-300' : 'text-green-200'
                }`}>
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    {msg.status === 'read' && (
                      <path d="M11.854 1.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L4.5 8.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    )}
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };


  const currentContact = {
    name: 'Sarah Wilson',
    status: 'Online',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List Sidebar - Hidden on mobile when chat is selected */}
      <div className={`${showChatList ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white border-r border-gray-200 flex-shrink-0`}>
        <ChatList />
      </div>

      {/* Main Chat Area */}
      <div className={`${showChatList ? 'hidden' : 'flex'} lg:flex flex-1 flex-col bg-gray-50`}>
        {/* Chat Header */}
        <div className="px-4 lg:px-6 py-3 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-100 transition-colors"
                onClick={() => setShowChatList(true)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="relative">
                <Avatar className="w-10 h-10">
                  <img
                    src={currentContact.avatar}
                    alt={currentContact.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900 truncate">{currentContact.name}</h2>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-green-600">{currentContact.status}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-2"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {messages.map((message, index) => renderMessage(message, index))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 flex-shrink-0">
                <Avatar className="w-8 h-8">
                  <img
                    src={currentContact.avatar}
                    alt={currentContact.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              </div>
              <div className="bg-white border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs ml-2 shadow-sm">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-xs text-gray-500 ml-2">typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 lg:p-6 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-3 max-w-full">
            {/* Emoji Picker */}
            <div className="relative flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all w-10 h-10 rounded-full"
              >
                <Smile className="w-5 h-5" />
              </Button>

              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50 min-w-[280px]">
                  <div className="grid grid-cols-8 gap-2">
                    {EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="p-2 text-xl hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all w-10 h-10 rounded-full flex-shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </Button>

            {/* Message Input */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="pr-12 py-3 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 rounded-full bg-gray-50 focus:bg-white transition-all"
                />
                {message.trim() && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-green-500 hover:bg-green-600 w-8 h-8 rounded-full transition-all hover:scale-110"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Voice/Camera Button */}
            {!message.trim() && (
              <div className="flex space-x-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all w-10 h-10 rounded-full"
                >
                  <Camera className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all w-10 h-10 rounded-full"
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}