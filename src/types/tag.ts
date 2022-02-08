import { Dispatch, SetStateAction } from "react";

export type Tag = {
  id: number,
  text: string, 
};

export type Tags = 
  {
    id: number,
    text: string, 
  }[];

// react-tag-inputのhandleAdditionに合わせて設定
export type RHFTag = {
  id: string,
  text: string, 
};

// react-tag-inputのhandleAdditionに合わせて設定
export type RHFTags= {
  id: string,
  text: string, 
}[];

// react-tag-inputに合わせて指定
export type RHFTagsForm = {
  id: string,
  text: string, 
}[];

// ReactTagsInputのProps
export type RHFTagsInputProps = {
  tagsInput: RHFTags;
  setTagsInput: Dispatch<SetStateAction<RHFTags>>;
}