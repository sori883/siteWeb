import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';
import { ArticleList } from 'components/articles/List';


const ArticleIndex: NextPage = () => {
  useRequireLogin();

  return (
    <LayoutManage>
      <h1>LIST</h1>
      <SidebarManage />
      <ArticleList />

    </LayoutManage>
  );
};

export default ArticleIndex;
