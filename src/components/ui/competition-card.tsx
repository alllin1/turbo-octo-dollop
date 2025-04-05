import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CompetitionCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  percentageSold: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  loading?: boolean;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  id,
  title,
  imageUrl,
  price,
  percentageSold,
  daysRemaining,
  hoursRemaining,
  minutesRemaining,
  secondsRemaining,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="bg-tertiary rounded-lg overflow-hidden shadow-md transition-all duration-300 h-full animate-pulse">
        <div className="h-48 bg-gray-700"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-8 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-tertiary rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-semibold font-accent text-sm">
            {price} per ticket
          </p>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-heading font-bold text-xl text-white group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Sold</span>
            <span className="text-accent font-medium">{percentageSold}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-gold h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-1 text-center">
          <TimeUnit value={daysRemaining} unit="Days" />
          <TimeUnit value={hoursRemaining} unit="Hours" />
          <TimeUnit value={minutesRemaining} unit="Mins" />
          <TimeUnit value={secondsRemaining} unit="Secs" />
        </div>
        
        <Link 
          href={`/main/competitions/${id}`}
          className="block w-full bg-gradient-gold text-center py-2 rounded-md font-accent font-semibold text-black shadow-gold-sm hover:shadow-gold-md transition-all mt-4"
        >
          ENTER NOW
        </Link>
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; unit: string }> = ({ value, unit }) => (
  <div className="flex flex-col">
    <span className="text-white font-bold text-lg">{value}</span>
    <span className="text-secondary text-xs">{unit}</span>
  </div>
);

export default CompetitionCard;
