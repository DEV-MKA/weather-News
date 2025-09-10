import { WeatherData, ForecastData } from '../types';
import { weatherApi } from './api';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export class WeatherService {
  static async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await weatherApi.get('/weather', {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      });

      return {
        temp: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        main: response.data.weather[0].main,
        city: response.data.name,
        country: response.data.sys.country,
      };
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }

  static async get5DayForecast(lat: number, lon: number): Promise<ForecastData[]> {
    try {
      const response = await weatherApi.get('/forecast', {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        },
      });

      return response.data.list
        .filter((item: any, index: number) => index % 8 === 0)
        .slice(0, 5)
        .map((item: any) => ({
          date: item.dt_txt,
          temp: item.main.temp,
          min_temp: item.main.temp_min,
          max_temp: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));
    } catch (error) {
      throw new Error('Failed to fetch forecast data');
    }
  }
}

