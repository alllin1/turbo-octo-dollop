'use client'

import { useState } from 'react'
import { ProgressBar } from './progress-bar'
import { CountdownTimer } from './countdown-timer'

interface CompetitionCardProps {
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
  onEnterClick
}: CompetitionCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isTouching, setIsTouching] = useState(false)
  
  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false)
  }
  
  // Touch event handlers for better mobile interaction
  const handleTouchStart = () => {
    setIsTouching(true)
  }
  
  const handleTouchEnd = () => {
    setIsTouching(false)
  }

  return (
    <div 
      className={`card transition-all duration-300 ${isTouching ? 'scale-98' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
          £{ticketPrice.toFixed(2)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2" title={title}>
          {title}
        </h3>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>{percentageSold}% Sold</span>
            <span>{100 - percentageSold}% Remaining</span>
          </div>
          <ProgressBar percentage={percentageSold} />
        </div>
        
        <div className="mb-4">
          <div className="text-sm mb-1">Competition ends in:</div>
          <CountdownTimer endDate={endDate} />
        </div>
        
        <button 
          onClick={onEnterClick}
          className="btn btn-primary w-full touch-target"
          aria-label={`Enter ${title} competition`}
        >
          Enter Now
        </button>
      </div>
    </div>
  )
}
