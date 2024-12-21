import { useState, useEffect } from 'react';
import { WeatherData, getWeather } from '../services/weather';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async (lat?: number, lon?: number) => {
    try {
      setLoading(true);
      setError(null);

      let position: GeolocationPosition;
      
      if (lat !== undefined && lon !== undefined) {
        position = { coords: { latitude: lat, longitude: lon } } as GeolocationPosition;
      } else {
        position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }

      const data = await getWeather(
        position.coords.latitude,
        position.coords.longitude
      );
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return { weather, loading, error, refresh: loadWeather };
};