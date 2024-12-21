import { useState } from 'react';
import { searchLocation, LocationResult } from '../services/weather';
import { formatLocation } from '../utils/formatting';

interface Props {
  onLocationSelect: (lat: number, lon: number) => void;
}

export const SearchBar = ({ onLocationSelect }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      setIsSearching(true);
      try {
        const locations = await searchLocation(value);
        setResults(locations);
      } catch (error) {
        console.error('Search failed:', error);
      }
      setIsSearching(false);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (result: LocationResult) => {
    onLocationSelect(result.lat, result.lon);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md mb-8">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:bg-white/30 transition"
      />
      
      {isSearching && (
        <div className="absolute top-12 w-full text-white text-center">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute top-12 w-full bg-white/20 backdrop-blur-md rounded-lg overflow-hidden">
          {results.map((result) => (
            <button
              key={`${result.name}-${result.lat}-${result.lon}`}
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-2 text-left text-white hover:bg-white/20 transition"
            >
              {formatLocation(result.name, result.state, result.country)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};