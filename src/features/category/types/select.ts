import { Dispatch, SetStateAction } from 'react';

/* input state */
export type CategoryInput = number | null;
export type CategoryInputSetter = Dispatch<SetStateAction<CategoryInput>>;

/* select valiue */
export type CategorySelectValues = {
  label: string;
  value: number;
};

/* fetch category data */
export type FetchSelectorCategories = {
  data: (CategorySelectValues & {slug: string})[]
};