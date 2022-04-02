import { useState } from 'react';
import { useForm, SubmitHandler  } from "react-hook-form";
import {
  CategoryItem,
  CategoryActionParam,
  UpdateAction,
  DeleteAction
} from 'types/category/category';

export function CategoryListItem(props: {
  category: CategoryItem,
  updateAction: UpdateAction,
  deleteAction: DeleteAction
}): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm<CategoryActionParam>();
  // 編集フォーム切り替え用ステート
  const [toggle, setToggle] = useState<boolean>(true);


  const handleCategoryDelete = ():void => {
    props.deleteAction(props.category);
  };

  const handleToggleElement = ():void => {
    setToggle(!toggle);
  };
  
  const onSubmit: SubmitHandler<CategoryActionParam> = (data) => {
    const updateData = {
      ...props.category,
      ...data
    };
    
    setToggle(!toggle);
    return props.updateAction(updateData);
  };

  return (
    <>
      <button onClick={handleCategoryDelete}>削除</button>
      { toggle ? 
        <>
          <button onClick={handleToggleElement}>編集</button>
          <p>{props.category.id}</p>
          <p>{props.category.name}</p>
          <p>{props.category.slug}</p>
        </>
        :
        <>
          <button onClick={handleToggleElement}>中止</button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>name</label>
            <input
              defaultValue={props.category.name}
              {...register('name', {
                required: '必ず入力してください',
                maxLength: {
                  value: 20,
                  message: '20文字以内で入力してください'
                },
              })}
            />
            { errors.name?.message }
            <label>slug</label>
            <input
              defaultValue={props.category.slug}
              {...register('slug', {
                required: '必ず入力してください',
                maxLength: {
                  value: 20,
                  message: '20文字以内で入力してください'
                },
                pattern: {
                  value: /^[0-9a-zA-Z_-]+$/,
                  message: '使用出来ない文字が含まれています'
                }
              })}
            />
            { errors.slug?.message }
            <input type="submit" />
          </form>
        </>
      }
    </>
  );
}