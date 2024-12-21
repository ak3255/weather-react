interface AirQualityLevel {
  description: string;
  color: string;
}

const AQI_LEVELS: Record<number, AirQualityLevel> = {
  1: { description: 'Good', color: 'text-green-400' },
  2: { description: 'Fair', color: 'text-yellow-400' },
  3: { description: 'Moderate', color: 'text-orange-400' },
  4: { description: 'Poor', color: 'text-red-400' },
  5: { description: 'Very Poor', color: 'text-purple-400' }
};

export const getAirQualityDescription = (aqi: number) => ({
  aqi,
  ...AQI_LEVELS[aqi]
});