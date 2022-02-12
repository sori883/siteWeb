import { CategoryStoreHook, CategoryCreateForm } from 'types/category';
import apiClient from 'lib/apiClient';

export const useCategoryStore = ():CategoryStoreHook  => {    
  const categoryStore = async (req: CategoryCreateForm):Promise<void> => {
    try {
      console.log(req)
      const res = await apiClient.post('/api/storeCategory', req);
      console.log(res.data)
    } catch(e) {
      console.log(e);
    };
  };

  return {
    categoryStore,
  };
};