// src/app/page.tsx
import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to login page since this is the root
  // You can modify this logic based on authentication state
  redirect('/login')
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          WhatsApp Clone
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connecting you with the world
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-4">Loading...</p>
      </div>
    </div>
  )
}
