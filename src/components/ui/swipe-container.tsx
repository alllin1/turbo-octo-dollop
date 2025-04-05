import React, { useRef, useEffect, useState } from 'react';

interface SwipeContainerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  className?: string;
}

const SwipeContainer: React.FC<SwipeContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Reset swipe state when touch ends
  const resetSwipeState = () => {
    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
    setSwipeOffset(0);
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Calculate and set the swipe offset for visual feedback
    const offset = currentTouch - touchStart;
    setSwipeOffset(offset);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      resetSwipeState();
      return;
    }
    
    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -threshold;
    const isRightSwipe = distance > threshold;
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    } else if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    
    resetSwipeState();
  };

  // Add transform style based on swipe offset
  const swipeStyle = isSwiping ? {
    transform: `translateX(${swipeOffset}px)`,
    transition: 'transform 0.1s ease-out',
  } : {
    transform: 'translateX(0)',
    transition: 'transform 0.3s ease-out',
  };

  return (
    <div
      ref={containerRef}
      className={`touch-manipulation ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={swipeStyle}
    >
      {children}
    </div>
  );
};

export default SwipeContainer;
