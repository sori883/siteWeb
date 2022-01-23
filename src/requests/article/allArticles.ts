import apiClient from 'lib/apiClient';
import { ArticlesList } from 'types/article'

export async function fetchAllArticles(): Promise<ArticlesList> {
  const res  = await apiClient.get('/api/fetchAllArticles');
  return res.data.data.articles;
};