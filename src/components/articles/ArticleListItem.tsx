import { ArticlesItem } from 'types/article';
import { useArticleDelete } from 'hooks/article/useArticleDelete'
import { useRouter } from 'next/router';

export function ArticleListItem(props: {article: ArticlesItem}): JSX.Element {
  const { articleDelete } = useArticleDelete();

  const router = useRouter();

  const handleArticlleEdit = ():void => {
    router.push(
      {
        pathname: '/article/edit',
        query: { articleId: `${props.article.id}` }
      });
  };

  const handleArticlleDelete = ():void => {
    articleDelete(props.article.id);
  };

  return (
    <>
      <button onClick={handleArticlleEdit}>編集</button>
      <button onClick={handleArticlleDelete}>削除</button>
      <p>{props.article.id}</p>
      <p>{props.article.title}</p>
      <p>{props.article.permalink}</p>
      <p>{props.article.publish_at}</p>
    </>
  );
}