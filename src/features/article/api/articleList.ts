import axios from 'lib/axios';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { ArticleItem, FetchArticlesList } from 'features/article/types/article';
import { revalidateIndex, revalidateCategoryIndex } from 'util/revalidate/revalidation';


type HookReturn = {
  articles: FetchArticlesList | undefined;
  error: Error | undefined;
  deleteAction: (article: ArticleItem) => Promise<void>;
  visibleAction: (article: ArticleItem) => Promise<void>;
};

export const useArticles = (pageIndex = 1): HookReturn => {
  const apiUrl = `/api/fetchAllArticles?page=${pageIndex}`;
  const { data: articles, error, mutate } = useSWR<FetchArticlesList>(apiUrl, () =>
    axios.get<FetchArticlesList>(apiUrl)
      .then((res) => res.data)
  );

  const deleteAction = async (article: ArticleItem): Promise<void> => {
    await axios
      .delete(`/api/deleteArticle/${article.id}`)
      .then(() => {
        toast.success('削除に成功しました');
        mutate(articles);
        // on demand
        revalidateIndex();
        revalidateCategoryIndex(article.slug);
      })
      .catch(() => {
        toast.error('削除に失敗しました');
      });
  };

  const visibleAction = async (article: ArticleItem): Promise<void> => {
    await axios
      .patch(`/api/visibleArticle/${article.id}`)
      .then(() => {
        toast.success('公開設定を変更しました');
        mutate(articles);
        // on demand
        revalidateIndex();
        console.log(article.slug);
        revalidateCategoryIndex(article.slug);
      })
      .catch(() => {
        toast.error('公開設定を変更に失敗しました');
      });
  };

  return {
    articles,
    error,
    deleteAction,
    visibleAction
  };
};