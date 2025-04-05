import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endDate: Date | string;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  style?: 'default' | 'compact' | 'elegant';
  showLabels?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  onComplete,
  size = 'md',
  style = 'default',
  showLabels = true
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: false
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isComplete: false
      };
    } else {
      timeLeft.isComplete = true;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      
      if (updatedTimeLeft.isComplete && onComplete) {
        onComplete();
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  // Size classes
  const sizeClasses = {
    sm: {
      container: 'text-xs',
      number: 'text-sm font-bold',
      label: 'text-xs'
    },
    md: {
      container: 'text-sm',
      number: 'text-lg font-bold',
      label: 'text-xs'
    },
    lg: {
      container: 'text-base',
      number: 'text-2xl font-bold',
      label: 'text-sm'
    }
  };

  // Style classes
  const styleClasses = {
    default: {
      container: 'grid grid-cols-4 gap-1 text-center',
      unit: 'flex flex-col',
      number: 'text-white',
      label: 'text-secondary'
    },
    compact: {
      container: 'flex items-center justify-center space-x-2 text-center',
      unit: 'flex items-baseline',
      number: 'text-white',
      label: 'text-secondary ml-1'
    },
    elegant: {
      container: 'grid grid-cols-4 gap-2 text-center',
      unit: 'flex flex-col bg-tertiary rounded-lg p-2 shadow-md',
      number: 'text-accent',
      label: 'text-secondary mt-1'
    }
  };

  // If countdown is complete
  if (timeLeft.isComplete) {
    return (
      <div className="text-center">
        <span className="text-ruby font-bold">Competition Ended</span>
      </div>
    );
  }

  // Render based on style
  if (style === 'compact') {
    return (
      <div className={styleClasses[style].container}>
        <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
          <span className={`${styleClasses[style].number} ${sizeClasses[size].number}`}>
            {timeLeft.days}
          </span>
          {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>d</span>}
        </div>
        <span className="text-secondary">:</span>
        <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
          <span className={`${styleClasses[style].number} ${sizeClasses[size].number}`}>
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>h</span>}
        </div>
        <span className="text-secondary">:</span>
        <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
          <span className={`${styleClasses[style].number} ${sizeClasses[size].number}`}>
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>m</span>}
        </div>
        <span className="text-secondary">:</span>
        <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
          <span className={`${styleClasses[style].number} ${sizeClasses[size].number}`}>
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>s</span>}
        </div>
      </div>
    );
  }

  // Default and elegant styles
  return (
    <div className={styleClasses[style].container}>
      <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
        <span className={`${styleClasses[style].number} ${sizeClasses[size].number}`}>
          {timeLeft.days}
        </span>
        {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>Days</span>}
      </div>
      <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
        <span className={`${styleClasses[style].number} ${sizeClasses[size].number}`}>
          {timeLeft.hours.toString().padStart(2, '0')}
        </span>
        {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>Hours</span>}
      </div>
      <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
        <span className={`${styleClasses[style].number} ${sizeClasses[size].number}`}>
          {timeLeft.minutes.toString().padStart(2, '0')}
        </span>
        {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>Mins</span>}
      </div>
      <div className={`${styleClasses[style].unit} ${sizeClasses[size].container}`}>
        <span className={`${styleClasses[style].number} ${sizeClasses[size].number} ${timeLeft.seconds < 10 ? 'text-ruby animate-pulse' : ''}`}>
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
        {showLabels && <span className={`${styleClasses[style].label} ${sizeClasses[size].label}`}>Secs</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;
