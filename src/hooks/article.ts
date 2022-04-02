import axios from 'lib/axios';
import { useRouter } from 'next/router';
import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import { toast } from 'react-toastify';
import { pagesPath } from 'lib/$path';
import {
  Article,
  ArticleItem,
  FetchArticlesList,
  ArticlesHook,
  ArticleActionHook
} from 'types/article/article';

export const useArticles = (pageIndex = 1): ArticlesHook => {
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

export const useArticle = (): ArticleActionHook => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const getItem = (id: number): SWRResponse<Article> => {
    const api = `/api/fetchArticle/${id}`;
    return useSWR<Article>(api, async () =>
      await axios
        .get(api)
        .then((res) => res.data.data)
    );
  };

  const createAction = async (article: Article): Promise<void> => {
    await axios
      .post('/api/storeArticle', article)
      .then(() => {
        toast.success('登録に成功しました');
        router.replace(pagesPath.article.$url());
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      });
  };

  const updateAction = async (article: Article): Promise<void> => {
    const api = `/api/updateArticle/${article.id}`;
    await axios
      .patch(`/api/updateArticle/${article.id}`, article)
      .then(() => {
        mutate(api);
        toast.success('登録に成功しました');
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      });
  };

  return {
    getItem,
    createAction,
    updateAction
  };
};