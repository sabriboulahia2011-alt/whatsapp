
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
      <div className={`${!showChatList ? 'block' : 'hidden'} lg:block flex-1 flex flex-col`}>
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setShowChatList(true)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <img
                src={currentContact.avatar}
                alt={currentContact.name}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{currentContact.name}</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-600">{currentContact.status}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <Video className="w-5 h-5" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-[#f0f2f5] bg-opacity-80 relative">
          {/* Chat Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[75%] lg:max-w-[60%] rounded-lg px-3 py-2 shadow-sm relative ${
                    msg.sender === 'me'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                  <div className={`flex items-center justify-end mt-1 space-x-1`}>
                    <span className={`text-xs ${
                      msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </span>
                    {msg.sender === 'me' && (
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
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-200">
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-1">
                    <Avatar className="w-6 h-6">
                      <img src={currentContact.avatar} alt={currentContact.name} className="w-full h-full object-cover" />
                    </Avatar>
                    <div className="flex space-x-1 ml-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
            <div className="flex items-center space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-800 h-10 w-10"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-800 h-10 w-10"
              >
                <Camera className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pr-12 py-3 rounded-full border-gray-300 focus:border-green-500 focus:ring-green-500/20 resize-none"
                style={{ minHeight: '44px' }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 h-8 w-8"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            
            {message.trim() ? (
              <Button
                type="submit"
                size="icon"
                className="bg-green-500 hover:bg-green-600 text-white rounded-full h-11 w-11 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-800 h-11 w-11"
              >
                <Mic className="w-5 h-5" />
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
