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
  tags: {
    id: string;
    text: string;
  }[];
};

// 記事データをpostするときの型
export type ArticlePostParam = {
  id: number;
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image: null | number;
  category: null | number;
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
  slug: string;
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
  image: null;
  category: null | {
    id: number;
    name: string;
    slug: string;
  };
  tags: undefined;
};
