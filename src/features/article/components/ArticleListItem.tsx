import { ArticleItem } from 'features/article/types/article';
import { useRouter } from 'next/router';
import { Button } from 'components/elements/button';
import { Card } from 'components/elements/card';
import { useState } from 'react';

export function ArticleListItem(props: {
  article: ArticleItem,
  deleteAction:(article: ArticleItem) => Promise<void>,
  visibleAction: (article: ArticleItem) => Promise<void>
}): JSX.Element {
  const router = useRouter();
  const [isLoadingVisible, setIsLoadingVisible] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const handleEdit = ():void => {
    router.push(
      {
        pathname: '/article/edit',
        query: { articleId: `${props.article.id}` }
      });
  };

  const handleDelete = async ():Promise<void> => {
    setIsLoadingDelete(true);
    await props.deleteAction(props.article).finally(() => {
      setIsLoadingDelete(false);
    });
  };

  const handleVisible = async ():Promise<void> => {
    setIsLoadingVisible(true);
    props.visibleAction(props.article).finally(() => {
      setIsLoadingVisible(false);
    });
  };

  return (
    <>
      <Card>
        <h2 className='card-title'>{props.article.title}</h2>
        <p>{props.article.permalink}</p>
        <p>{props.article.publish_at}</p>
        <div className='card-actions justify-end'>
          <Button
            variant='primary'
            size='sm'
            onClick={handleEdit}
          >
            編集
          </Button>
          <Button
            variant='danger'
            size='sm'
            onClick={handleDelete}
            isLoading={isLoadingDelete}
          >
            削除
          </Button>
          <Button
            variant='secondary'
            size='sm'
            onClick={handleVisible}
            isLoading={isLoadingVisible}
          >
            {props.article.publish_at ? '非公開' : '公開'}
          </Button>
        </div>
      </Card>
    </>
  );
}