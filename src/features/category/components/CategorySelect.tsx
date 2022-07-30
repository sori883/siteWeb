import React from 'react';
import Select from 'react-select';
import { Category } from 'features/category/types/category';
import {
  FetchSelectorCategories, 
  CategorySelectValues,
  CategoryInputSetter
} from 'features/category/types/select';

export function CategorySelect(props: {
  initVal: Category | null,
  setCategoryInput: CategoryInputSetter
  categories: FetchSelectorCategories
}): JSX.Element {

  const handleOnChange = (option: CategorySelectValues | null): void => {
    props.setCategoryInput(option?.value ?? null);
  };

  // selectの初期値を設定
  const initSelect = (val: Category | null):CategorySelectValues => val ?
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