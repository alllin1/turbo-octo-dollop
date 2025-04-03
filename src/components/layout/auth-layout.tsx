'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-800 to-black">
      <div className="container mx-auto p-4">
        <div className="flex justify-center my-8">
          <Link href="/" className="text-3xl font-bold text-white">
            RAFFLE PLATFORM
          </Link>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
          {children}
        </div>
        
        <div className="text-center mt-8 text-white text-sm">
          <p>&copy; {new Date().getFullYear()} Raffle Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/terms" className="hover:text-orange-400">
              T&Cs
            </Link>
            <Link href="/privacy" className="hover:text-orange-400">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-orange-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
