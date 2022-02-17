import { TagUpdateHook, TagUpdate } from 'types/tag';
import apiClient from 'lib/apiClient';

export const useTagUpdate = ():TagUpdateHook  => {
  const tagUpdate = async (id: number, req: TagUpdate):Promise<void> => {
    try {
      const res = await apiClient.patch(`/api/updateTag/${id}`, req);
      console.log(res.data)
    } catch(e) {
      console.log(e);
    };
  };

  return {
    tagUpdate,
  };
};