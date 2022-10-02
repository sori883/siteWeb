import axios from 'lib/axios';
import { FetchArticlesListPublic, FetchArticlesPublic, ArticlePublic } from 'features/article/types/articlePublic';

const apiUrl = '/api/fetchIndexArticles';

/*
  SG用のfetcher
  aritlceとページネーションの最終ページを返す
*/
export const fetcharticleIndex =  async ():Promise<{
  data: ArticlePublic[]
}> => {
  const response = await axios.get<FetchArticlesListPublic>(apiUrl);
  return {
    data: response.data.data,
  };
};

/*
  SG用のfetcher
  aritlceとページネーションの最終ページを返す
*/
export const fetchArticleSingle =  async (permalink: string):Promise<ArticlePublic> => {
  const response = await axios.get<FetchArticlesPublic>(`/api/fetchArticlesFromPermalink/${permalink}`);
  return response.data.data;
};
