import { Dispatch, SetStateAction } from "react";

export type Tags = [
  {
    id: number,
    name: string, 
  },
];

// react-tag-inputのhandleAdditionに合わせて設定
export type Tag = {
  id: number,
  name: string, 
};

// react-tag-inputに合わせて指定
export type InputTagsForm = {
  id: string,
  text: string, 
}[];

// react-tag-inputのhandleAdditionに合わせて設定
export type InputTag = {
  id: string,
  text: string, 
};

// ReactTagsInputのProps
export type ReactTagsInputProps = {
  tagsInput: InputTagsForm;
  setTagsInput: Dispatch<SetStateAction<InputTagsForm>>;
}