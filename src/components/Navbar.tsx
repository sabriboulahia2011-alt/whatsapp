'use client';
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const logout = useUserStore((s) => s.logout);
  const router = useRouter();
  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-gray-800 dark:bg-gray-900 text-white md:px-8 py-4">
      <div className="w-full flex justify-between items-center md:px-8 py-2">
        {/* Left Section */}
        <section className="flex space-x-4">
          <Link href="/chat" className="hover:underline hover:text-green-400 dark:hover:text-green-300">Chats</Link>
          <Link href="/profile" className="hover:underline hover:text-green-400 dark:hover:text-green-300">Profile</Link>
          <Link href="/settings" className="hover:underline hover:text-green-400 dark:hover:text-green-300">Settings</Link>
        </section>
        {/* Middle Section */}
        <section className="flex justify-center">
          <Link href="/" className="text-lg font-semibold hover:underline">WhatsApp Clone</Link>
        </section>
        {/* Right Section */}
        <section className="flex space-x-4 items-center">
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </section>
      </div>
    </nav>
  );
} 