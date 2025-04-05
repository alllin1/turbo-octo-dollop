'use client'

import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endDate: string
  onComplete?: () => void
  compact?: boolean
}

export function CountdownTimer({
  endDate,
  onComplete,
  compact = false
}: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate).getTime() - new Date().getTime()
    
    if (difference <= 0) {
      if (onComplete) onComplete()
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true
      }
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false
    }
  }
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [isUrgent, setIsUrgent] = useState(false)
  
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft()
      setTimeLeft(updatedTimeLeft)
      
      // Check if less than 24 hours remaining
      const totalHours = updatedTimeLeft.days * 24 + updatedTimeLeft.hours
      setIsUrgent(totalHours < 24 && !updatedTimeLeft.isComplete)
      
      if (updatedTimeLeft.isComplete) {
        clearInterval(timer)
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [endDate])
  
  if (compact) {
    return (
      <div className={`flex items-center space-x-1 font-medium ${isUrgent ? 'text-red-600 animate-pulse' : ''}`}>
        <span>{timeLeft.days}d</span>
        <span>{timeLeft.hours}h</span>
        <span>{timeLeft.minutes}m</span>
        <span>{timeLeft.seconds}s</span>
      </div>
    )
  }
  
  return (
    <div className="countdown-timer">
      <div className={`countdown-unit ${isUrgent ? 'bg-red-100 dark:bg-red-900' : ''}`}>
        <span className={`countdown-value ${isUrgent ? 'text-red-600 dark:text-red-400' : ''}`}>
          {timeLeft.days}
        </span>
        <span className="countdown-label">Days</span>
      </div>
      
      <div className={`countdown-unit ${isUrgent ? 'bg-red-100 dark:bg-red-900' : ''}`}>
        <span className={`countdown-value ${isUrgent ? 'text-red-600 dark:text-red-400' : ''}`}>
          {timeLeft.hours}
        </span>
        <span className="countdown-label">Hours</span>
      </div>
      
      <div className={`countdown-unit ${isUrgent ? 'bg-red-100 dark:bg-red-900' : ''}`}>
        <span className={`countdown-value ${isUrgent ? 'text-red-600 dark:text-red-400' : ''}`}>
          {timeLeft.minutes}
        </span>
        <span className="countdown-label">Mins</span>
      </div>
      
      <div className={`countdown-unit ${isUrgent ? 'bg-red-100 dark:bg-red-900' : ''}`}>
        <span className={`countdown-value ${isUrgent ? 'text-red-600 dark:text-red-400' : ''}`}>
          {timeLeft.seconds}
        </span>
        <span className="countdown-label">Secs</span>
      </div>
    </div>
  )
}
