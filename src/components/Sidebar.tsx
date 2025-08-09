import React from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import UserAvatar from './UserAvatar';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const router = useRouter();

  return (
    <aside className="w-64 p-4 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full text-gray-900 dark:text-white">
      <div className="flex flex-col items-center mb-8">
        <UserAvatar avatar={user?.avatar} name={user?.name} size={56} />
        <div className="mt-2 font-semibold text-lg text-gray-800 dark:text-gray-200">{user?.name || 'User'}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{user?.status || ''}</div>
      </div>
      <nav className="flex-1 space-y-2">
        <Link href="/chat" className="block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-green-900">Chats</Link>
        <Link href="/profile" className="block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-green-900">Profile</Link>
        <Link href="/settings" className="block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-green-900">Settings</Link>
      </nav>
      <button
        className="mt-8 px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded hover:bg-red-600 dark:hover:bg-red-800"
        onClick={() => {
          logout();
          router.push('/login');
        }}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar; 