import type { NextPage } from 'next';
import { LayoutManage } from 'components/manages/Layout';
import { ArticleForm } from 'features/article/components/ArticleForm';
import { useRequireLogin } from 'features/auth/api/useRequireLogin';
import { useArticle } from 'features/article/api/article';
import getUrlParam from 'util/getUrlParam';


const ArticlePost: NextPage = () => {
  useRequireLogin();
  const { updateAction, getItem } = useArticle();
  const { data: article, error } = getItem(Number(getUrlParam('articleId')));

  if (error) return <div>エラーが発生しました</div>;
  if (!article) return <div>取得中</div>;


  return (
    <LayoutManage>
      <ArticleForm
        article={article}
        submitAction={updateAction}
      />

    </LayoutManage>
  );
};

export default ArticlePost;
