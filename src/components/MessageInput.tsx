import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MessageInput = () => (
  <div className="p-4 border-t flex gap-2">
    <Input className="flex-1" placeholder="Type a message..." aria-label="Message input" />
    <Button type="button" variant="default">Send</Button>
  </div>
);

export default MessageInput;