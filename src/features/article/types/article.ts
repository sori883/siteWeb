/*
  fetchArticle Response 
  Edit Param
*/
export type Article = {
  id: number;
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image_id: null | number;
  category: null | {
    id: number;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    text: string;
  }[];
};

/* article list item */
export type ArticleItem = {
  id: number | null,
  title: string,
  permalink: string,
  publish_at: string,
};

/* fetchAllArticles Response */
export type FetchArticlesList = {
  data: [ArticleItem];
  lastPage: number;
  links: unknown;
  meta: unknown;
};

/* actions */
export type ArticleCreateParam = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image_id: null | number;
  category: null | {
    id: number;
    name: string;
    slug: string;
  };
  tags: undefined;
};
