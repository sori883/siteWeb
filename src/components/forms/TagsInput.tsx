import { useState, useEffect } from 'react';
import { fetchAllTags } from 'requests/tag/allTags';
import { WithContext as ReactTags } from 'react-tag-input';
import { delimiters } from 'lib/tagInput';
import { RHFTag, RHFTagsForm, Tag, RHFTagsInputProps } from 'types/tag';

export default function ReactTagsInput(props: RHFTagsInputProps): JSX.Element {
  const [suggest, SetSuggest] = useState<RHFTagsForm>([
    { id: '', text: '' },
  ]);

  // サジェストを取得
  useEffect(() => {
    (async function (): Promise<void> {
      try {
        const fetchTags = await fetchAllTags();
        SetSuggest(
          fetchTags.map((item: Tag) => {
            return {
              id: `${item.id}`,
              text: item.text,
            }
          })
        );
      }catch(e){
        console.log(e)
      }
    })();
  },[]);


  const handleDelete = (i: number):void => {
    props.setTagsInput(props.tagsInput.filter((tagsInput, index) => {
      index !== i
    }));
  };

  const handleAddition = (tag: RHFTag) :void => {
    props.setTagsInput([...props.tagsInput, tag]);
  };

  return (
    <>
      <ReactTags
        tags={props.tagsInput}
        suggestions={suggest}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="bottom"
        autocomplete
      />
    </>
  )
}