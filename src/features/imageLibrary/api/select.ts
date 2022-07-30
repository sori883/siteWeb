import axios from 'lib/axios';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import useSWRInfinite from "swr/infinite";
import { SWRConfiguration } from 'swr';
import { FetchImagesList, ImageItem } from 'features/imageLibrary/types/imageLibrary';
import {
  ImageInput,
  setImageInput
} from 'features/imageLibrary/types/select';

type ImagesList = ImageItem[];

type HookReturn = {
  imageInput: ImageInput;
  setImageInput: setImageInput;
  images: ImageItem[] | undefined;
  error: Error | undefined;
  size: number;
  isValidating: boolean;
  isLast: boolean;
  loadMoreImages: () => void;
  interval: number;
  setInterval: Dispatch<SetStateAction<number>>;
}

// 1ページ当たりの画像表示数
const LIMIT = 15;

// アイキャッチセレクター
export const useSelectImages = (config: SWRConfiguration, id: number | null): HookReturn => {

  // 無限ロード可(0>interval)否(0=interval)
  const [interval, setInterval] = useState<number>(10000);
  // アイキャッチ選択値を格納
  const [imageInput, setImageInput] = useState<ImageInput>(id);
  
  const getKey = (pageIndex: number, previousPageData: ImagesList): string | null => {
    if (previousPageData && !previousPageData.length) return null;
    return `api/fetchSelectorImage?page=${pageIndex + 1}`;
  };

  const fetcher = (url: string):Promise<ImagesList> => axios.get<FetchImagesList>(url).then((res) => res.data.data);

  const { data: selectImages, isValidating, error, size, setSize } = useSWRInfinite<ImagesList, Error>(
    getKey, fetcher, config
  );

  const loadMoreImages = ():void => {
    setSize(size + 1);
    setInterval(0);
  };

  useEffect(() => {
    if(isValidating) return;
    setInterval(10000);
  }, [isValidating]);
  

  // 配列をフラットにする
  const images = selectImages ? selectImages.flat() : undefined;
  // ページングの最後か判定する
  const isLast = selectImages ? selectImages.filter((list) => list.length < LIMIT).length > 0 : false;

  return {
    imageInput,
    setImageInput,
    images,
    isValidating,
    size,
    error,
    isLast,
    loadMoreImages,
    interval,
    setInterval
  };
};