import { TagDeleteHook } from 'types/tag'
import apiClient from 'lib/apiClient';

export const useTagDelete= ():TagDeleteHook  => {

  const tagDelete = async (req: number): Promise<void> => {
    try {
      const res = await apiClient.delete(`/api/deleteTag/${req}`);
      console.log(res);
    } catch(e) {
      console.log(req);
    }
  }

  return {
    tagDelete,
  };
};