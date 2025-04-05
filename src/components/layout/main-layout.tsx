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
      <header className="site-header">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="logo">
            RAFFLE PLATFORM
          </Link>
          <nav className="main-nav space-x-2">
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
              <Link href="/main/cart" className="btn btn-accent btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
              <Link href="/main/profile" className="btn btn-primary btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <button 
                onClick={toggleTheme}
                className="btn btn-outline btn-icon"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden btn btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="site-footer">
        <div className="container mx-auto">
          <div className="footer-grid">
            <div>
              <h3 className="text-xl font-bold mb-4">Raffle Platform</h3>
              <p className="text-neutral-400 mb-4">Experience the thrill of winning luxury prizes with our premium raffle competitions.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="footer-links">
                <Link href="/terms" className="hover:text-orange-400">
                  Terms & Conditions
                </Link>
                <Link href="/privacy" className="hover:text-orange-400">
                  Privacy Policy
                </Link>
                <Link href="/about" className="hover:text-orange-400">
                  About Us
                </Link>
                <Link href="/contact" className="hover:text-orange-400">
                  Contact
                </Link>
                <Link href="/faq" className="hover:text-orange-400">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Raffle Platform. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Mobile navigation */}
      <MobileNavigation />
    </div>
  )
}
