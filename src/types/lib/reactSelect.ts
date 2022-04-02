import { Dispatch, SetStateAction } from "react";
import { CategoryInput } from "types/category/category";
import { TagsInput } from "types/tag/tag";

export type Option = {
  label: string;
  value: number;
};

/* select value hook */
export type FetchSelectorCategories = {
  data: Option[]
};

export type SelectValueCategories = {
  categoryInput: CategoryInput;
  setCategoryInput: Dispatch<SetStateAction<CategoryInput>>;
  selectCategories: FetchSelectorCategories | undefined;
  error: Error | undefined;
}

export type FetchSelectorTags = {
  data: Option[]
};

export type SelectValueTags = {
  tagsInput: Option[] | undefined;
  createInputTag: (tag: Option[] | undefined) => TagsInput;
  setTagsInput: Dispatch<SetStateAction<Option[] | undefined>>;
  selectTags: FetchSelectorTags | undefined;
  error: Error | undefined;
}