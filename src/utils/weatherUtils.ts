import type { WeatherType, WeatherCondition } from '@/types/weather';

export const getWeatherType = (condition: WeatherCondition): WeatherType => {
  const main = condition.main.toLowerCase();
  const description = condition.description.toLowerCase();
  
  if (main === 'clear' && description.includes('clear')) {
    return 'sunny';
  } else if (main === 'clouds') {
    return 'cloudy';
  } else if (main === 'rain' || main === 'drizzle') {
    return 'rainy';
  } else if (main === 'snow') {
    return 'snowy';
  } else if (main === 'thunderstorm') {
    return 'thunderstorm';
  } else if (main === 'mist' || main === 'fog' || main === 'haze') {
    return 'mist';
  }
  
  return 'clear';
};

export const getBackgroundClasses = (weatherType: WeatherType): string => {
  switch (weatherType) {
    case 'sunny':
      return 'bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400';
    case 'clear':
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
    case 'cloudy':
      return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
    case 'rainy':
      return 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800';
    case 'snowy':
      return 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300';
    case 'thunderstorm':
      return 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
    case 'mist':
      return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
    default:
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
  }
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°`;
};

export const formatWindSpeed = (speed: number): string => {
  return `${Math.round(speed)} km/h`;
};

export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getWeatherAnimation = (weatherType: WeatherType): string => {
  switch (weatherType) {
    case 'rainy':
      return 'animate-pulse';
    case 'snowy':
      return 'animate-bounce';
    case 'thunderstorm':
      return 'animate-pulse';
    default:
      return '';
  }
};