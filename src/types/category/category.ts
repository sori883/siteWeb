import { Dispatch, SetStateAction } from "react";

export type Category = {
  id: number;
  name: string;
  slug: string;
}

/* category select form */
export type CategoryInput = number | null;
export type CategoryInputSetter = Dispatch<SetStateAction<CategoryInput>>;

/* list */
export type fetchAllCategoryList = {
  data: CategoryList;
  lastPage: number;
  links: unknown;
  meta: unknown;
}

export type CategoryList = [CategoryItem];

export type CategoryItem = {
  id: number,
  name: string,
  slug: string,
};

/* category hook */
// param
export type CategoryActionParam = {
  name: string;
  slug: string;
}

// actions
export type CreateAction = (article: CategoryActionParam) => Promise<void>;
export type UpdateAction = (article: Category) => Promise<void>;
export type DeleteAction = (req: CategoryItem) => Promise<void>;

// return
export type CategoriesHook = {
  categories: fetchAllCategoryList | undefined;
  error: Error | undefined;
  deleteAction: DeleteAction;
  createAction: CreateAction;
  updateAction: UpdateAction;
};
