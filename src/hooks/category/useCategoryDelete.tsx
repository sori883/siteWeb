import { CategoryDeleteHook, CategoryItemId } from 'types/category'
import apiClient from 'lib/apiClient';

export const useCategoryDelete= ():CategoryDeleteHook  => {

  const categoryDelete = async (req: CategoryItemId): Promise<void> => {
    try {
      const res = await apiClient.delete(`/api/deleteCategory/${req}`);
      console.log(res);
    } catch(e) {
      console.log(req);
    }
  }

  return {
    categoryDelete,
  };
};