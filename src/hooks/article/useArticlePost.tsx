import { ArticlePostHook, ArticlePostReqest } from 'types/article';
import apiClient from 'lib/apiClient';

export const useArticlePost = ():ArticlePostHook  => {    
  const articlePost = async (req: ArticlePostReqest):Promise<void> => {
    try {
      const res = await apiClient.post('/api/storeArticle', req);
      console.log(res.data)
    } catch(e) {
      console.log(e);
    };
  };

  return {
    articlePost,
  };
};