import { useState } from 'react';
import { Tag, TagUpdate } from 'types/tag';
import { useTagDelete } from 'hooks/tag/useTagDelete';
import { useTagUpdate } from 'hooks/tag/useTagUpdate';
import { useForm } from "react-hook-form";

export function TagsListItem(props: {tag: Tag}): JSX.Element {

  const { tagDelete } = useTagDelete();
  const { tagUpdate } = useTagUpdate();
  const { register, getValues, handleSubmit, setValue } = useForm<TagUpdate>();
  const [toggle, setToggle] = useState<boolean>(true);

  const handleTagDelete = ():void => {
    if (!props.tag.id) return
    tagDelete(props.tag.id);
  };

  const handleToggleElement = ():void => {
    setValue('text', props.tag.text);
    setToggle(!toggle);
  };

  const handleTagUpdate = ():void => {
    if (!props.tag.id) return
    tagUpdate(props.tag.id, getValues());
  };


  return (
    <>
      <button onClick={handleTagDelete}>削除</button>
      { toggle ? 
        <>
          <button onClick={handleToggleElement}>編集</button>
          <p>{props.tag.id}</p>
          <p>{props.tag.text}</p>
        </>
        :
        <>
          <button onClick={handleToggleElement}>中止</button>
          <form onSubmit={handleSubmit(handleTagUpdate)}>
            <p>{props.tag.id}</p>
            <input {...register('text')} />
            <input type="submit" />
          </form>
        </>
      }
    </>
  );
}