import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { ArticleForm } from 'components/articles/ArticleForm';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';
import { useArticle } from 'hooks/article';

const ArticlePost: NextPage = () => {
  useRequireLogin();
  const { createAction } = useArticle();

  const createArticle = {
    permalink: '',
    title: '',
    entry: '',
    publish_at: true,
    image_id: null,
    category: null,
    tags: undefined
  };

  return (
    <LayoutManage>
      <h1>NEW</h1>
      <SidebarManage />
      <ArticleForm
        article={createArticle}
        submitAction={createAction}
      />

    </LayoutManage>
  );
};

export default ArticlePost;
