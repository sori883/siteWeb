import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { PostForm } from 'components/forms/PostForm';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';
import { useArticleStore } from 'hooks/article/useArticleStore';

const ArticlePost: NextPage = () => {
  useRequireLogin();
  // 記事登録用フック
  const { articleStore } = useArticleStore();
  return (
    <LayoutManage>
      <h1>NEW</h1>
      <SidebarManage />
      <PostForm
        article={null}
        submitHandle={articleStore}
      />

    </LayoutManage>
  );
};

export default ArticlePost;
