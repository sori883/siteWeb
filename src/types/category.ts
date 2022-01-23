import { Dispatch, SetStateAction } from "react";

export type CategoryList = [CategoryItem];

export type CategoryItem = {
  id: number | null,
  name: string,
};

export type CategoryInput = number | null;

// ReactTagsInputのProps
export type CategoryInputProps = {
  setCategoryInput: Dispatch<SetStateAction<CategoryInput>>;
}