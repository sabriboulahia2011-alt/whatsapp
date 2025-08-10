
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Camera, 
  Image,
  FileText,
  X
} from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onEmojiClick?: (emoji: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const EMOJIS = ['😀', '😂', '😍', '🥺', '😢', '😡', '👍', '👎', '❤️', '🔥', '💯', '🎉'];

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  onEmojiClick,
  placeholder = "Type a message...",
  disabled = false
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    onChange(value + emoji);
    setShowEmojiPicker(false);
    if (onEmojiClick) {
      onEmojiClick(emoji);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const attachmentOptions = [
    { icon: Image, label: 'Photo', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
    { icon: Camera, label: 'Camera', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
    { icon: FileText, label: 'Document', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
  ];

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl p-4 z-50 min-w-[320px] animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900 dark:text-white">Choose an emoji</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(false)}
              className="h-6 w-6"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="p-2 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors transform hover:scale-110 active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachment Menu */}
      {showAttachments && (
        <div className="absolute bottom-16 left-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl p-3 z-50 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-col space-y-2">
            {attachmentOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowAttachments(false);
                  // Handle attachment type
                }}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105 active:scale-95"
              >
                <div className={`p-2 rounded-full ${option.color}`}>
                  <option.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Area */}
      <div className="flex items-end space-x-3 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {/* Emoji Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowAttachments(false);
          }}
          className={`flex-shrink-0 w-10 h-10 rounded-full transition-all hover:scale-110 active:scale-95 ${
            showEmojiPicker ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          disabled={disabled}
        >
          <Smile className="w-5 h-5" />
        </Button>

        {/* Attachment Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setShowAttachments(!showAttachments);
            setShowEmojiPicker(false);
          }}
          className={`flex-shrink-0 w-10 h-10 rounded-full transition-all hover:scale-110 active:scale-95 ${
            showAttachments ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          disabled={disabled}
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none rounded-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
            style={{ maxHeight: '120px', minHeight: '48px' }}
          />
          
          {/* Send Button */}
          {value.trim() && (
            <Button
              onClick={onSend}
              disabled={disabled || !value.trim()}
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-110 active:scale-95 animate-in zoom-in-50 duration-200"
            >
              <Send className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Voice/Camera Buttons */}
        {!value.trim() && (
          <div className="flex space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110 active:scale-95"
              disabled={disabled}
            >
              <Camera className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onMouseDown={() => setIsRecording(true)}
              onMouseUp={() => setIsRecording(false)}
              onMouseLeave={() => setIsRecording(false)}
              className={`w-10 h-10 rounded-full transition-all hover:scale-110 active:scale-95 ${
                isRecording 
                  ? 'bg-red-100 text-red-600 scale-110 dark:bg-red-900/20' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              disabled={disabled}
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            // Handle file upload
          }}
        />
      </div>
    </div>
  );
};

export default MessageInput;
