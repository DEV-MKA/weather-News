import axios from 'axios';

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export const weatherApi = axios.create({
  baseURL: OPENWEATHER_BASE_URL,
});

export const newsApi = axios.create({
  baseURL: NEWS_API_BASE_URL,
});