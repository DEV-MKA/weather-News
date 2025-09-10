import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { NewsService } from '../services/NewsService';
import { filterNewsByWeather } from '../utils/weatherFilter';

export const useNews = () => {
  const { state, dispatch } = useApp();

  const refreshNews = async () => {
    if (!state.weather) return;

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
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh news' });
    }
  };

  useEffect(() => {
    if (state.weather) {
      refreshNews();
    }
  }, [state.settings.newsCategories]);

  return { refreshNews };
};