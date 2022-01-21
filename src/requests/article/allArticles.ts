import apiClient from 'lib/apiClient';
import { Articles } from 'types/article'

export async function fetchAllArticles(): Promise<Articles> {
  const res  = await apiClient.get('/api/fetchAllArticles');
  return res.data.data.articles;
};