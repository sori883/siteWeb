import { ArticleUpdateHook, ArticlePostReqest } from 'types/article';
import apiClient from 'lib/apiClient';
import { useRecoilValue } from 'recoil';
import { currentArticleId } from 'states/atoms/article'

export const useArticleUpdate = ():ArticleUpdateHook  => {
  const id = useRecoilValue(currentArticleId);
  const articleUpdate = async (req: ArticlePostReqest):Promise<void> => {
    console.log(id)
    try {
      const res = await apiClient.patch(`/api/updateArticle/${id}`, req);
      console.log(res.data)
    } catch(e) {
      console.log(e);
    };
  };

  return {
    articleUpdate,
  };
};