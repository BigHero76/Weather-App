import type { WeatherData, WeatherCondition, CurrentWeather, ForecastDay } from '@/types/weather';

// Climate data for different regions to generate realistic weather
const climateData: Record<string, {
  tempRange: [number, number]; // [min, max] in Celsius
  commonConditions: WeatherCondition[];
  humidity: [number, number];
  windSpeed: [number, number];
}> = {
  // Tropical cities (hot and humid year-round)
  tropical: {
    tempRange: [24, 38],
    commonConditions: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' },
      { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' },
      { id: 200, main: 'Thunderstorm', description: 'thunderstorm with light rain', icon: '11d' }
    ],
    humidity: [60, 90],
    windSpeed: [5, 20]
  },
  // Temperate cities (moderate seasons)
  temperate: {
    tempRange: [5, 25],
    commonConditions: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      { id: 300, main: 'Drizzle', description: 'light intensity drizzle', icon: '09d' }
    ],
    humidity: [45, 75],
    windSpeed: [8, 25]
  },
  // Cold cities (can have snow and freezing temperatures)
  cold: {
    tempRange: [-15, 15],
    commonConditions: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      { id: 600, main: 'Snow', description: 'light snow', icon: '13d' },
      { id: 601, main: 'Snow', description: 'snow', icon: '13d' },
      { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }
    ],
    humidity: [65, 85],
    windSpeed: [10, 30]
  },
  // Desert cities (hot and dry)
  desert: {
    tempRange: [15, 45],
    commonConditions: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      { id: 721, main: 'Haze', description: 'haze', icon: '50d' },
      { id: 731, main: 'Dust', description: 'sand/dust whirls', icon: '50d' }
    ],
    humidity: [20, 50],
    windSpeed: [3, 15]
  }
};

// City climate mapping
const cityClimateMap: Record<string, keyof typeof climateData> = {
  // Tropical cities
  'chennai': 'tropical',
  'mumbai': 'tropical',
  'delhi': 'tropical',
  'bangalore': 'tropical',
  'kolkata': 'tropical',
  'hyderabad': 'tropical',
  'bangkok': 'tropical',
  'singapore': 'tropical',
  'kuala lumpur': 'tropical',
  'jakarta': 'tropical',
  'manila': 'tropical',
  'ho chi minh city': 'tropical',
  'miami': 'tropical',
  'honolulu': 'tropical',
  'rio de janeiro': 'tropical',
  'lagos': 'tropical',
  'cairo': 'tropical',
  
  // Temperate cities
  'london': 'temperate',
  'paris': 'temperate',
  'berlin': 'temperate',
  'amsterdam': 'temperate',
  'rome': 'temperate',
  'madrid': 'temperate',
  'new york': 'temperate',
  'chicago': 'temperate',
  'san francisco': 'temperate',
  'seattle': 'temperate',
  'toronto': 'temperate',
  'vancouver': 'temperate',
  'sydney': 'temperate',
  'melbourne': 'temperate',
  'tokyo': 'temperate',
  'seoul': 'temperate',
  'beijing': 'temperate',
  
  // Cold cities
  'moscow': 'cold',
  'stockholm': 'cold',
  'oslo': 'cold',
  'helsinki': 'cold',
  'copenhagen': 'cold',
  'reykjavik': 'cold',
  'montreal': 'cold',
  'winnipeg': 'cold',
  'anchorage': 'cold',
  'murmansk': 'cold',
  
  // Desert cities
  'dubai': 'desert',
  'abu dhabi': 'desert',
  'riyadh': 'desert',
  'doha': 'desert',
  'kuwait city': 'desert',
  'phoenix': 'desert',
  'las vegas': 'desert',
  'tucson': 'desert',
  'alice springs': 'desert',
  'marrakech': 'desert'
};

const generateForecastForToday = (climate: keyof typeof climateData): ForecastDay[] => {
  const today = new Date();
  const forecast: ForecastDay[] = [];
  const climateInfo = climateData[climate];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const condition = climateInfo.commonConditions[Math.floor(Math.random() * climateInfo.commonConditions.length)];
    const baseTemp = Math.floor(Math.random() * (climateInfo.tempRange[1] - climateInfo.tempRange[0])) + climateInfo.tempRange[0];
    const tempVariation = Math.floor(Math.random() * 8) + 3; // 3-10 degree variation
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      minTemp: Math.max(baseTemp - tempVariation, climateInfo.tempRange[0]),
      maxTemp: Math.min(baseTemp + tempVariation, climateInfo.tempRange[1]),
      condition,
      humidity: Math.floor(Math.random() * (climateInfo.humidity[1] - climateInfo.humidity[0])) + climateInfo.humidity[0],
      windSpeed: Math.floor(Math.random() * (climateInfo.windSpeed[1] - climateInfo.windSpeed[0])) + climateInfo.windSpeed[0]
    });
  }
  
  return forecast;
};

// Updated mock weather data with realistic values
const mockWeatherData: Record<string, WeatherData> = {
  london: {
    current: {
      location: 'London, UK',
      temperature: 12,
      condition: { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
      humidity: 68,
      windSpeed: 15,
      feelsLike: 10,
      visibility: 8,
      pressure: 1013
    },
    forecast: generateForecastForToday('temperate')
  },
  'new york': {
    current: {
      location: 'New York, NY',
      temperature: 8,
      condition: { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      humidity: 72,
      windSpeed: 18,
      feelsLike: 5,
      visibility: 6,
      pressure: 1008
    },
    forecast: generateForecastForToday('temperate')
  },
  tokyo: {
    current: {
      location: 'Tokyo, Japan',
      temperature: 18,
      condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      humidity: 58,
      windSpeed: 12,
      feelsLike: 20,
      visibility: 15,
      pressure: 1020
    },
    forecast: generateForecastForToday('temperate')
  },
  sydney: {
    current: {
      location: 'Sydney, Australia',
      temperature: 22,
      condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      humidity: 65,
      windSpeed: 14,
      feelsLike: 24,
      visibility: 12,
      pressure: 1015
    },
    forecast: generateForecastForToday('temperate')
  },
  paris: {
    current: {
      location: 'Paris, France',
      temperature: 15,
      condition: { id: 300, main: 'Drizzle', description: 'light intensity drizzle', icon: '09d' },
      humidity: 75,
      windSpeed: 10,
      feelsLike: 13,
      visibility: 7,
      pressure: 1012
    },
    forecast: generateForecastForToday('temperate')
  },
  moscow: {
    current: {
      location: 'Moscow, Russia',
      temperature: -8,
      condition: { id: 600, main: 'Snow', description: 'light snow', icon: '13d' },
      humidity: 82,
      windSpeed: 20,
      feelsLike: -12,
      visibility: 3,
      pressure: 1005
    },
    forecast: generateForecastForToday('cold')
  },
  dubai: {
    current: {
      location: 'Dubai, UAE',
      temperature: 35,
      condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      humidity: 35,
      windSpeed: 8,
      feelsLike: 39,
      visibility: 20,
      pressure: 1018
    },
    forecast: generateForecastForToday('desert')
  },
  chennai: {
    current: {
      location: 'Chennai, India',
      temperature: 32,
      condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      humidity: 78,
      windSpeed: 12,
      feelsLike: 36,
      visibility: 8,
      pressure: 1010
    },
    forecast: generateForecastForToday('tropical')
  },
  mumbai: {
    current: {
      location: 'Mumbai, India',
      temperature: 29,
      condition: { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      humidity: 85,
      windSpeed: 15,
      feelsLike: 33,
      visibility: 6,
      pressure: 1008
    },
    forecast: generateForecastForToday('tropical')
  }
};

class WeatherService {
  async searchWeatherData(city: string): Promise<WeatherData | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const normalizedCity = city.toLowerCase().trim();
    const data = mockWeatherData[normalizedCity];
    
    if (data) {
      // Update forecast with current dates and realistic data
      const climate = cityClimateMap[normalizedCity] || 'temperate';
      data.forecast = generateForecastForToday(climate);
      return data;
    }
    
    // Generate realistic data for unknown cities
    return this.generateRealisticWeatherData(city);
  }

  private generateRealisticWeatherData(city: string): WeatherData {
    const normalizedCity = city.toLowerCase().trim();
    
    // Determine climate based on city name or default to temperate
    const climate = cityClimateMap[normalizedCity] || 'temperate';
    const climateInfo = climateData[climate];
    
    const condition = climateInfo.commonConditions[Math.floor(Math.random() * climateInfo.commonConditions.length)];
    const baseTemp = Math.floor(Math.random() * (climateInfo.tempRange[1] - climateInfo.tempRange[0])) + climateInfo.tempRange[0];
    const humidity = Math.floor(Math.random() * (climateInfo.humidity[1] - climateInfo.humidity[0])) + climateInfo.humidity[0];
    const windSpeed = Math.floor(Math.random() * (climateInfo.windSpeed[1] - climateInfo.windSpeed[0])) + climateInfo.windSpeed[0];
    
    return {
      current: {
        location: city,
        temperature: baseTemp,
        condition,
        humidity,
        windSpeed,
        feelsLike: baseTemp + Math.floor(Math.random() * 6) - 3,
        visibility: Math.floor(Math.random() * 15) + 5,
        pressure: Math.floor(Math.random() * 50) + 990
      },
      forecast: generateForecastForToday(climate)
    };
  }
}

export const weatherService = new WeatherService();