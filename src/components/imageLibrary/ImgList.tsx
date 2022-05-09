import { useState } from 'react';
import { useRouter } from 'next/router';
import { ImageItem } from 'types/image/imageLibrary';
import { ImgListItem } from 'components/imageLibrary/ImgListItem';
import { useImageLibrary } from 'hooks/imageLibrary';
import { getUrlParam } from 'lib/libs';
import { Pagination } from '@mantine/core';


export function ImgList(): JSX.Element {
  const router = useRouter();
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  // ページネーション用
  const [pageIndex, setPageIndex] = useState<number>(defaultPage);
  const {images, error, deleteAction } = useImageLibrary(defaultPage);

  const handlePagerClick = (page: number): void => {
    setPageIndex(page);
    // アドレスURLの書き換え
    router.push({
      query: { page :page }
    });
  };

  if (error) return <div>エラーが発生しました</div>;
  if (!images) return <div>データ取得中</div>;

  return (
    <>
      {
        images.data.map((item: ImageItem) => (
          <ImgListItem
            deleteAction={deleteAction}
            image={item}
            key={item.id}
          />
        ))
      }
      <Pagination
        page={pageIndex}
        onChange={handlePagerClick}
        total={images.lastPage}
      />
    </>
  );
}