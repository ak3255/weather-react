import { WiDust } from 'react-icons/wi';
import type { AirQualityData } from '../services/weather';

interface Props {
  airQuality: AirQualityData;
}

export const AirQuality = ({ airQuality }: Props) => (
  <div className="flex flex-col items-center">
    <WiDust className="text-3xl" />
    <span className="text-sm">Air Quality</span>
    <span className={`text-lg ${airQuality.color}`}>
      {airQuality.description}
    </span>
  </div>
);