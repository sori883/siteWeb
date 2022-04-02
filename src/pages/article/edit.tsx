import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { ArticleForm } from 'components/articles/ArticleForm';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';
import { useArticle } from 'hooks/article';
import { getUrlParam } from 'lib/libs';


const ArticlePost: NextPage = () => {
  useRequireLogin();
  const { updateAction, getItem } = useArticle();
  const { data: article, error } = getItem(Number(getUrlParam('articleId')));

  if (error) return <div>エラーが発生しました</div>;
  if (!article) return <div>取得中</div>;


  return (
    <LayoutManage>
      <h1>EDIT</h1>
      <SidebarManage />
      <ArticleForm
        article={article}
        submitAction={updateAction}
      />

    </LayoutManage>
  );
};

export default ArticlePost;
