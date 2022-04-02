import {
  ArticleItem,
  DeleteAction,
  VisibleAction
} from 'types/article/article';
import { useRouter } from 'next/router';

export function ArticleListItem(props: {
  article: ArticleItem,
  deleteAction:DeleteAction,
  visibleAction: VisibleAction
}): JSX.Element {
  const router = useRouter();

  const handleEdit = ():void => {
    router.push(
      {
        pathname: '/article/edit',
        query: { articleId: `${props.article.id}` }
      });
  };

  const handleDelete = ():void => {
    props.deleteAction(props.article);
  };

  const handleVisible = ():void => {
    props.visibleAction(props.article);
  };

  return (
    <>
      <button onClick={handleEdit}>編集</button>
      <button onClick={handleDelete}>削除</button>
      <button onClick={handleVisible}>
        {props.article.publish_at ? '非公開' : '公開'}
      </button>
      <p>{props.article.id}</p>
      <p>{props.article.title}</p>
      <p>{props.article.permalink}</p>
      <p>{props.article.publish_at}</p>
    </>
  );
}