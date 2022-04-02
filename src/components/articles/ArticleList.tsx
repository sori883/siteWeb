import { useState } from 'react';
import { useRouter } from 'next/router';
import { getUrlParam } from 'lib/libs';
import { ArticleListItem } from 'components/articles/ArticleListItem';
import { useArticles } from 'hooks/article';
import { ArticleItem } from 'types/article/article';
import { Loader, Pagination } from '@mantine/core';

export function ArticleList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {articles, error, deleteAction, visibleAction } =  useArticles(defaultPage);

  const handlePagerClick = (page: number): void => {
    setPageIndex(page);
    // アドレスURLの書き換え
    router.push({
      query: { page :page }
    });
  };


  if (error) return <div>エラーが発生しました</div>;
  if (!articles) return <Loader />;

  return (
    <>
      {
        articles.data.map((item: ArticleItem) => (
          <ArticleListItem
            article={item}
            deleteAction={deleteAction}
            visibleAction={visibleAction}
            key={item.id}
          />
        ))
      }
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