import { Dispatch, SetStateAction } from "react";
import {  ImageItem } from 'types/image/imageLibrary';

export type ImageInput = number | null;
export type setImageInput = Dispatch<SetStateAction<ImageInput>>;

export type SelectImages = {
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

export type SelectImagesParam = {
  images: ImageItem[];
  setImageInput: setImageInput
  isLast: boolean;
  loadMoreImages: () => void;
  interval: number;
}

