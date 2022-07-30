import { useState } from 'react';
import { useRouter } from 'next/router';
import getUrlParam from 'util/getUrlParam';
import { ArticleListItem } from 'features/article/components/ArticleListItem';
import { useArticles } from 'features/article/api/articleList';
import { ArticleItem } from 'features/article/types/article';
import { Pagination } from 'components/elements/pagination';
import { Spinner } from 'components/elements/spinner';

export function ArticleList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {articles, error, deleteAction, visibleAction } =  useArticles(defaultPage);

  const handlePagerClick = ((selectedItem: { selected: number}): void => {
    setPageIndex(selectedItem.selected + 1);
    // アドレスURLの書き換え
    router.push({
      query: { page: selectedItem.selected + 1 }
    });
  });


  if (error) return <div>エラーが発生しました</div>;
  if (!articles) return <Spinner size='xl' className='mx-auto' />;

  return (
    <>
      <div className='grid grid-cols-2 gap-4'>
        {
          articles.data.map((item: ArticleItem) => (
            <div className='my-2'>
              <ArticleListItem
                article={item}
                deleteAction={deleteAction}
                visibleAction={visibleAction}
                key={item.id}
              />
            </div>
          ))
        }
      </div>
      <div>
        <Pagination
          page={pageIndex}
          onChange={handlePagerClick}
          total={articles.lastPage}
        />
      </div>
    </>
  );
}