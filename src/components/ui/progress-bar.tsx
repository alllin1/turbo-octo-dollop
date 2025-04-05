import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'gold' | 'success';
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  showPercentage = true,
  size = 'md',
  color = 'gold',
  animated = true
}) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'bg-gradient-primary',
    gold: 'bg-gradient-gold',
    success: 'bg-gradient-to-r from-emerald to-emerald/70'
  };
  
  // Animation class
  const animationClass = animated ? 'transition-all duration-1000 ease-out' : '';
  
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-secondary text-sm">{label}</span>
          )}
          {showPercentage && (
            <span className="text-accent font-medium text-sm">{clampedPercentage}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} h-full rounded-full ${animationClass}`}
          style={{ width: `${clampedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
