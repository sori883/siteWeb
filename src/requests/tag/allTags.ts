import apiClient from 'lib/apiClient';
import { Tags } from 'types/tag'

export async function fetchAllTags(): Promise<Tags> {
  const res  = await apiClient.get('/api/fetchAllTags');
  return res.data.data.tags;
};