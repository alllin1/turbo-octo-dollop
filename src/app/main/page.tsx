'use client'

import React, { useState } from 'react'
import { CompetitionCard } from '@/components/ui/competition-card'
import { useRouter } from 'next/navigation'
import { SwipeContainer } from '@/components/ui/swipe-container'

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
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleEnterClick = (id: string) => {
    router.push(`/main/competitions/${id}`)
  }
  
  // Handle carousel navigation
  const handlePrevSlide = () => {
    setActiveIndex((current) => (current - 1 + competitions.length) % competitions.length)
  }
  
  const handleNextSlide = () => {
    setActiveIndex((current) => (current + 1) % competitions.length)
  }
  
  // Render skeleton loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 animate-fade-in">
        <div className="skeleton h-10 w-3/4 mb-8 rounded-md"></div>
        
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
    <div className="animate-fade-in">
      <div className="bg-gradient-to-r from-primary-dark to-primary py-16 mb-12">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Win Your Dream Prizes</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Enter our premium competitions for your chance to win luxury cars, dream holidays, and life-changing cash prizes.</p>
          <button className="btn btn-accent">Browse All Competitions</button>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <div className="featured-section">
          <h2 className="featured-heading text-3xl font-bold mb-8">Featured Competitions</h2>
          
          {/* Mobile Carousel */}
          <div className="md:hidden mb-8">
            <div className="carousel">
              <SwipeContainer
                onSwipeLeft={handleNextSlide}
                onSwipeRight={handlePrevSlide}
                className="w-full"
              >
                <div 
                  className="carousel-inner"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {competitions.map((competition) => (
                    <div key={competition.id} className="carousel-item">
                      <CompetitionCard
                        title={competition.title}
                        imageUrl={competition.imageUrl}
                        ticketPrice={competition.ticketPrice}
                        percentageSold={competition.percentageSold}
                        endDate={competition.endDate}
                        onEnterClick={() => handleEnterClick(competition.id)}
                      />
                    </div>
                  ))}
                </div>
              </SwipeContainer>
              
              <div className="carousel-indicators">
                {competitions.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-indicator ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {competitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                title={competition.title}
                imageUrl={competition.imageUrl}
                ticketPrice={competition.ticketPrice}
                percentageSold={competition.percentageSold}
                endDate={competition.endDate}
                onEnterClick={() => handleEnterClick(competition.id)}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="btn btn-outline">
              View All Competitions
            </button>
          </div>
        </div>
        
        <div className="promo-section">
          <div className="promo-grid">
            <div className="promo-card promo-card-winners">
              <h2 className="promo-title">Winners Gallery</h2>
              <p className="promo-text">See our latest lucky winners and their prizes</p>
              <button className="btn btn-accent">
                View Winners
              </button>
            </div>
            
            <div className="promo-card promo-card-instant">
              <h2 className="promo-title">Instant Wins</h2>
              <p className="promo-text">Try your luck with our instant win games</p>
              <button className="btn btn-accent">
                Play Now
              </button>
            </div>
            
            <div className="promo-card promo-card-bonus">
              <h2 className="promo-title">Daily Bonus</h2>
              <p className="promo-text">Login daily to claim your bonus rewards</p>
              <button className="btn btn-accent">
                Claim Bonus
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="featured-heading text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-light text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Competition</h3>
              <p>Browse our range of luxury prizes and select the competition you want to enter.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Purchase Tickets</h3>
              <p>Buy your tickets securely online. The more tickets you buy, the higher your chances.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-dark text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Win Amazing Prizes</h3>
              <p>Winners are drawn at random and notified immediately. Good luck!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
