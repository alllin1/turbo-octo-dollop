'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max: number
  className?: string
  label?: string
}

export function ProgressBar({ value, max, className, label }: ProgressBarProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100)
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={cn(
            "bg-gradient-to-r from-red-600 to-orange-500 h-2.5 rounded-full",
            className
          )} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
