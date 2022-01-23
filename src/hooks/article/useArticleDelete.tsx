import { ArticleDeleteHook, ArticlesItemId } from 'types/article'
import apiClient from 'lib/apiClient';

export const useArticleDelete= ():ArticleDeleteHook  => {

  const articleDelete = async (req: ArticlesItemId): Promise<void> => {
    try {
      const res = await apiClient.delete(`/api/deleteArticle/${req}`);
      console.log(res)
    } catch(e) {
      console.log(req);
    }
  }

  return {
    articleDelete,
  };
};