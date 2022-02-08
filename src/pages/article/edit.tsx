import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { PostForm } from 'components/forms/PostForm';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';
import { fetchSingleArticles } from 'requests/article/singleArticle'
import { ArticleSingle } from 'types/article';
import { useArticleUpdate } from 'hooks/article/useArticleUpdate';
import { useSetRecoilState } from 'recoil';
import { currentArticleId } from 'states/atoms/article';


const ArticlePost: NextPage = () => {
  useRequireLogin();
  const setCurrentArticleId = useSetRecoilState(currentArticleId);
  const router = useRouter();
  const { articleId } = router.query;

  // 記事更新用フック
  const { articleUpdate } = useArticleUpdate();

  const [article, setArticle] = useState<ArticleSingle>({
    id: 0,
    permalink: '',
    title: '',
    entry: '',
    publish_at: '',
    category: {
      id: 0,
      name: '',
      slug: '',
    },
    tags: [{
      id: 0,
      text: '',
    }],
  });

  const fetchArticle = async (): Promise<void> => {
    try {
      const fetchArticle = await fetchSingleArticles(Number(articleId));
      setArticle(fetchArticle);
      setCurrentArticleId(fetchArticle.id)
    } catch(e) {
      console.log(e)
    }
  }

  // 記事を取得
  useEffect(() => {
    if(router.isReady) fetchArticle();
  }, [articleId, router]);

  return (
    <LayoutManage>
      <h1>EDIT</h1>
      <SidebarManage />
      <PostForm
        article={article}
        submitHandle={articleUpdate}
      />

    </LayoutManage>
  );
};

export default ArticlePost;
