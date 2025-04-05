'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileNavigation() {
  const pathname = usePathname()
  const [startX, setStartX] = useState<number | null>(null)
  const [currentX, setCurrentX] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const isActive = (path: string) => {
    return pathname.startsWith(path) ? 'active' : ''
  }
  
  // Handle scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  // Touch event handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return
    setCurrentX(e.touches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (startX === null || currentX === null) return
    
    const diff = startX - currentX
    
    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      // Swipe left - show more options
      if (diff > 0) {
        // Could implement additional navigation features here
      }
      // Swipe right - go back
      else {
        window.history.back()
      }
    }
    
    setStartX(null)
    setCurrentX(null)
  }
  
  return (
    <div 
      ref={navRef}
      className={`mobile-nav ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Link href="/main" className={isActive('/main')}>
        <div className="touch-target">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <span>Home</span>
      </Link>
      
      <Link href="/main/competitions" className={isActive('/main/competitions')}>
        <div className="touch-target">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        </div>
        <span>Prizes</span>
      </Link>
      
      <Link href="/main/winners" className={isActive('/main/winners')}>
        <div className="touch-target">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <span>Winners</span>
      </Link>
      
      <Link href="/main/cart" className={isActive('/main/cart')}>
        <div className="touch-target">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <span>Cart</span>
      </Link>
      
      <Link href="/main/profile" className={isActive('/main/profile')}>
        <div className="touch-target">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span>Profile</span>
      </Link>
    </div>
  )
}
