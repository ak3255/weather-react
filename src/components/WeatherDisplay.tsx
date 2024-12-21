import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import type { WeatherData } from '../services/weather';

interface Props {
  weather: WeatherData;
}

export const WeatherDisplay = ({ weather }: Props) => (
  <div className="text-white">
    <h1 className="text-4xl font-light mb-2">{weather.cityName}</h1>
    <div className="text-8xl font-thin mb-6">{weather.temperature}°</div>
    <div className="text-2xl capitalize mb-8">{weather.description}</div>
    
    <div className="grid grid-cols-3 gap-4 bg-black/20 rounded-xl p-4">
      <div className="flex flex-col items-center">
        <WiThermometer className="text-3xl" />
        <span className="text-sm">Feels like</span>
        <span className="text-lg">{weather.feelsLike}°</span>
      </div>
      <div className="flex flex-col items-center">
        <WiHumidity className="text-3xl" />
        <span className="text-sm">Humidity</span>
        <span className="text-lg">{weather.humidity}%</span>
      </div>
      <div className="flex flex-col items-center">
        <WiStrongWind className="text-3xl" />
        <span className="text-sm">Wind</span>
        <span className="text-lg">{weather.windSpeed} m/s</span>
      </div>
    </div>
  </div>
);