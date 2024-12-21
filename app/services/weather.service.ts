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

export class WeatherService {
  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
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
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }
}