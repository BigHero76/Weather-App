import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { ForecastSection } from './ForecastSection';
import { weatherService } from '@/services/weatherService';
import { getWeatherType, getBackgroundClasses } from '@/utils/weatherUtils';
import type { WeatherData } from '@/types/weather';

const DEFAULT_WEATHER: WeatherData = {
  current: {
    location: 'London, UK',
    temperature: 18,
    condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
    humidity: 65,
    windSpeed: 12,
    feelsLike: 20,
    visibility: 10,
    pressure: 1013
  },
  forecast: [
    {
      date: '2025-01-12',
      dayName: 'Today',
      minTemp: 12,
      maxTemp: 20,
      condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      humidity: 65,
      windSpeed: 12
    },
    {
      date: '2025-01-13',
      dayName: 'Mon',
      minTemp: 15,
      maxTemp: 22,
      condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      humidity: 58,
      windSpeed: 8
    },
    {
      date: '2025-01-14',
      dayName: 'Tue',
      minTemp: 10,
      maxTemp: 16,
      condition: { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      humidity: 80,
      windSpeed: 15
    },
    {
      date: '2025-01-15',
      dayName: 'Wed',
      minTemp: 8,
      maxTemp: 14,
      condition: { id: 600, main: 'Snow', description: 'light snow', icon: '13d' },
      humidity: 85,
      windSpeed: 10
    },
    {
      date: '2025-01-16',
      dayName: 'Thu',
      minTemp: 16,
      maxTemp: 24,
      condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      humidity: 55,
      windSpeed: 6
    }
  ]
};

export function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData>(DEFAULT_WEATHER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.searchWeatherData(city);
      if (data) {
        setWeatherData(data);
        toast({
          title: "Weather updated",
          description: `Showing weather for ${data.current.location}`,
        });
      } else {
        throw new Error('City not found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    const currentLocation = weatherData.current.location;
    const cityName = currentLocation.split(',')[0];
    fetchWeatherData(cityName);
  }, [weatherData.current.location, fetchWeatherData]);

  const weatherType = getWeatherType(weatherData.current.condition);
  const backgroundClasses = getBackgroundClasses(weatherType);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${backgroundClasses}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {weatherType === 'rainy' && (
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
        
        {weatherType === 'snowy' && (
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, 200],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-light text-white mb-2 drop-shadow-lg">
            Weather App
          </h1>
          <p className="text-white/80 text-lg">
            Beautiful weather, beautifully presented
          </p>
        </motion.div>

        {/* Search */}
        <SearchBar onSearch={fetchWeatherData} loading={loading} />

        {/* Weather content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={weatherData.current.location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center"
          >
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-white"
              >
                <p className="text-xl mb-4">😔 {error}</p>
                <p className="text-white/80">Please try searching for another city</p>
              </motion.div>
            ) : (
              <>
                <CurrentWeather 
                  weather={weatherData.current}
                  onRefresh={handleRefresh}
                  loading={loading}
                />
                <ForecastSection forecast={weatherData.forecast} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}