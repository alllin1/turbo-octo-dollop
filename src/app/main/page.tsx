'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Sample competition data
  const competitions = [
    {
      id: '1',
      title: 'Win a Luxury Sports Car',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
      ticketPrice: 4.99,
      percentageSold: 75,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    },
    {
      id: '2',
      title: 'Dream Holiday Package',
      imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1000',
      ticketPrice: 2.99,
      percentageSold: 45,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    },
    {
      id: '3',
      title: '£10,000 Cash Prize',
      imageUrl: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=1000',
      ticketPrice: 1.99,
      percentageSold: 90,
      endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    },
    {
      id: '4',
      title: 'Gaming Setup Bundle',
      imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000',
      ticketPrice: 3.49,
      percentageSold: 60,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    }
  ]
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Auto-rotate featured competitions on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % competitions.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [competitions.length])
  
  const handleEnterClick = (id: string) => {
    router.push(`/main/competitions/${id}`)
  }
  
  // Handle swipe for featured competitions
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      setActiveIndex((current) => (current + 1) % competitions.length)
    }
    
    if (isRightSwipe) {
      setActiveIndex((current) => (current - 1 + competitions.length) % competitions.length)
    }
    
    setTouchEnd(0)
    setTouchStart(0)
  }
  
  // Render skeleton loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 animate-fade-in">
        <div className="skeleton h-10 w-3/4 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card">
              <div className="skeleton aspect-[16/9]"></div>
              <div className="p-4">
                <div className="skeleton h-6 w-3/4 mb-4"></div>
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-8 w-full mb-4"></div>
                <div className="skeleton h-10 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Competitions</h1>
      
      {/* Featured competition carousel for mobile */}
      <div className="md:hidden mb-8">
        <div 
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {competitions.map((competition) => (
              <div key={competition.id} className="w-full flex-shrink-0">
                <div className="card mx-2">
                  <div className="relative aspect-[16/9]">
                    <img
                      src={competition.imageUrl}
                      alt={competition.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                      £{competition.ticketPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{competition.title}</h3>
                    <button 
                      onClick={() => handleEnterClick(competition.id)}
                      className="btn btn-primary w-full"
                    >
                      Enter Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-4">
            {competitions.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 mx-1 rounded-full ${i === activeIndex ? 'bg-red-600' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Regular grid for desktop */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
        {competitions.map((competition) => (
          <div key={competition.id} className="card">
            <div className="relative aspect-[16/9]">
              <img
                src={competition.imageUrl}
                alt={competition.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                £{competition.ticketPrice.toFixed(2)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{competition.title}</h3>
              <button 
                onClick={() => handleEnterClick(competition.id)}
                className="btn btn-primary w-full"
              >
                Enter Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Horizontal scroll container for mobile */}
      <div className="md:hidden mt-8">
        <h2 className="text-xl font-bold mb-4">More Competitions</h2>
        <div className="scroll-container">
          {competitions.map((competition) => (
            <div key={competition.id} className="scroll-item">
              <div className="card h-full">
                <div className="relative aspect-[16/9]">
                  <img
                    src={competition.imageUrl}
                    alt={competition.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                    £{competition.ticketPrice.toFixed(2)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{competition.title}</h3>
                  <button 
                    onClick={() => handleEnterClick(competition.id)}
                    className="btn btn-primary w-full"
                  >
                    Enter Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center hide-on-mobile">
        <button className="btn btn-outline">
          Load More Competitions
        </button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Winners Gallery</h2>
          <p className="mb-4">See our latest lucky winners and their prizes</p>
          <button className="bg-white text-red-600 font-bold py-2 px-4 rounded hover:bg-gray-100 touch-target">
            View Winners
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Instant Wins</h2>
          <p className="mb-4">Try your luck with our instant win games</p>
          <button className="bg-white text-orange-600 font-bold py-2 px-4 rounded hover:bg-gray-100 touch-target">
            Play Now
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Daily Bonus</h2>
          <p className="mb-4">Login daily to claim your bonus rewards</p>
          <button className="bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-100 touch-target">
            Claim Bonus
          </button>
        </div>
      </div>
    </div>
  )
}
