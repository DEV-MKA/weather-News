import { NewsArticle } from '../types';

export const filterNewsByWeather = (
  articles: NewsArticle[],
  temp: number,
  weatherMain: string
): NewsArticle[] => {
  let filteredArticles: NewsArticle[] = [];
  
  if (temp < 10) { 
    filteredArticles = articles.filter(article => 
      article.title.toLowerCase().includes('sad') ||
      article.title.toLowerCase().includes('depressing') ||
      article.title.toLowerCase().includes('tragic') ||
      article.description.toLowerCase().includes('sad') ||
      article.description.toLowerCase().includes('depressing')
    );
  } else if (temp > 25) { 
    filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes('fear') ||
      article.title.toLowerCase().includes('scary') ||
      article.title.toLowerCase().includes('anxious') ||
      article.title.toLowerCase().includes('warning')
    );
  } else { 
    filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes('happy') ||
      article.title.toLowerCase().includes('success') ||
      article.title.toLowerCase().includes('positive') ||
      article.title.toLowerCase().includes('achievement')
    );
  }

  if (filteredArticles.length === 0) {
    return articles.slice(0, 10);
  }

  return filteredArticles.slice(0, 10);
};