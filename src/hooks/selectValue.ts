import axios from 'lib/axios';
import { useState } from 'react';
import useSWR from 'swr';
import { CategoryInput } from 'types/category/category';
import { TagsInput } from 'types/tag/tag';
import {
  FetchSelectorCategories,
  SelectValueCategories,
  FetchSelectorTags,
  SelectValueTags,
  Option
} from 'types/lib/reactSelect';

export const useSelectCategories = (id: number | null): SelectValueCategories => {

  // カテゴリー選択値を格納
  const [categoryInput, setCategoryInput] = useState<CategoryInput>(id);

  const { data: selectCategories, error } = useSWR<FetchSelectorCategories>('api/fetchSelectorCategories', (url) =>
    axios.get<FetchSelectorCategories>(url)
      .then((res) => res.data)
  );

  return {
    categoryInput,
    setCategoryInput,
    selectCategories,
    error,
  };
};

export const useSelectTags = (tag: TagsInput | undefined): SelectValueTags => {

  // 初期値設定用
  const createSelectTag = (tag:TagsInput | undefined):Option[] | undefined => tag ?
    tag.map((item) => (
      { label: item.text, value: Number(item.id) }
    ))
    :
    undefined;

  // ポストするときにポスト用のプロパティ名に変換する
  const createInputTag = (tag:Option[] | undefined):TagsInput => tag ? tag.map((item) => (
    { text: item.label, id: `${item.value}` }
  ))
    : 
    [{ text: '', id: ''}];

  // 選択しているタグを管理するステート
  const [tagsInput, setTagsInput] = useState<Option[] | undefined>(createSelectTag(tag));

  const { data: selectTags, error } = useSWR<FetchSelectorTags>('api/fetchSelectorTags', (url) =>
    axios.get<FetchSelectorTags>(url)
      .then((res) => res.data)
  );

  return {
    tagsInput,
    setTagsInput,
    createInputTag,
    selectTags,
    error,
  };
};
