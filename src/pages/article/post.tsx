import type { NextPage } from 'next';
import { LayoutManage } from 'components/manages/Layout';
import { ArticleForm } from 'features/article/components/ArticleForm';
import { useRequireLogin } from 'features/auth/api/useRequireLogin';
import { useArticle } from 'features/article/api/article';

const ArticlePost: NextPage = () => {
  useRequireLogin();
  const { createAction } = useArticle();

  const createArticle = {
    permalink: '',
    title: '',
    entry: '',
    publish_at: true,
    image: null,
    category: null,
    tags: undefined
  };

  return (
    <LayoutManage>
      <ArticleForm
        article={createArticle}
        submitAction={createAction}
      />

    </LayoutManage>
  );
};

export default ArticlePost;
