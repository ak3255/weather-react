import { Observable } from '@nativescript/core';
import { WeatherService } from './services/weather.service';
import * as Geolocation from '@nativescript/geolocation';

export class WeatherViewModel extends Observable {
  private weatherService: WeatherService;
  private _isLoading = false;
  private _error = false;
  private _errorMessage = '';
  private _temperature: number | null = null;
  private _feelsLike: number | null = null;
  private _humidity: number | null = null;
  private _description = '';
  private _cityName = '';

  constructor() {
    super();
    this.weatherService = new WeatherService();
    this.loadWeather();
  }

  // Getters and setters
  get isLoading(): boolean { return this._isLoading; }
  set isLoading(value: boolean) {
    if (this._isLoading !== value) {
      this._isLoading = value;
      this.notifyPropertyChange('isLoading', value);
    }
  }

  get error(): boolean { return this._error; }
  set error(value: boolean) {
    if (this._error !== value) {
      this._error = value;
      this.notifyPropertyChange('error', value);
    }
  }

  get errorMessage(): string { return this._errorMessage; }
  set errorMessage(value: string) {
    if (this._errorMessage !== value) {
      this._errorMessage = value;
      this.notifyPropertyChange('errorMessage', value);
    }
  }

  get temperature(): number | null { return this._temperature; }
  set temperature(value: number | null) {
    if (this._temperature !== value) {
      this._temperature = value;
      this.notifyPropertyChange('temperature', value);
    }
  }

  get feelsLike(): number | null { return this._feelsLike; }
  set feelsLike(value: number | null) {
    if (this._feelsLike !== value) {
      this._feelsLike = value;
      this.notifyPropertyChange('feelsLike', value);
    }
  }

  get humidity(): number | null { return this._humidity; }
  set humidity(value: number | null) {
    if (this._humidity !== value) {
      this._humidity = value;
      this.notifyPropertyChange('humidity', value);
    }
  }

  get description(): string { return this._description; }
  set description(value: string) {
    if (this._description !== value) {
      this._description = value;
      this.notifyPropertyChange('description', value);
    }
  }

  get cityName(): string { return this._cityName; }
  set cityName(value: string) {
    if (this._cityName !== value) {
      this._cityName = value;
      this.notifyPropertyChange('cityName', value);
    }
  }

  async loadWeather() {
    try {
      this.isLoading = true;
      this.error = false;
      this.errorMessage = '';

      const hasPermission = await Geolocation.enableLocationRequest();
      if (!hasPermission) {
        throw new Error('Location permission is required to get weather information.');
      }

      const location = await Geolocation.getCurrentLocation({
        desiredAccuracy: Geolocation.Accuracy.high,
        maximumAge: 5000,
        timeout: 20000
      });

      const weatherData = await this.weatherService.getWeather(
        location.latitude,
        location.longitude
      );

      this.temperature = weatherData.temperature;
      this.feelsLike = weatherData.feelsLike;
      this.humidity = weatherData.humidity;
      this.description = weatherData.description;
      this.cityName = weatherData.cityName;

    } catch (error) {
      this.error = true;
      this.errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to load weather information. Please try again.';
      console.error('Error loading weather:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onRefresh() {
    this.loadWeather();
  }
}