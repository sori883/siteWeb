import { ArticlesItem } from 'types/article';
import { useArticleDelete } from 'hooks/article/useArticleDelete'
import { useRouter } from 'next/router';

export function ArticleListItem(props: {article: ArticlesItem}): JSX.Element {
  const { articleDelete } = useArticleDelete();

  const router = useRouter();

  const handleArticleEdit = ():void => {
    router.push(
      {
        pathname: '/article/edit',
        query: { articleId: `${props.article.id}` }
      });
  };

  const handleArticleDelete = ():void => {
    if (!props.article.id) return
    articleDelete(props.article.id);
  };

  return (
    <>
      <button onClick={handleArticleEdit}>編集</button>
      <button onClick={handleArticleDelete}>削除</button>
      <button onClick={handleArticleDelete}>非公開</button>
      <p>{props.article.id}</p>
      <p>{props.article.title}</p>
      <p>{props.article.permalink}</p>
      <p>{props.article.publish_at}</p>
    </>
  );
}