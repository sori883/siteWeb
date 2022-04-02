import { useState } from 'react';
import { useRouter } from 'next/router';
import { CategoryItem } from 'types/category/category';
import { CategoryListItem } from 'components/categories/CategoryListItem';
import { useCategories } from 'hooks/category';
import { getUrlParam } from 'lib/libs';
import { Pagination } from '@mantine/core';


export function CategoryList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {categories, error, deleteAction, updateAction } = useCategories(defaultPage);

  const handlePagerClick = (page: number): void => {
    setPageIndex(page);
    // アドレスURLの書き換え
    router.push({
      query: { page :page }
    });
  };

  if (error) return <div>エラーが発生しました</div>;
  if (!categories) return <div>データ取得中</div>;

  return (
    <>
      {
        categories.data.map((item: CategoryItem) => (
          <CategoryListItem
            category={item}
            updateAction={updateAction}
            deleteAction={deleteAction}
            key={item.id}
          />
        ))
      }
      <Pagination
        page={pageIndex}
        onChange={handlePagerClick}
        total={categories.lastPage}
      />
    </>
  );
}