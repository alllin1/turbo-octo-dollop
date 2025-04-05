import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
  delay = 0,
  duration = 500,
  direction = 'up',
  distance = 20,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Initial styles based on direction
  const getInitialStyles = () => {
    switch (direction) {
      case 'up':
        return { transform: `translateY(${distance}px)` };
      case 'down':
        return { transform: `translateY(-${distance}px)` };
      case 'left':
        return { transform: `translateX(${distance}px)` };
      case 'right':
        return { transform: `translateX(-${distance}px)` };
      case 'none':
        return {};
      default:
        return { transform: `translateY(${distance}px)` };
    }
  };

  // Animation styles
  const animationStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : undefined,
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
    ...(!isVisible ? getInitialStyles() : {}),
  };

  return (
    <div
      ref={ref}
      className={className}
      style={animationStyles}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
