import React from 'react';
import Select from 'react-select';
import {
  Category,
  CategoryInputSetter
} from 'types/category/category';
import { FetchSelectorCategories, Option } from 'types/selector/reactSelect';

export function CategorySelect(props: {
  initVal: Category | null,
  setCategoryInput: CategoryInputSetter
  categories: FetchSelectorCategories
}): JSX.Element {

  const handleOnChange = (option: Option | null): void => {
    props.setCategoryInput(option?.value ?? null);
  };

  // selectの初期値を設定
  const initSelect = (val: Category | null):Option => val ?
    { label: val.name, value: val.id } :
    props.categories.data[0];

  return (
    <Select
      options={props.categories.data}
      onChange={handleOnChange}
      defaultValue={initSelect(props.initVal)}
    />
  );
}