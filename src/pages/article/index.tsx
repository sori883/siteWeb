import type { NextPage } from 'next';
import { LayoutManage } from 'components/manages/Layout';
import { useRequireLogin } from 'features/auth/api/useRequireLogin';
import { ArticleList } from 'features/article/components/ArticleList';


const ArticleIndex: NextPage = () => {
  useRequireLogin();

  return (
    <LayoutManage>
      <ArticleList />

    </LayoutManage>
  );
};

export default ArticleIndex;
