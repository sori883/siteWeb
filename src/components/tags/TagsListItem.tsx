import { useState } from 'react';
import { useForm, SubmitHandler  } from "react-hook-form";
import {
  Tag,
  TagActionParam,
  UpdateAction,
  DeleteAction
} from 'types/tag/tag';


export function TagsListItem(props: {
  tag: Tag,
  updateAction: UpdateAction,
  deleteAction: DeleteAction
}): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm<TagActionParam>();
  // 編集フォーム切り替え用ステート
  const [toggle, setToggle] = useState<boolean>(true);

  const handleTagDelete = ():void => {
    props.deleteAction(props.tag);
  };

  const handleToggleElement = ():void => {
    setToggle(!toggle);
  };

  const onSubmit: SubmitHandler<TagActionParam> = (data) => {
    const updateData = {
      ...props.tag,
      ...data
    };
    
    setToggle(!toggle);
    return props.updateAction(updateData);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>{props.tag.id}</p>
            <input
              defaultValue={props.tag.text}
              {...register('text', {
                required: '必ず入力してください',
                maxLength: {
                  value: 20,
                  message: '20文字以内で入力してください'
                },
              })}
            />
            { errors.text?.message }
            <input type="submit" />
          </form>
        </>
      }
    </>
  );
}