import { useState } from 'react';
import { useRouter } from 'next/router';
import { CategoryItem } from 'features/category/types/category';
import { CategoryListItem } from 'features/category/components/CategoryListItem';
import { useCategories } from 'features/category/api/category';
import getUrlParam from 'util/getUrlParam';
import { Pagination } from 'components/elements/pagination';
import { Spinner } from 'components/elements/spinner';

export function CategoryList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {categories, error, deleteAction, updateAction } = useCategories(defaultPage);

  const handlePagerClick = ((selectedItem: { selected: number}): void => {
    setPageIndex(selectedItem.selected + 1);
    // アドレスURLの書き換え
    router.push({
      query: { page: selectedItem.selected + 1 }
    });
  });

  if (error) return <div>エラーが発生しました</div>;
  if (!categories) return <Spinner size='xl' className='mx-auto' />;

  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        {
          categories.data.map((item: CategoryItem) => (
            <div className='my-2'>
              <CategoryListItem
                category={item}
                updateAction={updateAction}
                deleteAction={deleteAction}
                key={item.id}
              />
            </div>
          ))
        }
      </div>
      <Pagination
        page={pageIndex}
        onChange={handlePagerClick}
        total={categories.lastPage}
      />
    </>
  );
}