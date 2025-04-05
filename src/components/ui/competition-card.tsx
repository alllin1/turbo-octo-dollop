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
      className={`card ${isTouching ? 'scale-98' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="card-image-container">
        {isLoading && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        <img
          src={imageUrl}
          alt={title}
          className="card-image"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="card-image-overlay"></div>
        <div className="card-badge">
          £{ticketPrice.toFixed(2)}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title" title={title}>
          {title}
        </h3>
        
        <div className="card-price">
          <span className="card-price-amount">£{ticketPrice.toFixed(2)}</span>
          <span className="card-price-label">per ticket</span>
        </div>
        
        <div className="card-progress">
          <div className="card-progress-label">
            <span>{percentageSold}% Sold</span>
            <span>{100 - percentageSold}% Remaining</span>
          </div>
          <div className="card-progress-bar">
            <div 
              className="card-progress-fill" 
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
        </div>
        
        <div className="card-timer">
          <div className="card-timer-label">Competition ends in:</div>
          <CountdownTimer endDate={endDate} />
        </div>
        
        <div className="card-actions">
          <button 
            onClick={onEnterClick}
            className="btn btn-primary w-full"
            aria-label={`Enter ${title} competition`}
          >
            Enter Now
          </button>
        </div>
      </div>
    </div>
  )
}
