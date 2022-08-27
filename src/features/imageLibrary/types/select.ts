import { Dispatch, SetStateAction } from "react";
import { ImageItem } from 'features/imageLibrary/types/imageLibrary';

export type ImageInput = ImageItem | null;
export type setImageInput = Dispatch<SetStateAction<ImageInput>>;