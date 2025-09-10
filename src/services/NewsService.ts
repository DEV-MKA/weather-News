import { NewsArticle } from '../types';
import { newsApi } from './api';

const API_KEY = process.env.NEWS_API_KEY;

export class NewsService {
  static async getTopHeadlines(category?: string, country: string = 'us'): Promise<NewsArticle[]> {
    try {
      const response = await newsApi.get('/top-headlines', {
        params: {
          country,
          category,
          apiKey: API_KEY,
        },
      });

      return response.data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
      }));
    } catch (error) {
      throw new Error('Failed to fetch news data');
    }
  }
}
