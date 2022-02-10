import { ArticlesItem } from 'types/article';
import { useArticleDelete } from 'hooks/article/useArticleDelete'
import { useArticleVisible } from 'hooks/article/useArticleVisible'
import { useRouter } from 'next/router';

export function ArticleListItem(props: {article: ArticlesItem}): JSX.Element {
  const { articleDelete } = useArticleDelete();
  const { articleVisible } = useArticleVisible();

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

  const handleArticleVisible = ():void => {
    if (!props.article.id) return
    articleVisible(props.article.id);
  };

  return (
    <>
      <button onClick={handleArticleEdit}>編集</button>
      <button onClick={handleArticleDelete}>削除</button>
      <button onClick={handleArticleVisible}>
        {props.article.publish_at ? '非公開' : '公開'}
      </button>
      <p>{props.article.id}</p>
      <p>{props.article.title}</p>
      <p>{props.article.permalink}</p>
      <p>{props.article.publish_at}</p>
    </>
  );
}