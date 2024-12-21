import { useWeather } from './hooks/useWeather';
import { WeatherDisplay } from './components/WeatherDisplay';
import { SearchBar } from './components/SearchBar';

export default function App() {
  const { weather, loading, error, refresh } = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <SearchBar onLocationSelect={(lat, lon) => refresh(lat, lon)} />
      
      {loading && (
        <div className="text-white">Loading weather data...</div>
      )}
      
      {error && (
        <div className="text-white text-center">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => refresh()}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
          >
            Try Again
          </button>
        </div>
      )}
      
      {weather && <WeatherDisplay weather={weather} />}
      
      {weather && (
        <button 
          onClick={() => refresh()}
          className="mt-8 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-white"
        >
          Refresh
        </button>
      )}
    </div>
  );
}