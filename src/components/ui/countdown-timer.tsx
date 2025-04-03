'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  endDate: string | Date
  className?: string
  onComplete?: () => void
}

export function CountdownTimer({ endDate, className, onComplete }: CountdownTimerProps) {
  const [days, setDays] = React.useState(0)
  const [hours, setHours] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      const end = new Date(endDate).getTime()
      const now = new Date().getTime()
      const distance = end - now
      
      if (distance < 0) {
        clearInterval(interval)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        
        if (onComplete) {
          onComplete()
        }
        return
      }
      
      // Calculate time units
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [endDate, onComplete])
  
  return (
    <div className={cn("flex justify-between", className)}>
      <div className="text-center">
        <div className="bg-gray-100 rounded-md p-2 min-w-[3rem]">
          <span className="text-xl font-bold">{days}</span>
        </div>
        <div className="text-xs mt-1">Days</div>
      </div>
      <div className="text-center">
        <div className="bg-gray-100 rounded-md p-2 min-w-[3rem]">
          <span className="text-xl font-bold">{hours}</span>
        </div>
        <div className="text-xs mt-1">Hours</div>
      </div>
      <div className="text-center">
        <div className="bg-gray-100 rounded-md p-2 min-w-[3rem]">
          <span className="text-xl font-bold">{minutes}</span>
        </div>
        <div className="text-xs mt-1">Mins</div>
      </div>
      <div className="text-center">
        <div className="bg-gray-100 rounded-md p-2 min-w-[3rem]">
          <span className="text-xl font-bold">{seconds}</span>
        </div>
        <div className="text-xs mt-1">Secs</div>
      </div>
    </div>
  )
}
