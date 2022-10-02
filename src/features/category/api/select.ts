import axios from 'lib/axios';
import { useState } from 'react';
import useSWR from 'swr';
import {
  CategoryInput,
  CategoryInputSetter,
  FetchSelectorCategories
} from 'features/category/types/select';

type HookReturn = {
  categoryInput: CategoryInput;
  setCategoryInput: CategoryInputSetter;
  selectCategories: FetchSelectorCategories | undefined;
  error: Error | undefined;
}

// カテゴリーセレクター
export const useSelectCategories = (id: number | null): HookReturn => {

  // カテゴリー選択値を格納
  const [categoryInput, setCategoryInput] = useState<number | null>(id);

  const { data: selectCategories, error } = useSWR<FetchSelectorCategories>('api/fetchSelectorCategories', (url) =>
    axios.get<FetchSelectorCategories>(url)
      .then((res) => {
        // idがnullの場合は初期値を設定
        if(!id) setCategoryInput(res.data.data[0].value);
        return res.data;
      })
  );


  return {
    categoryInput,
    setCategoryInput,
    selectCategories,
    error,
  };
};
