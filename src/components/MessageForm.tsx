import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MessageFormProps {
  input: string;
  file: File | null;
  setFile: (f: File | null) => void;
  sending: boolean;
  handleSend: (e?: React.FormEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (v: boolean) => void;
  handleEmojiSelect: (emoji: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  EMOJIS: string[];
  enabled?: boolean;
  visible?: boolean;
}

const MessageForm: React.FC<MessageFormProps> = ({
  input,
  sending,
  handleSend,
  handleFileChange,
  handleInputChange,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiSelect,
  textareaRef,
  fileInputRef,
  EMOJIS,
  enabled = true,
  visible = true,
}) => {
  if (!visible) return null;
  return (
    <form onSubmit={handleSend} className="flex gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow items-end relative" aria-label="Send message form">
      <input
        type="file"
        accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip,.rar"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        aria-label="Attach file"
        disabled={!enabled}
      />
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={() => enabled && fileInputRef.current?.click()}
        title="Attach file"
        aria-label="Attach file"
        className="px-2 py-2"
        disabled={!enabled}
      >
        📎
      </Button>
      {/* Emoji picker button */}
      <div className="relative">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => enabled && setShowEmojiPicker(!showEmojiPicker)}
          aria-label="Add emoji"
          tabIndex={0}
          className="px-2 py-2"
          disabled={!enabled}
        >
          😊
        </Button>
        {showEmojiPicker && enabled && (
          <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 border rounded shadow p-2 flex flex-wrap gap-1 z-50" role="dialog" aria-label="Emoji picker">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="text-2xl p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => handleEmojiSelect(emoji)}
                aria-label={`Insert emoji ${emoji}`}
                disabled={!enabled}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        rows={1}
        className="flex-1 resize-none min-h-[40px] max-h-32 rounded"
        placeholder="Type a message..."
        aria-label="Message input"
        required
        disabled={!enabled}
      />
      <Button type="submit" disabled={sending || !input.trim() || !enabled} variant="default" className="px-4">
        {sending ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

export default MessageForm;