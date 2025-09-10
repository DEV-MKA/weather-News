export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  main: string;
  city: string;
  country: string;
}

export interface ForecastData {
  date: string;
  temp: number;
  min_temp: number;
  max_temp: number;
  description: string;
  icon: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: string;
}

export interface AppSettings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  newsCategories: string[];
}

export interface AppState {
  weather: WeatherData | null;
  forecast: ForecastData[];
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  settings: AppSettings;
}