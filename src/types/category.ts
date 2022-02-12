import { Dispatch, SetStateAction } from "react";

export type CategoryItemId = number;

export type CategoryList = [CategoryItem];

export type CategoryItem = {
  id: number | null,
  name: string,
  slug: string,
};

export type CategoryInput = number | null;

// tags-inputを除く投稿フォーム
export type CategoryCreateForm = {
  name: string;
  slug: string;
}

// ReactTagsInputのProps
export type CategoryInputProps = {
  setCategoryInput: Dispatch<SetStateAction<CategoryInput>>;
}

export type CategoryStoreHook = {
  categoryStore: (req: CategoryCreateForm) => Promise<void>;
};


export type CategoryDeleteHook = {
  categoryDelete: (req: CategoryItemId) => Promise<void>;
};
