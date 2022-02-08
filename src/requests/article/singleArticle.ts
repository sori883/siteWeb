import apiClient from 'lib/apiClient';
import { ArticleSingle } from 'types/article'

export async function fetchSingleArticles(id: number): Promise<ArticleSingle> {
  const res  = await apiClient.get(`/api/fetchArticle/${id}`);
  return res.data.data;
};