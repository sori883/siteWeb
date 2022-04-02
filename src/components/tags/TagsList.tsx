import { useState } from 'react';
import { useRouter } from 'next/router';
import { TagsListItem  } from 'components/tags/TagsListItem';
import { useTags } from 'hooks/tag';
import { Tag } from 'types/tag/tag';
import { getUrlParam } from 'lib/libs';
import { Pagination } from '@mantine/core';

export function TagList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {tags, error, deleteAction, updateAction} =  useTags(defaultPage);

  const handlePagerClick = (page: number): void => {
    setPageIndex(page);
    // アドレスURLの書き換え
    router.push({
      query: { page :page }
    });
  };

  if (error) return <div>エラーが発生しました</div>;
  if (!tags) return <div>データ取得中</div>;
  return (
    <>
      {
        tags.data.map((item: Tag) => (
          <TagsListItem
            tag={item}
            deleteAction={deleteAction}
            updateAction={updateAction}
            key={item.id}
          />
        ))
      }
      <Pagination
        page={pageIndex}
        onChange={handlePagerClick}
        total={tags.lastPage}
      />
    </>
  );
}