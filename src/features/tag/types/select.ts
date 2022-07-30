import { Dispatch, SetStateAction } from "react";

export type TagSelectValue = {
  label: string;
  value: number;
};

// タグセレクター
export type FetchSelectorTags = {
  data: TagSelectValue[]
};

// inputのsetter
export type TagInputSetter = Dispatch<SetStateAction<TagSelectValue[] | undefined>>;