import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Links Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2 text-gray-100 dark:text-gray-300">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline hover:text-green-400 dark:hover:text-green-300">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline hover:text-green-400 dark:hover:text-green-300">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline hover:text-green-400 dark:hover:text-green-300">Services</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline hover:text-green-400 dark:hover:text-green-300">Contact</Link>
              </li>
            </ul>
          </div>
          {/* Social Media Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2 text-gray-100 dark:text-gray-300">Follow Us</h2>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-400 dark:hover:text-gray-300">Facebook</Link>
              <Link href="#" className="hover:text-gray-400 dark:hover:text-gray-300">Twitter</Link>
              <Link href="#" className="hover:text-gray-400 dark:hover:text-gray-300">Instagram</Link>
              <Link href="#" className="hover:text-gray-400 dark:hover:text-gray-300">LinkedIn</Link>
            </div>
          </div>
          {/* Copyright Section */}
          <div className="text-center md:text-right text-gray-300 dark:text-gray-400">
            <p>
              &copy; {new Date().getUTCFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer; 