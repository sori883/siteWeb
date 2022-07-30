import axios from 'lib/axios';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import { TagsInput } from 'features/tag/types/tag';
import {
  FetchSelectorTags,
  TagSelectValue
} from 'features/tag/types/select';

type HookReturn = {
  tagsInput: TagSelectValue[] | undefined;
  createInputTag: (tag: TagSelectValue[] | undefined) => TagsInput;
  setTagsInput: Dispatch<SetStateAction<TagSelectValue[] | undefined>>;
  selectTags: FetchSelectorTags | undefined;
  error: Error | undefined;
}

// タグセレクター
export const useSelectTags = (tag: TagsInput | undefined): HookReturn => {
  // 初期値設定用
  const createSelectTag = (tag:TagsInput | undefined):TagSelectValue[] | undefined => tag ?
    tag.map((item) => (
      { label: item.text, value: Number(item.id) }
    ))
    :
    undefined;

  // ポストするときにポスト用のプロパティ名に変換する
  const createInputTag = (tag:TagSelectValue[] | undefined):TagsInput =>
    tag ? tag.map((item) => (
      { text: item.label, id: `${item.value}` }
    ))
      : 
      [{ text: '', id: ''}];

  // 選択しているタグを管理するステート
  const [tagsInput, setTagsInput] = useState<TagSelectValue[] | undefined>(createSelectTag(tag));

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
