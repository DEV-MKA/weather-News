import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { WeatherService } from '../services/WeatherService';
import { useLocation } from './useLocation';

export const useWeather = () => {
  const { dispatch } = useApp();
  const location = useLocation();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherData();
    }
  }, [location.latitude, location.longitude]);

  const fetchWeatherData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const [currentWeather, forecast] = await Promise.all([
        WeatherService.getCurrentWeather(location.latitude, location.longitude),
        WeatherService.get5DayForecast(location.latitude, location.longitude),
      ]);

      dispatch({ type: 'SET_WEATHER', payload: currentWeather });
      dispatch({ type: 'SET_FORECAST', payload: forecast });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error:any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return { refresh: fetchWeatherData };
};