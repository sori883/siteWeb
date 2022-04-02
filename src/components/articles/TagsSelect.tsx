import {useState, KeyboardEventHandler } from 'react';
import CreatableSelect from 'react-select/creatable';
import { OnChangeValue  } from 'react-select';
import { 
  TagsInput,
  TagInputSetter
} from 'types/tag/tag';
import { Option, FetchSelectorTags } from 'types/lib/reactSelect';

export function TagsSelect(props: {
  initVal: TagsInput | undefined,
  setTagsInput: TagInputSetter,
  tags: FetchSelectorTags
  value: Option[] | undefined
}): JSX.Element {

  // Valueに追加するInput(一時的)
  const [inputValue, setInputValue] = useState<string>('');

  // react-selectのdropdownアイコンを表示しない
  const components = {
    DropdownIndicator: null,
  };

  // value作成用関数
  const createOption = (label: string):Option[] => ([{
    label,
    value: 0, // apiでtextだけを見ているため、valueはなんでもいい
  }]);

  // keydownイベント
  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!inputValue) return;
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        props.value ?
          props.setTagsInput([...props.value, ...createOption(inputValue)])
          :
          props.setTagsInput([...createOption(inputValue)]);
        setInputValue('');
        e.preventDefault();
    }
  };
  
  // input changeイベント
  const handleInputChange = (newValue: string): void => {
    setInputValue(newValue);
  };

  // changeイベント
  const handleChange = (value: OnChangeValue<Option, true>,): void => {
    props.setTagsInput([...value]);
  };
  
  return (
    <>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        onInputChange={handleInputChange}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        options={props.tags.data}
        value={props.value}
      />
    </>
  );
}
