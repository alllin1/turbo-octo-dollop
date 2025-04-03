'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { MobileNavigation } from './mobile-navigation'
import { useTheme } from '@/providers/theme-provider'

type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold">
            RAFFLE PLATFORM
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/main/competitions" className="hover:text-orange-400">
              Competitions
            </Link>
            <Link href="/main/winners" className="hover:text-orange-400">
              Winners
            </Link>
            <Link href="/main/instant-wins" className="hover:text-orange-400">
              Instant Wins
            </Link>
            <div className="flex space-x-2">
              <Link href="/main/cart" className="p-2 bg-red-600 rounded-full hover:bg-red-700">
                Cart
              </Link>
              <Link href="/main/profile" className="p-2 bg-gray-700 rounded-full hover:bg-gray-800">
                Profile
              </Link>
              <button 
                onClick={toggleTheme}
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      
      <footer className="bg-black text-white p-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Raffle Platform. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center space-x-4 text-sm">
              <Link href="/terms" className="hover:text-orange-400 mb-2 md:mb-0">
                T&Cs
              </Link>
              <Link href="/privacy" className="hover:text-orange-400 mb-2 md:mb-0">
                Privacy
              </Link>
              <Link href="/about" className="hover:text-orange-400 mb-2 md:mb-0">
                About
              </Link>
              <Link href="/contact" className="hover:text-orange-400 mb-2 md:mb-0">
                Contact
              </Link>
              <Link href="/faq" className="hover:text-orange-400 mb-2 md:mb-0">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Mobile navigation */}
      <MobileNavigation />
    </div>
  )
}
