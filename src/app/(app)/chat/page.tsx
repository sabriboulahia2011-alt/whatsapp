
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
  Camera
} from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there! How are you doing?',
      sender: 'other',
      timestamp: '2:30 PM',
      status: 'read'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just working on some projects. How about you?',
      sender: 'me',
      timestamp: '2:32 PM',
      status: 'read'
    },
    {
      id: '3',
      text: 'That sounds awesome! I\'d love to hear more about what you\'re working on.',
      sender: 'other',
      timestamp: '2:33 PM',
      status: 'read'
    },
    {
      id: '4',
      text: 'Sure! I\'m building a WhatsApp clone with Next.js. It\'s been really exciting to work with modern React patterns.',
      sender: 'me',
      timestamp: '2:35 PM',
      status: 'delivered'
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
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
      status: 'sent'
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: 'That sounds really cool! I\'d love to try it out when it\'s ready.',
          sender: 'other',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          status: 'read'
        }
        setMessages(prev => [...prev, response])
      }, 2000)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <Link href="/chat" className="lg:hidden">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <Avatar className="w-10 h-10">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Sarah Wilson"
              className="w-full h-full object-cover"
            />
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">Sarah Wilson</h3>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#efeae2] bg-opacity-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 shadow-sm ${
                msg.sender === 'me'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
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
          <div className="flex justify-start">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-800"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-800"
          >
            <Camera className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-10 rounded-full border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          {message.trim() ? (
            <Button
              type="submit"
              size="icon"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full"
            >
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-800"
            >
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
