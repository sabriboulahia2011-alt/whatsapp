import Image from 'next/image';
import React from 'react';

interface UserAvatarProps {
  avatar?: string | null;
  name?: string;
  size?: number;
}

const getInitials = (name?: string) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const UserAvatar: React.FC<UserAvatarProps> = ({ avatar, name, size = 48 }) => (
  <div
    className="rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
    style={{ width: size, height: size }}
  >
    {avatar ? (
      <Image src={avatar} alt={name || 'User'} className="w-full h-full object-cover" />
    ) : (
      <span className="text-gray-600 text-lg font-bold">{getInitials(name)}</span>
    )}
  </div>
);

export default UserAvatar; 