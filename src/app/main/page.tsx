'use client'

import { CompetitionCard } from '@/components/ui/competition-card'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  
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
  
  const handleEnterClick = (id: string) => {
    router.push(`/main/competitions/${id}`)
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Competitions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      
      <div className="mt-8 text-center">
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
          Load More Competitions
        </button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Winners Gallery</h2>
          <p className="mb-4">See our latest lucky winners and their prizes</p>
          <button className="bg-white text-red-600 font-bold py-2 px-4 rounded hover:bg-gray-100">
            View Winners
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Instant Wins</h2>
          <p className="mb-4">Try your luck with our instant win games</p>
          <button className="bg-white text-orange-600 font-bold py-2 px-4 rounded hover:bg-gray-100">
            Play Now
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Daily Bonus</h2>
          <p className="mb-4">Login daily to claim your bonus rewards</p>
          <button className="bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-100">
            Claim Bonus
          </button>
        </div>
      </div>
    </div>
  )
}
