'use client'

import React from 'react'

interface ProgressBarProps {
  percentage: number
  height?: number
  animated?: boolean
  showLabel?: boolean
}

export function ProgressBar({
  percentage,
  height = 8,
  animated = true,
  showLabel = false
}: ProgressBarProps) {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100)
  
  // Determine color based on percentage
  const getColorClass = () => {
    if (validPercentage < 30) return 'bg-red-500'
    if (validPercentage < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span>{validPercentage}% Complete</span>
          <span>{100 - validPercentage}% Remaining</span>
        </div>
      )}
      <div 
        className="progress-bar" 
        style={{ height: `${height}px` }}
      >
        <div 
          className={`progress-bar-fill ${animated ? 'transition-all duration-1000' : ''}`}
          style={{ 
            width: `${validPercentage}%`,
          }}
          role="progressbar"
          aria-valuenow={validPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  )
}
