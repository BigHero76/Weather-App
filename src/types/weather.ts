export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  location: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  visibility: number;
  pressure: number;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  minTemp: number;
  maxTemp: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'thunderstorm' | 'clear' | 'mist';