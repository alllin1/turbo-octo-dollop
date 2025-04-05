import React, { useEffect } from 'react';
import '@/styles/animations.css';
import ScrollReveal from '@/components/ui/scroll-reveal';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import CountdownTimer from '@/components/ui/countdown-timer';
import SwipeContainer from '@/components/ui/swipe-container';

export default function MainPage() {
  // Sample data for featured competitions
  const featuredCompetitions = [
    {
      id: '1',
      title: 'Win a Luxury Sports Car',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000',
      price: '£4.99',
      percentageSold: 75,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      description: 'Experience the thrill of driving a high-performance luxury sports car with this incredible prize.'
    },
    {
      id: '2',
      title: 'Dream Holiday in Maldives',
      imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000',
      price: '£3.49',
      percentageSold: 62,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      description: 'Escape to paradise with this all-inclusive luxury holiday for two in the stunning Maldives.'
    },
    {
      id: '3',
      title: 'Ultimate Home Cinema Setup',
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000',
      price: '£2.99',
      percentageSold: 45,
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      description: 'Transform your home entertainment with this state-of-the-art cinema setup including 85" OLED TV.'
    }
  ];

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroImage = document.querySelector('.hero-image') as HTMLElement;
      const heroContent = document.querySelector('.hero-content') as HTMLElement;
      
      if (heroImage && heroContent) {
        // Parallax effect for background image
        heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        
        // Fade out effect for hero content
        heroContent.style.opacity = `${1 - scrollPosition / 700}`;
        heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal for sections
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      revealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000"
            alt="Luxury car"
            fill
            priority
            className="object-cover hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl hero-content animate-fadeInUp">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Win <span className="text-accent gold-accent-pulse">Luxury Prizes</span> for a Fraction of Their Value
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Enter our premium competitions for your chance to win life-changing prizes including luxury cars, dream holidays, and high-end technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" href="/main/competitions" className="button-hover-effect">
                Browse Competitions
              </Button>
              <Button size="lg" variant="outline" href="/main/how-it-works" className="button-hover-effect">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Competitions with Scroll Reveal */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" className="mb-10">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-3xl text-white">
                Featured <span className="text-accent">Competitions</span>
              </h2>
              <Button variant="ghost" href="/main/competitions">
                View All
              </Button>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompetitions.map((competition, index) => (
              <ScrollReveal 
                key={competition.id} 
                direction="up" 
                delay={index * 100}
                className="h-full"
              >
                <div className="bg-tertiary rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full group card-hover-effect">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={competition.imageUrl}
                      alt={competition.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold font-accent text-sm">
                        {competition.price} per ticket
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-accent transition-colors">
                      {competition.title}
                    </h3>
                    
                    <p className="text-secondary text-sm line-clamp-2">
                      {competition.description}
                    </p>
                    
                    <div className="space-y-2">
                      <ProgressBar 
                        percentage={competition.percentageSold} 
                        label="Sold" 
                        color="gold"
                        animated={true}
                        className="progress-bar-animate"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-secondary mb-1">Competition ends in:</p>
                      <CountdownTimer 
                        endDate={competition.endDate} 
                        size="sm" 
                        style="elegant"
                      />
                    </div>
                    
                    <Button 
                      href={`/main/competitions/${competition.id}`}
                      fullWidth
                      className="button-hover-effect"
                    >
                      ENTER NOW
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Scroll Reveal */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" className="mb-12">
            <h2 className="font-heading font-bold text-3xl text-white text-center">
              How It <span className="text-accent">Works</span>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-tertiary rounded-lg p-6 text-center relative shadow-md hover-lift">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold animate-pulse">1</div>
                <h3 className="font-heading font-bold text-xl text-white mt-4 mb-3">Choose a Competition</h3>
                <p className="text-secondary">Browse our range of luxury prizes and select the competition you want to enter.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-tertiary rounded-lg p-6 text-center relative shadow-md hover-lift">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold animate-pulse">2</div>
                <h3 className="font-heading font-bold text-xl text-white mt-4 mb-3">Purchase Tickets</h3>
                <p className="text-secondary">Buy as many tickets as you like to increase your chances of winning.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
              <div className="bg-tertiary rounded-lg p-6 text-center relative shadow-md hover-lift">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold animate-pulse">3</div>
                <h3 className="font-heading font-bold text-xl text-white mt-4 mb-3">Win Amazing Prizes</h3>
                <p className="text-secondary">Winners are randomly selected and notified immediately after competitions close.</p>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal direction="up" delay={400} className="text-center mt-10">
            <Button size="lg" href="/main/how-it-works" className="button-hover-effect">
              Learn More
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Winners Showcase with Horizontal Swipe on Mobile */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" className="mb-12">
            <h2 className="font-heading font-bold text-3xl text-white text-center">
              Recent <span className="text-accent">Winners</span>
            </h2>
          </ScrollReveal>
          
          <SwipeContainer className="md:grid md:grid-cols-3 gap-8 flex flex-nowrap overflow-x-auto pb-4 md:overflow-visible md:pb-0 snap-x snap-mandatory md:snap-none">
            <ScrollReveal direction="left" delay={100} className="min-w-[85%] md:min-w-0 snap-center mr-4 md:mr-0">
              <div className="bg-tertiary rounded-lg overflow-hidden shadow-md card-hover-effect h-full">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000"
                    alt="Winner with car"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-accent font-semibold">Sarah J. - London</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-lg text-white mb-2">Audi R8 Spyder</h3>
                  <p className="text-secondary text-sm">
                    "I never thought I'd win! The team was amazing and delivered my dream car right to my doorstep."
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={200} className="min-w-[85%] md:min-w-0 snap-center mr-4 md:mr-0">
              <div className="bg-tertiary rounded-lg overflow-hidden shadow-md card-hover-effect h-full">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?q=80&w=1000"
                    alt="Winner with holiday"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-accent font-semibold">Michael T. - Manchester</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-lg text-white mb-2">Luxury Bali Getaway</h3>
                  <p className="text-secondary text-sm">
                    "The holiday was even better than advertised. A truly once-in-a-lifetime experience!"
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={300} className="min-w-[85%] md:min-w-0 snap-center">
              <div className="bg-tertiary rounded-lg overflow-hidden shadow-md card-hover-effect h-full">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000"
                    alt="Winner with tech"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-accent font-semibold">Emma L. - Edinburgh</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-lg text-white mb-2">Ultimate Gaming Setup</h3>
                  <p className="text-secondary text-sm">
                    "I only bought one ticket and won! The setup is incredible and was professionally installed."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </SwipeContainer>
          
          <ScrollReveal direction="up" delay={400} className="text-center mt-10">
            <Button size="lg" variant="outline" href="/main/winners" className="button-hover-effect">
              View All Winners
            </Button>
          </ScrollReveal>
          
          <div className="flex justify-center mt-4 md:hidden">
            <p className="text-secondary text-sm">Swipe to see more winners</p>
          </div>
        </div>
      </section>

      {/* Promotional Banners with Hover Effects */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-tertiary rounded-lg overflow-hidden shadow-md relative group hover-lift">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-royal-blue opacity-90 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative p-6 z-10">
                  <h3 className="font-heading font-bold text-2xl text-white mb-3">Daily Bonus</h3>
                  <p className="text-gray-300 mb-4">Login daily to claim your bonus rewards and free tickets.</p>
                  <Button variant="outline" href="/main/daily-bonus" className="button-hover-effect">
                    Claim Now
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <div className="bg-tertiary rounded-lg overflow-hidden shadow-md relative group hover-lift">
                <div className="absolute inset-0 bg-gradient-to-r from-ruby to-primary opacity-90 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative p-6 z-10">
                  <h3 className="font-heading font-bold text-2xl text-white mb-3">Instant Wins</h3>
                  <p className="text-gray-300 mb-4">Try your luck with our instant win games for immediate prizes.</p>
                  <Button variant="outline" href="/main/instant-wins" className="button-hover-effect">
                    Play Now
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
              <div className="bg-tertiary rounded-lg overflow-hidden shadow-md relative group hover-lift">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald to-royal-blue opacity-90 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative p-6 z-10">
                  <h3 className="font-heading font-bold text-2xl text-white mb-3">Refer Friends</h3>
                  <p className="text-gray-300 mb-4">Earn free tickets when you refer friends to our platform.</p>
                  <Button variant="outline" href="/main/refer" className="button-hover-effect">
                    Refer Now
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Newsletter with Animation */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal direction="up">
            <div className="bg-tertiary rounded-lg p-8 shadow-lg hover-glow">
              <h2 className="font-heading font-bold text-2xl text-white text-center mb-4">
                Stay Updated with New Competitions
              </h2>
              <p className="text-secondary text-center mb-6">
                Subscribe to our newsletter to get notified about new competitions and exclusive offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-gray-800 border border-border-light rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent transition-all"
                />
                <Button type="submit" className="button-hover-effect">
                  Subscribe
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
