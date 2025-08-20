import { motion } from 'framer-motion';
import { ForecastCard } from './ForecastCard';
import type { ForecastDay } from '@/types/weather';

interface ForecastSectionProps {
  forecast: ForecastDay[];
}

export function ForecastSection({ forecast }: ForecastSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
        5-Day Forecast
      </h2>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {forecast.map((day, index) => (
          <ForecastCard 
            key={day.date} 
            forecast={day} 
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}