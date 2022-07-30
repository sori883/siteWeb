import axios from 'lib/axios';
import { useState } from 'react';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import {
  CreateActionParam,
  FetchImagesList,
  ImageItem
} from 'features/imageLibrary/types/imageLibrary';

type HoookReturn = {
  images: FetchImagesList | undefined;
  error: Error | undefined;
  createAction: (images: CreateActionParam) => Promise<void>;
  deleteAction: (images: ImageItem) => Promise<void>;
  isLoading: boolean;
}

// axios header
const headers = { "content-type": "multipart/form-data" };

export const useImageLibrary = (pageIndex = 1): HoookReturn => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiUrl = `/api/fetchAllImages?page=${pageIndex}`;
  const { data: images, error, mutate } = useSWR<FetchImagesList>(apiUrl, () =>
    axios.get<FetchImagesList>(apiUrl)
      .then((res) => res.data)
  );

  const createAction = async (imagesList: CreateActionParam): Promise<void> => {
    setIsLoading(true);
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
      }).finally(() => {
        setIsLoading(false);
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
    deleteAction,
    isLoading
  };
};