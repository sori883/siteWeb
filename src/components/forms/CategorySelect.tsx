import { useState, useEffect } from 'react';
import { CategoryList, CategoryItem, CategoryInputProps } from 'types/category';
import { fetchAllCategories } from 'requests/category/allCategories';

export function CategorySelect(props: CategoryInputProps): JSX.Element {
  const [categories, SetCategories] = useState<CategoryList>([{ 
    id: null,
    name: '',
  }]);
  
  // カテゴリ取得
  useEffect(() => {
    (async function (): Promise<void> {
      try {
        const fetchCategories = await fetchAllCategories();
        SetCategories(fetchCategories);
      }catch(e){
        console.log(e)
      }
    })();
  },[]);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    console.log(e.target.value)
    props.setCategoryInput(Number(e.target.value));
  }

  return (
    <select
      onChange={handleOnChange}
    >
      {
        categories.map((item: CategoryItem) => {
          return (
            <option 
              value={`${item.id}`}
              key={item.id}
            >
              {item.name}
            </option>
          )
        })
      }
    </select>
  )
}