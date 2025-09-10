import { AppState } from '../types';

export const initialState: AppState = {
  weather: null,
  forecast: [],
  news: [],
  loading: false,
  error: null,
  settings: {
    temperatureUnit: 'celsius',
    newsCategories: ['general'],
  },
};


export const WEATHER_CONDITIONS = {
  THUNDERSTORM: 'Thunderstorm',
  DRIZZLE: 'Drizzle',
  RAIN: 'Rain',
  SNOW: 'Snow',
  ATMOSPHERE: 'Atmosphere',
  CLEAR: 'Clear',
  CLOUDS: 'Clouds',
};

export const TEMPERATURE_THRESHOLDS = {
  COLD: 10, 
  HOT: 25,  
};

export const NEWS_CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
] as const;

export const DEFAULT_NEWS_CATEGORIES = ['general'];

export const COUNTRIES = {
  US: 'us',
  GB: 'gb',
  CA: 'ca',
  AU: 'au',
  DE: 'de',
  FR: 'fr',
} as const;

export const DEFAULT_COUNTRY = COUNTRIES.US;

export const API_CONFIG = {
  WEATHER: {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    TIMEOUT: 10000,
  },
  NEWS: {
    BASE_URL: 'https://newsapi.org/v2',
    TIMEOUT: 10000,
  },
};

export const ERROR_MESSAGES = {
  LOCATION_PERMISSION: 'Location permission is required to fetch weather data',
  LOCATION_UNAVAILABLE: 'Unable to retrieve your location',
  WEATHER_FETCH: 'Failed to fetch weather data',
  NEWS_FETCH: 'Failed to fetch news articles',
  NETWORK_ERROR: 'Network error. Please check your connection',
};

export const COLORS = {
  PRIMARY: '#007AFF',
  SECONDARY: '#5856D6',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  ERROR: '#FF3B30',
  BACKGROUND: '#F2F2F7',
  CARD: '#FFFFFF',
  TEXT: '#000000',
  TEXT_SECONDARY: '#8E8E93',
  BORDER: '#C6C6C8',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};