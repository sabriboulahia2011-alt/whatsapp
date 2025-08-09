import React from 'react';

interface TypingIndicatorProps {
  typingUsers: string[];
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingUsers }) => (
  typingUsers.length > 0 ? (
    <div className="text-sm text-gray-500 mt-2" aria-live="polite" aria-atomic="true">
      {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
    </div>
  ) : null
);

export default TypingIndicator; 