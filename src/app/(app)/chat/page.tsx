
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
  Check,
  CheckCheck
} from 'lucide-react'
import ChatList from '@/components/ChatList'

interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file'
}

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
    setShowEmojiPicker(false)

    // Simulate typing and response
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
      handleSendMessage(e as any);
    }
  };

  const renderMessageStatus = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  const renderMessage = (msg: Message, index: number) => {
    const isMyMessage = msg.sender === 'me';

    return (
      <div
        key={msg.id}
        className={`flex items-end space-x-2 mb-4 ${isMyMessage ? 'justify-end' : 'justify-start'}`}
      >
        {!isMyMessage && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <img src={currentContact.avatar} alt={currentContact.name} className="w-full h-full object-cover rounded-full" />
          </Avatar>
        )}
        
        <div
          className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg shadow-sm relative ${
            isMyMessage
              ? 'bg-green-500 text-white rounded-br-md'
              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{msg.text}</p>
          <div className={`flex items-center justify-end mt-1 space-x-1`}>
            <span className={`text-xs ${isMyMessage ? 'text-green-100' : 'text-gray-500'}`}>
              {msg.timestamp}
            </span>
            {isMyMessage && renderMessageStatus(msg.status)}
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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Chat List Sidebar */}
      <div className={`${showChatList ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0`}>
        <ChatList />
      </div>

      {/* Main Chat Area */}
      <div className={`${showChatList ? 'hidden' : 'flex'} lg:flex flex-1 flex-col bg-gray-50 dark:bg-gray-900`}>
        {/* Chat Header */}
        <div className="px-4 lg:px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowChatList(true)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="relative">
                <Avatar className="w-10 h-10">
                  <img
                    src={currentContact.avatar}
                    alt={currentContact.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900 dark:text-white truncate">{currentContact.name}</h2>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-green-600 dark:text-green-400">{currentContact.status}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-600">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 lg:p-6"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {messages.map((message, index) => renderMessage(message, index))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 flex-shrink-0">
                <Avatar className="w-8 h-8">
                  <img
                    src={currentContact.avatar}
                    alt={currentContact.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Avatar>
              </div>
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-lg rounded-bl-md max-w-xs ml-2 shadow-sm">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-end space-x-3 max-w-full">
            {/* Emoji Picker */}
            <div className="relative flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-10 h-10 rounded-full"
              >
                <Smile className="w-5 h-5" />
              </Button>

              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl p-3 z-50 min-w-[280px]">
                  <div className="grid grid-cols-8 gap-2">
                    {EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="p-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
              className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-10 h-10 rounded-full flex-shrink-0"
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
                  className="pr-12 py-3 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 rounded-full bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 transition-all"
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

            {/* Voice/Camera Buttons */}
            {!message.trim() && (
              <div className="flex space-x-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-10 h-10 rounded-full"
                >
                  <Camera className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-10 h-10 rounded-full"
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
