import axios from 'lib/axios';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import {
  FetchAllTagList,
  TagItem,
  Tag,
} from 'features/tag/types/tag';

type HookReturn = {
  tags: FetchAllTagList | undefined;
  error: Error | undefined;
  deleteAction: (tag: Tag) => Promise<void>;
  updateAction: (tag: Tag) => Promise<void>;
}

export const useTags = (pageIndex = 1): HookReturn => {
  const apiUrl = `/api/fetchAllTags?page=${pageIndex}`;
  const { data: tags, error, mutate } = useSWR<FetchAllTagList>(apiUrl, () =>
    axios.get<FetchAllTagList>(apiUrl)   
      .then((res) => res.data)
  );

  const deleteAction = async (tag: TagItem): Promise<void> => {
    await axios
      .delete(`/api/deleteTag/${tag.id}`)
      .then(() => {
        toast.success('削除に成功しました');
        mutate(tags);
      })
      .catch(() => {
        toast.error('削除に失敗しました');
      });
  };

  const updateAction = async (tag: Tag): Promise<void> => {
    await axios
      .patch(`/api/updateTag/${tag.id}`, tag)
      .then(() => {
        mutate(tags);
        toast.success('登録に成功しました');
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      });
  };

  return {
    tags,
    error,
    deleteAction,
    updateAction
  };

};