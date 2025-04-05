'use client'

import React, { useState, useRef, ReactNode } from 'react'

interface SwipeContainerProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  className?: string
}

export function SwipeContainer({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className = ''
}: SwipeContainerProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsSwiping(true)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > threshold
    const isRightSwipe = distance < -threshold
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
    
    // Reset values
    setTouchStart(null)
    setTouchEnd(null)
    setIsSwiping(false)
  }
  
  return (
    <div
      ref={containerRef}
      className={`swipe-container ${isSwiping ? 'swiping' : ''} ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {children}
    </div>
  )
}
