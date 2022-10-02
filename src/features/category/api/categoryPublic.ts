import axios from 'lib/axios';
import { FetchCategoryListPublic, CategoryPublic } from 'features/category/types/categoryPublic';

const apiUrl = '/api/fetchIndexCategories';

export const fetchCategoryIndex =  async ():Promise<CategoryPublic[]> => {
  const response = await axios.get<FetchCategoryListPublic>(apiUrl);
  return response.data.data;
};