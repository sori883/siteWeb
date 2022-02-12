import { useState, useEffect } from 'react';
import { CategoryList, CategoryItem } from 'types/category';
import { fetchAllCategories } from 'requests/category/allCategories';
import { CategoryListItem } from 'components/categories/CategoryListItem'

export function CategoryList(): JSX.Element {
  const [categories, SetCategories] = useState<CategoryList>([{ 
    id: null,
    name: '',
    slug: ''
  }]);

  // 記事を取得
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

  return (
    <>
      {
        categories.map((item: CategoryItem) => {
          return (
            <CategoryListItem
              category={item}
              key={item.id}
            />
          )
        })
      }
    </>
  )
}