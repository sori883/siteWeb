import { ArticleStoreHook, ArticlePostReqest } from 'types/article';
import apiClient from 'lib/apiClient';

export const useArticleStore = ():ArticleStoreHook  => {    
  const articleStore = async (req: ArticlePostReqest):Promise<void> => {
    try {
      console.log(req)
      const res = await apiClient.post('/api/storeArticle', req);
      console.log(res.data)
    } catch(e) {
      console.log(e);
    };
  };

  return {
    articleStore,
  };
};