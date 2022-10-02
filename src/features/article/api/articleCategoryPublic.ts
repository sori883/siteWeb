import axios from 'lib/axios';
import { FetchArticlesListPublic, ArticlePublic } from 'features/article/types/articlePublic';


const apiUrl = '/api/fetchCategoryArticles';

/*
  SG用のfetcher
  aritlceとページネーションの最終ページを返す
*/
export const fetchArticleCategory =  async (slug: string):Promise<{
  data: ArticlePublic[]
}> => {
  const response = await axios.get<FetchArticlesListPublic>(`${apiUrl}/${slug}`);
  return {
    data: response.data.data,
  };
};
