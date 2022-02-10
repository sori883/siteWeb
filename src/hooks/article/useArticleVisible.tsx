import { ArticleVisibleHook, ArticlesItemId } from 'types/article';
import apiClient from 'lib/apiClient';


export const useArticleVisible= ():ArticleVisibleHook  => {

  const articleVisible = async (req: ArticlesItemId): Promise<void> => {
    try {
      const res = await apiClient.patch(`/api/visibleArticle/${req}`);
      console.log(res)
    } catch(e) {
      console.log(req);
    }
  }

  return {
    articleVisible,
  };
};