import { CategoryItem } from 'types/category';
import { useCategoryDelete } from 'hooks/category/useCategoryDelete';

export function CategoryListItem(props: {category: CategoryItem}): JSX.Element {

  const { categoryDelete } = useCategoryDelete();

  const handleCategoryDelete = ():void => {
    if (!props.category.id) return
    categoryDelete(props.category.id);
  };


  return (
    <>
      <button onClick={handleCategoryDelete}>削除</button>
      <p>{props.category.id}</p>
      <p>{props.category.name}</p>
      <p>{props.category.slug}</p>
    </>
  );
}