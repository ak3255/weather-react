import axios from 'axios';

const API_KEY = 'e34a5eb0b4c5ff748fdf9219a63d224e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  cityName: string;
  windSpeed: number;
}

export interface LocationResult {
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
}

export const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  
  return {
    temperature: Math.round(response.data.main.temp),
    feelsLike: Math.round(response.data.main.feels_like),
    humidity: response.data.main.humidity,
    description: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
    cityName: response.data.name,
    windSpeed: response.data.wind.speed
  };
};

export const searchLocation = async (query: string): Promise<LocationResult[]> => {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  
  return response.data.map((item: any) => ({
    lat: item.lat,
    lon: item.lon,
    name: item.name,
    country: item.country,
    state: item.state
  }));
};