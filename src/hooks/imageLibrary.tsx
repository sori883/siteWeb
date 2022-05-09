import axios from 'lib/axios';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import {
  ImageLibraryHook,
  CreateActionParam,
  FetchImagesList,
  ImageItem
} from 'types/image/imageLibrary';

// axios header
const headers = { "content-type": "multipart/form-data" };

export const useImageLibrary = (pageIndex = 1): ImageLibraryHook => {

  const apiUrl = `/api/fetchAllImages?page=${pageIndex}`;
  const { data: images, error, mutate } = useSWR<FetchImagesList>(apiUrl, () =>
    axios.get<FetchImagesList>(apiUrl)
      .then((res) => res.data)
  );

  const createAction = async (imagesList: CreateActionParam): Promise<void> => {
    // フォームデータ作成
    const formData = new FormData();
    imagesList.forEach((image:File, index: number) => {
      formData.append(`images[${index}]`, image);
    });

    await axios
      .post('/api/storeImage', formData, { headers })
      .then(() => {
        toast.success('画像をアップロードしました');
        mutate(images);
      })
      .catch(() => {
        toast.error('画像アップロードに失敗しました');
      });
  };

  const deleteAction = async (image: ImageItem): Promise<void> => {
    await axios
      .delete(`/api/deleteImage/${image.id}`)
      .then(() => {
        toast.success('削除に成功しました');
        mutate(images);
      })
      .catch(() => {
        toast.error('削除に失敗しました');
      });
  };

  return {
    images,
    error,
    createAction,
    deleteAction
  };
};