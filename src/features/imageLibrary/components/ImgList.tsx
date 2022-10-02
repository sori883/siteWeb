import { useState } from 'react';
import { useRouter } from 'next/router';
import { ImageItem } from 'features/imageLibrary/types/imageLibrary';
import { ImgListItem } from 'features/imageLibrary/components/ImgListItem';
import { useImageLibrary } from 'features/imageLibrary/api/imageLibrary';
import getUrlParam from 'util/getUrlParam';
import { Pagination } from 'components/elements/pagination';
import { Spinner } from 'components/elements/spinner';


export function ImgList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {images, error, deleteAction } = useImageLibrary(defaultPage);

  const handlePagerClick = ((selectedItem: { selected: number}): void => {
    setPageIndex(selectedItem.selected + 1);
    // アドレスURLの書き換え
    router.push({
      query: { page: selectedItem.selected + 1 }
    });
  });

  if (error) return <div>エラーが発生しました</div>;
  if (!images) return <Spinner size='xl' className='mx-auto' />;

  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        {
          images.data.map((item: ImageItem) => (
            <div className='my-2'>
              <ImgListItem
                deleteAction={deleteAction}
                image={item}
                key={item.id}
              />
            </div>
          ))
        }
      </div>
      <Pagination
        page={pageIndex}
        onChange={handlePagerClick}
        total={images.lastPage}
      />
    </>
  );
}