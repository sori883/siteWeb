import { useState } from 'react';
import { CategoryItem, CategoryUpdate } from 'types/category';
import { useCategoryDelete } from 'hooks/category/useCategoryDelete';
import { useCategoryUpdate } from 'hooks/category/useCategoryUpdate';
import { useForm } from "react-hook-form";

export function CategoryListItem(props: {category: CategoryItem}): JSX.Element {

  const { categoryDelete } = useCategoryDelete();
  const { categoryUpdate } = useCategoryUpdate();
  const { register, getValues, handleSubmit, setValue } = useForm<CategoryUpdate>();
  const [toggle, setToggle] = useState<boolean>(true);


  const handleCategoryDelete = ():void => {
    if (!props.category.id) return
    categoryDelete(props.category.id);
  };

  const handleToggleElement = ():void => {
    setValue('name', props.category.name);
    setValue('slug', props.category.slug);
    setToggle(!toggle);
  };

  const handleCategoryUpdate = ():void => {
    if (!props.category.id) return
    categoryUpdate(props.category.id, getValues());
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
          <form onSubmit={handleSubmit(handleCategoryUpdate)}>
            <input {...register('name')} />
            <input {...register('slug')} />
            <input type="submit" />
          </form>
        </>
      }
    </>
  );
}