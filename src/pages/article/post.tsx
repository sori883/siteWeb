import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { PostForm } from 'components/forms/PostForm';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';

const ArticlePost: NextPage = () => {
  useRequireLogin();

  return (
    <LayoutManage>
      <h1>NEW</h1>
      <SidebarManage />
      <PostForm />

    </LayoutManage>
  );
};

export default ArticlePost;
