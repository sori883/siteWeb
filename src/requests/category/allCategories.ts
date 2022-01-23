import apiClient from 'lib/apiClient';
import { CategoryList } from 'types/category'

export async function fetchAllCategories(): Promise<CategoryList> {
  const res  = await apiClient.get('/api/fetchAllCategories');
  return res.data.data.categories;
};