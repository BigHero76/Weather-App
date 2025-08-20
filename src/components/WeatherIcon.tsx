import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudFog,
  Moon,
  CloudSun
} from 'lucide-react';
import type { WeatherCondition } from '@/types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

export function WeatherIcon({ condition, size = 24, className = '' }: WeatherIconProps) {
  const iconProps = {
    size,
    className: `${className}`,
  };

  const getIcon = () => {
    const main = condition.main.toLowerCase();
    const isNight = condition.icon.includes('n');

    switch (main) {
      case 'clear':
        return isNight ? <Moon {...iconProps} /> : <Sun {...iconProps} />;
      case 'clouds':
        if (condition.description.includes('few') || condition.description.includes('scattered')) {
          return isNight ? <CloudSun {...iconProps} /> : <CloudSun {...iconProps} />;
        }
        return <Cloud {...iconProps} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} />;
      case 'snow':
        return <CloudSnow {...iconProps} />;
      case 'thunderstorm':
        return <Zap {...iconProps} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  return getIcon();
}