'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProgressBar } from '@/components/ui/progress-bar'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { formatCurrency } from '@/lib/utils'

export default function CompetitionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  
  // Sample competition data - in a real app, this would be fetched from Supabase
  const competition = {
    id: params.id,
    title: 'Win a Luxury Sports Car',
    description: 'Win this amazing luxury sports car with 500 horsepower and premium leather interior. The perfect combination of style, comfort, and performance.',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1000',
    ],
    ticketPrice: 4.99,
    totalTickets: 5000,
    ticketsSold: 3750,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    skillQuestion: 'What is 2+2?',
    skillOptions: ['3', '4', '5', '6'],
    skillAnswer: '4',
    specifications: [
      'Engine: V8 Twin Turbo',
      'Horsepower: 500 HP',
      'Acceleration: 0-60 mph in 3.5 seconds',
      'Top Speed: 200 mph',
      'Interior: Premium leather',
      'Color: Metallic Red',
    ],
    drawDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    drawMethod: 'Live stream on our social media channels',
  }
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 100) {
      setTicketQuantity(value)
    }
  }
  
  const handleAddToCart = () => {
    if (!selectedAnswer) {
      alert('Please answer the skill question')
      return
    }
    
    // In a real app, this would add the tickets to the cart in state/context
    alert(`Added ${ticketQuantity} tickets to cart`)
    router.push('/main/cart')
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/main')}
          className="flex items-center"
        >
          &larr; Back to Competitions
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Images */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={competition.imageUrl} 
              alt={competition.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {competition.galleryImages.map((image, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                <img 
                  src={image} 
                  alt={`${competition.title} - Image ${index + 1}`} 
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column - Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{competition.title}</h1>
          <p className="text-xl text-gray-700 mb-4">Value: {formatCurrency(competition.ticketPrice * competition.totalTickets)}</p>
          
          <div className="mb-6">
            <ProgressBar 
              value={competition.ticketsSold} 
              max={competition.totalTickets} 
              label="Tickets Sold"
            />
            <p className="text-sm text-gray-600 mt-1">
              {competition.ticketsSold} of {competition.totalTickets} tickets sold
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Draw ends in:</h3>
            <CountdownTimer endDate={competition.endDate} />
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skill Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{competition.skillQuestion}</p>
              <div className="grid grid-cols-2 gap-2">
                {competition.skillOptions.map((option) => (
                  <Button
                    key={option}
                    variant={selectedAnswer === option ? 'default' : 'outline'}
                    onClick={() => setSelectedAnswer(option)}
                    className="w-full"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1, 5, 10, 25].map((quantity) => (
                  <Button
                    key={quantity}
                    variant={ticketQuantity === quantity ? 'default' : 'outline'}
                    onClick={() => setTicketQuantity(quantity)}
                    className="w-full"
                  >
                    {quantity}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[50, 75, 100, 'Custom'].map((quantity) => (
                  <Button
                    key={quantity.toString()}
                    variant={
                      typeof quantity === 'number' && ticketQuantity === quantity 
                        ? 'default' 
                        : 'outline'
                    }
                    onClick={() => {
                      if (typeof quantity === 'number') {
                        setTicketQuantity(quantity)
                      }
                    }}
                    className="w-full"
                  >
                    {quantity}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="custom-quantity" className="text-sm font-medium">
                  Custom quantity:
                </label>
                <Input
                  id="custom-quantity"
                  type="number"
                  min={1}
                  max={100}
                  value={ticketQuantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-24"
                />
              </div>
              
              <div className="mt-4 text-right">
                <p className="text-lg font-bold">
                  Total: {formatCurrency(ticketQuantity * competition.ticketPrice)}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAddToCart} 
                className="w-full"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Prize Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{competition.description}</p>
              
              <h3 className="font-semibold mb-2">Specifications:</h3>
              <ul className="list-disc pl-5 mb-4">
                {competition.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
              
              <h3 className="font-semibold mb-2">Draw Information:</h3>
              <p className="mb-1">Draw Date: {new Date(competition.drawDate).toLocaleDateString()}</p>
              <p>Draw Method: {competition.drawMethod}</p>
            </CardContent>
          </Card>
          
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <p className="font-semibold">Free Postal Entry Available</p>
            <button className="text-red-600 underline">Click here for details</button>
          </div>
        </div>
      </div>
    </div>
  )
}
