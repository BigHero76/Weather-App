import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import type { ForecastDay } from '@/types/weather';
import { formatTemperature } from '@/utils/weatherUtils';

interface ForecastCardProps {
  forecast: ForecastDay;
  index: number;
}

export function ForecastCard({ forecast, index }: ForecastCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex-shrink-0"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white w-32 md:w-40">
        <div className="p-4 text-center">
          <p className="text-sm font-medium mb-3 text-white/90">
            {forecast.dayName}
          </p>
          
          <div className="mb-4 flex justify-center">
            <WeatherIcon 
              condition={forecast.condition} 
              size={40}
              className="text-white drop-shadow-lg"
            />
          </div>
          
          <div className="space-y-1">
            <p className="text-lg font-bold">
              {formatTemperature(forecast.maxTemp)}
            </p>
            <p className="text-sm text-white/70">
              {formatTemperature(forecast.minTemp)}
            </p>
          </div>
          
          <div className="mt-3 space-y-1 text-xs text-white/60">
            <p>💧 {forecast.humidity}%</p>
            <p>🌪️ {Math.round(forecast.windSpeed)} km/h</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}