import { CategoryUpdateHook, CategoryUpdate } from 'types/category';
import apiClient from 'lib/apiClient';

export const useCategoryUpdate = ():CategoryUpdateHook  => {
  const categoryUpdate = async (id: number, req: CategoryUpdate):Promise<void> => {
    try {
      const res = await apiClient.patch(`/api/updateCategory/${id}`, req);
      console.log(res.data)
    } catch(e) {
      console.log(e);
    };
  };

  return {
    categoryUpdate,
  };
};