import axios from 'lib/axios';
import { useRouter } from 'next/router';
import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import { toast } from 'react-toastify';
import { pagesPath } from 'lib/$path';
import { Article, ArticlePostParam } from 'features/article/types/article';
import { revalidateIndex, revalidateCategoryIndex } from 'util/revalidate/revalidation';

type HookReturn = {
  getItem: (id: number) => SWRResponse<Article>;
  createAction: (article: ArticlePostParam, slug: string| undefined) => Promise<void>;
  updateAction: (article: ArticlePostParam, slug: string| undefined) => Promise<void>;
}

export const useArticle = (): HookReturn => {
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

  const createAction = async (article: ArticlePostParam, slug: string| undefined): Promise<void> => {
    await axios
      .post('/api/storeArticle', article)
      .then(() => {
        toast.success('登録に成功しました');
        // on demand
        revalidateIndex();
        slug && revalidateCategoryIndex(slug);
        router.replace(pagesPath.article.$url());
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      });
  };

  const updateAction = async (article: ArticlePostParam, slug: string| undefined): Promise<void> => {
    const api = `/api/updateArticle/${article.id}`;
    await axios
      .patch(`/api/updateArticle/${article.id}`, article)
      .then(() => {
        mutate(api);
        toast.success('登録に成功しました');
        // on demand
        revalidateIndex();
        slug && revalidateCategoryIndex(slug);
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