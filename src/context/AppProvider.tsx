import React, { useReducer, useEffect } from 'react';
import { AppContext } from './AppContext';
import { AppState, AppSettings } from '../types';
import { NewsService } from '../services/NewsService';
import { filterNewsByWeather } from '../utils/weatherFilter';
import { initialState } from '../utils/constants';

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_WEATHER'; payload: any }
  | { type: 'SET_FORECAST'; payload: any[] }
  | { type: 'SET_NEWS'; payload: any[] }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'REFRESH_NEWS' };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_WEATHER':
      return { ...state, weather: action.payload, error: null };
    
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload };
    
    case 'SET_NEWS':
      return { ...state, news: action.payload };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    
    case 'REFRESH_NEWS':
      return { ...state, news: [] };
    
    default:
      return state;
  }
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    const fetchNews = async () => {
      if (state.weather) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          const newsPromises = state.settings.newsCategories.map(category =>
            NewsService.getTopHeadlines(category)
          );
          
          const newsResults = await Promise.all(newsPromises);
          const allNews = newsResults.flat();
          const filteredNews = filterNewsByWeather(
            allNews,
            state.weather.temp,
            state.weather.main
          );
          
          dispatch({ type: 'SET_NEWS', payload: filteredNews });
          dispatch({ type: 'SET_LOADING', payload: false });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch news' });
        }
      }
    };

    fetchNews();
  }, [state.weather, state.settings.newsCategories]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};