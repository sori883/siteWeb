import { useState } from 'react';
import { useRouter } from 'next/router';
import { TagsListItem  } from 'features/tag/components/TagsListItem';
import { useTags } from 'features/tag/api/tag';
import { Tag } from 'features/tag/types/tag';
import getUrlParam from 'util/getUrlParam';
import { Pagination } from 'components/elements/pagination';
import { Spinner } from 'components/elements/spinner';


export function TagList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {tags, error, deleteAction, updateAction} =  useTags(defaultPage);

  const handlePagerClick = ((selectedItem: { selected: number}): void => {
    setPageIndex(selectedItem.selected + 1);
    // アドレスURLの書き換え
    router.push({
      query: { page: selectedItem.selected + 1 }
    });
  });

  if (error) return <div>エラーが発生しました</div>;
  if (!tags) return <Spinner size='xl' className='mx-auto' />;
  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        {
          tags.data.map((item: Tag) => (
            <div className='my-3'>
              <TagsListItem
                tag={item}
                deleteAction={deleteAction}
                updateAction={updateAction}
                key={item.id}
              />
            </div>
          ))
        }
      </div>
      <Pagination
        page={pageIndex}
        onChange={handlePagerClick}
        total={tags.lastPage}
      />
    </>
  );
}