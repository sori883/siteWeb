import axios from 'lib/axios';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import {
  Category,
  CategoryActionParam,
  CategoriesHook,
  fetchAllCategoryList,
  CategoryItem,
} from 'types/category/category';

export const useCategories = (pageIndex = 1): CategoriesHook => {
  const apiUrl = `/api/fetchAllCategories?page=${pageIndex}`;
  const { data: categories, error, mutate } = useSWR<fetchAllCategoryList>(apiUrl, (api) =>
    axios.get<fetchAllCategoryList>(api)
      .then((res) => res.data)
  );

  const deleteAction = async (category: CategoryItem): Promise<void> => {
    await axios
      .delete(`/api/deleteCategory/${category.id}`)
      .then(() => {
        toast.success('削除に成功しました');
        mutate(categories);
      })
      .catch(() => {
        toast.error('削除に失敗しました');
      });
  };

  const createAction = async (category: CategoryActionParam): Promise<void> => {
    await axios
      .post('/api/storeCategory', category)
      .then(() => {
        toast.success('登録に成功しました');
        mutate(categories);
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      });
  };

  const updateAction = async (category: Category): Promise<void> => {
    await axios
      .patch(`/api/updateCategory/${category.id}`, category)
      .then(() => {
        toast.success('登録に成功しました');
        mutate(categories);
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      });
  };

  return {
    categories,
    error,
    deleteAction,
    createAction,
    updateAction
  };
};