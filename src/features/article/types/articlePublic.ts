/*
  fetchArticle Response 
  Edit Param
*/
export type ArticlePublic = {
  id: number;
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image: null | {
    id: number,
    title: string,
    path: string,
  };
  category: null | {
    id: number;
    name: string;
    slug: string;
  };
};

export type FetchArticlesPublic = {
  data: ArticlePublic;
} 

/* fetchAllArticles Response */
export type FetchArticlesListPublic = {
  data: ArticlePublic[];
} 
