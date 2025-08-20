import { motion } from 'framer-motion';
import { Droplets, Wind, Eye, Gauge, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeatherIcon } from './WeatherIcon';
import type { CurrentWeather } from '@/types/weather';
import { formatTemperature, formatWindSpeed, formatHumidity, capitalizeFirst } from '@/utils/weatherUtils';

interface CurrentWeatherProps {
  weather: CurrentWeather;
  onRefresh: () => void;
  loading: boolean;
}

export function CurrentWeather({ weather, onRefresh, loading }: CurrentWeatherProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Header with location and refresh button */}
          <div className="flex justify-between items-center mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-xl md:text-2xl font-bold">{weather.location}</h1>
              <p className="text-white/80 text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onRefresh}
                disabled={loading}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-10 w-10"
              >
                <RefreshCw 
                  className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} 
                />
              </Button>
            </motion.div>
          </div>

          {/* Main weather display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Temperature and condition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <WeatherIcon 
                  condition={weather.condition} 
                  size={64} 
                  className="text-white drop-shadow-lg md:w-20 md:h-20"
                />
                <div>
                  <span className="text-5xl md:text-7xl font-thin text-white drop-shadow-lg">
                    {formatTemperature(weather.temperature)}
                  </span>
                  <div className="text-sm md:text-lg text-white/90 mt-1 md:mt-2">
                    Feels like {formatTemperature(weather.feelsLike)}
                  </div>
                </div>
              </div>
              <p className="text-lg md:text-2xl font-light text-white/90 capitalize">
                {capitalizeFirst(weather.condition.description)}
              </p>
            </motion.div>

            {/* Weather details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              <div className="bg-white/5 rounded-xl p-3 md:p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="text-blue-300" size={18} />
                  <span className="text-white/80 text-xs md:text-sm">Humidity</span>
                </div>
                <p className="text-lg md:text-2xl font-semibold text-white">
                  {formatHumidity(weather.humidity)}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3 md:p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Wind className="text-green-300" size={18} />
                  <span className="text-white/80 text-xs md:text-sm">Wind</span>
                </div>
                <p className="text-lg md:text-2xl font-semibold text-white">
                  {formatWindSpeed(weather.windSpeed)}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3 md:p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="text-purple-300" size={18} />
                  <span className="text-white/80 text-xs md:text-sm">Visibility</span>
                </div>
                <p className="text-lg md:text-2xl font-semibold text-white">
                  {weather.visibility} km
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3 md:p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Gauge className="text-orange-300" size={18} />
                  <span className="text-white/80 text-xs md:text-sm">Pressure</span>
                </div>
                <p className="text-lg md:text-2xl font-semibold text-white">
                  {weather.pressure} hPa
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}