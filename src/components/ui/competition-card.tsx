'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'
import { calculateTimeRemaining } from '@/lib/utils'

interface CompetitionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  imageUrl: string
  ticketPrice: number
  percentageSold: number
  endDate: string
  onEnterClick: () => void
}

export function CompetitionCard({
  title,
  imageUrl,
  ticketPrice,
  percentageSold,
  endDate,
  onEnterClick,
  className,
  ...props
}: CompetitionCardProps) {
  const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining(endDate))
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [endDate])
  
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate">{title}</h3>
        <p className="text-gray-700 mb-2">{formatCurrency(ticketPrice)} per ticket</p>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-gradient-to-r from-red-600 to-orange-500 h-2.5 rounded-full" 
            style={{ width: `${percentageSold}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{percentageSold}% Sold</p>
        
        {/* Countdown timer */}
        <div className="flex justify-between text-sm text-gray-700 mb-4">
          <div className="text-center">
            <div className="font-bold">{timeRemaining.days}</div>
            <div>Days</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{timeRemaining.hours}</div>
            <div>Hours</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{timeRemaining.minutes}</div>
            <div>Mins</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{timeRemaining.seconds}</div>
            <div>Secs</div>
          </div>
        </div>
        
        <button 
          onClick={onEnterClick}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          ENTER NOW
        </button>
      </div>
    </div>
  )
}
