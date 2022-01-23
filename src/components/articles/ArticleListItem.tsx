import { ArticlesItem } from 'types/article';
import { useArticleDelete } from 'hooks/article/useArticleDelete'

export function ArticleListItem(props: {article: ArticlesItem}): JSX.Element {
  const { articleDelete } = useArticleDelete();

  const handleArticlleDelete = ():void => {
    articleDelete(props.article.id);
  };

  return (
    <>
      <button onClick={handleArticlleDelete}>削除</button>
      <p>{props.article.id}</p>
      <p>{props.article.title}</p>
      <p>{props.article.permalink}</p>
      <p>{props.article.publish_at}</p>
    </>
  );
}